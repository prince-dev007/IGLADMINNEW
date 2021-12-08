import { useState, useEffect } from "react";
import DataTable from "../partials/DataTable";
import { motion } from "framer-motion";
// import QRCode from "react-qr-code";

// icons
import { IoRefreshOutline } from "react-icons/io5";
import { RiGasStationLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
// import {MdModeEdit} from 'react-icons/md';

// components
import Pagination from "../partials/Pagination";
import Animation from "../../common/Animation";

// utils
import { callAPI } from "../../common/common";
import { getUser } from "../../common/Auth";

export default function Employee() {
	// defaults
	document.title = "IGL ADMIN | Employees";
	window.$("#activePageHead").text("Employees");
	// window.$('#stationModal #modalSpinner').hide();

	const renderProgress = (row = 0, col = 0) => {
		const tableSize = [row, col];
		return [...Array(tableSize[0])].map((tr, trIdx) => (
			<tr key={trIdx}>
				{[...Array(tableSize[1])].map((a, tdIdx, arr) => (
					<td key={trIdx + tdIdx}>
						<div className="loadingWrapper">
							<div className="activity"></div>
						</div>
					</td>
				))}
			</tr>
		));
	};

	const renderTable = () => {
		if (dataArr == null) return renderProgress(10, 4);
		return (
			<>
				{dataArr.length > 0 ? (
					dataArr.map((item) => (
						<tr key={Math.random()}>
							<td onClick={() => modal("EDIT", item)}>{item.name}</td>
							<td onClick={() => modal("EDIT", item)}>{item.email}</td>
							<td onClick={() => modal("EDIT", item)}>{item.Station ? item.Station.stationName : "Not Assigned"}</td>
							<td style={{ display: "flex", alignItems: "center" }}>
								{/* <button className="btn btn-sm border btnDanger m-1 " onClick={() => modal("DELETE", item)}>
									<RiDeleteBinLine />{" "}
								</button> */}
							</td>
						</tr>
					))
				) : (
					<tr>
						<td className="text-center" colSpan={5}>
							<span className="badge badge-info">Record Not Found</span>
						</td>
					</tr>
				)}
			</>
		);
	};

	// modal
	const [submitNoteClass, setSubmitNoteClass] = useState("");
	const [submitNoteTxt, setSubmitNoteTxt] = useState("");

	// primary key
	const [employeeId, setEmployeeId] = useState("NEW");

	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const modal = (action = null, data = null) => {
		if (action === "NEW" || action === "EDIT") {
			window.$("#stationModal #modalSpinner").hide();
			window.$("#stationModal").modal("show");
			setFullName(action === "EDIT" && data.name ? data.name : "");
			setEmail(action === "EDIT" && data.email ? data.email : "");
			setStationId(action === "EDIT" && data.Station ? data.Station._id : "");
			setEmployeeId(action === "EDIT" && data._id ? data._id : action);
		} else if (action === "DELETE") {
			//window.$("#deleteModal").modal("show");
			setEmployeeId(data._id);
			setFullName(data.name);
		}
		setSubmitNoteTxt("");
	};

	// submit form PUT/POST
	const submitForm = async (e) => {
		e.preventDefault();
		setSubmitNoteTxt("");
		window.$("#stationModal #modalSpinner").show();
		const response = await callAPI({
			URL: "employee/" + employeeId,
			method: employeeId === "NEW" ? "POST" : "PUT",
			body: {
				name: fullName,
				email,
				Station: stationId,
			},
		});
		window.$("#stationModal #modalSpinner").hide();
		if (response.status === 200) {
			setSubmitNoteClass("text-success");
			setSubmitNoteTxt(employeeId === "NEW" ? "Added" : "Updated");
			setTimeout(() => {
				window.$("#stationModal #closeBtn").click();
				triggerGetAll();
			}, 1000);
		} else {
			setSubmitNoteClass("text-danger");
			setSubmitNoteTxt("Something went wrong !");
		}
	};

	// delete station
	const deleteHandler = async (e) => {
		e.preventDefault();
		setSubmitNoteTxt("");
		window.$("#deleteModal #modalSpinner").show();
		const response = await callAPI({
			URL: "employee/" + employeeId,
			method: "DELETE",
		});
		window.$("#deleteModal #modalSpinner").hide();
		if (response.status === 200) {
			setSubmitNoteClass("text-success");
			setSubmitNoteTxt("Deleted");
			setTimeout(() => {
				window.$("#deleteModal #closeBtn").click();
				triggerGetAll();
			}, 1000);
		} else {
			setSubmitNoteClass("text-danger");
			setSubmitNoteTxt("Something went wrong !");
		}
	};

	// get all employee
	const [searchStr, setSearchStr] = useState("");
	const triggerGetAll = () => setRandom(Math.random());
	const [random, setRandom] = useState(0);
	const [dataArr, setDataArr] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [limit, setLimit] = useState(50);
	const [total, setTotal] = useState(0);
	useEffect(
		(e) => {
			const user = getUser();
			const getAllEmployee = async () => {
				setDataArr(null);
				const response = await callAPI({
					URL: `employee/all?page=${currentPage}&limit=${limit}&search=${searchStr}&station=${user.Station}`,
					abort: true,
				});
				if (response.status !== 200 && response.status !== 404) return;
				setTotal(response.total);
				setDataArr(response.status === 200 ? response.data : []);
			};
			getAllEmployee();
			return () => {
				window.$("#pageSpinner").show();
			};
		},
		[currentPage, limit, random, searchStr]
	);

	// all station
	// getting stations for dropdown
	const [stationArr, setStationArr] = useState([]);
	const [stationId, setStationId] = useState("DEFAULT");

	useEffect(() => {
		// stations
		const getAllStation = async () => {
			const response = await callAPI({
				URL: "stations/mini?fields=managerName,stationName,stationId",
			});
			if (response.status === 200) {
				setStationArr(response.data);
			}
		};
		getAllStation();
	}, []);

	return (
		<div className="page-wrapper">
			<div className="page-content-wrapper">
				<motion.div initial={Animation.variants.out} animate={Animation.variants.in} exit={Animation.variants.exit} transition={Animation.PageTransition} className="page-content">
					<div className="card dataCard">
						<div className="card-body">
							<div className="card-title ">
								<div className="row">
									<div className="col-12 pageHead">
										<div>
											<div className="input-group " style={{ width: "unset" }}>
												<div className="input-group-prepend">
													<span className="input-group-text">
														<RiGasStationLine />
													</span>
												</div>
												<input type="text" className="form-control" title={"Search"} onChange={(e) => setSearchStr(e.target.value)} placeholder="Search here" />
											</div>
										</div>
										<div>
											<button type="button" onClick={() => modal("NEW")} title={"New Station"} className="d-none btn btnIconC border mr-2">
												<IoMdAdd />
											</button>
											<button type="button" onClick={triggerGetAll} title={"Refresh"} className="btn btnIconC border mr-2">
												<IoRefreshOutline />
											</button>
											<div className="form-group mb-0 w-50 mr-2">
												<select onChange={(e) => setLimit(e.target.value)} title={"Result Limit"} defaultValue={limit} value={limit} className="form-control">
													<option value="50">50</option>
													<option value="100">100</option>
													<option value="500">500</option>
													<option value="1000">1000</option>
												</select>
											</div>
											<Pagination className="mb-0" total={total} currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={limit} />
										</div>
									</div>
								</div>
							</div>
							<DataTable tableRowHead={"Employee, Email,  Station, Action"} renderTable={renderTable} />
						</div>
					</div>
					{/* modal */}
					<div className="modal fade" id="stationModal">
						<div className="modal-dialog modal-dialog-centered">
							<div className="modal-content">
								<div className="modal-header mb-3 mt-3 ">
									<h5 className="modal-title">Employee Details</h5>
									<button type="button" className="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">×</span>
									</button>
								</div>
								<form onSubmit={(e) => e.preventDefault()}>
									<div className="modal-body">
										<fieldset className="formBox">
											<legend> Name</legend>
											<input type="text" required placeholder=" Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="formField" />
										</fieldset>
										<fieldset className="formBox">
											<legend>Email</legend>
											<input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="formField" />
										</fieldset>
										<fieldset className="formBox">
											<legend>Station</legend>
											<select
												onChange={(e) => {
													setStationId(e.target.value);
												}}
												title={"Stations"}
												defaultValue={stationId}
												value={stationId}
												className="form-control formField"
											>
												<option key={"null"} value={"DEFAULT"}>
													Select Station
												</option>
												{stationArr.map((arrItem) => (
													<option key={arrItem._id} value={arrItem._id}>
														{arrItem.stationName}
													</option>
												))}
											</select>
										</fieldset>
									</div>
									<div className="modal-footer mt-3">
										<div className="submitNote">
											<span id="submitNote" className={submitNoteClass}>
												{submitNoteTxt}
											</span>
										</div>
										<div id="modalSpinner" style={{ transform: "scale(0.7)" }}>
											<div className="spinner-border text-success" role="status">
												<span className="sr-only">Loading...</span>
											</div>
										</div>
										<button type="submit" className="btn btn-primary" onClick={submitForm}>
											Submit
										</button>
										<button type="button" id="closeBtn" className="btn btn-secondary" data-dismiss="modal">
											Close
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>

					{/*  delete modal */}
					<div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div className="modal-dialog modal-dialog-centered">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title">Confirm Delete</h5>
									<button type="button" className="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div className="modal-body">
									<p style={{ fontSize: "16px" }}>Are you sure to delete this Employee record ?</p>
									<p style={{ fontSize: "16px" }}>
										Selected Employee : <strong>{fullName}</strong>
									</p>
								</div>
								<div className="modal-footer mt-3">
									<div className="submitNote">
										<span className={submitNoteClass}>{submitNoteTxt}</span>
									</div>
									<div id="modalSpinner" style={{ transform: "scale(0.7)" }}>
										<div className="spinner-border text-success" role="status">
											<span className="sr-only">Loading...</span>
										</div>
									</div>
									<button type="button" className="btn btn-danger" onClick={deleteHandler}>
										Confirm
									</button>
									<button type="button" className="btn btn-secondary" id="closeBtn" data-dismiss="modal">
										Close
									</button>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
