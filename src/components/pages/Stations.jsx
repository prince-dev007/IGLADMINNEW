import { useState, useEffect } from "react";
import DataTable from "../partials/DataTable";
import { motion } from "framer-motion";
// import QRCode from "react-qr-code";

// icons
import { IoRefreshOutline } from "react-icons/io5";
import { RiGasStationLine, RiDeleteBinLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
// import {MdModeEdit} from 'react-icons/md';

// components
import Pagination from "../partials/Pagination";
import Animation from "../../common/Animation";

// utils
import { callAPI } from "../../common/common";

const Stations = () => {
	// defaults
	document.title = "IGL ADMIN | Stations";
	window.$("#activePageHead").text("Stations");
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
		if (dataArr == null) return renderProgress(10, 5);
		return (
			<>
				{dataArr.length > 0 ? (
					dataArr.map((item) => (
						<tr key={Math.random()}>
							<td onClick={() => modal("EDIT", item)}>{item.stationName}</td>
							<td onClick={() => modal("EDIT", item)}>{item.DSO}</td>
							<td onClick={() => modal("EDIT", item)}>{item.address}</td>
							<td onClick={() => modal("EDIT", item)}>{item.pincode}</td>
							<td style={{ display: "flex", alignItems: "center" }}>
								<button className="btn btn-sm border btnDanger m-1 " onClick={() => modal("DELETE", item)}>
									<RiDeleteBinLine />{" "}
								</button>
							</td>
						</tr>
					))
				) : (
					<tr>
						<td className="text-center" colSpan={5}>
							{" "}
							<span className="badge badge-info">Record Not Found</span>
						</td>
					</tr>
				)}
			</>
		);
	};

	// submit form PUT/POST
	const submitForm = async (e) => {
		e.preventDefault();
		setSubmitNoteTxt("");
		window.$("#stationModal #modalSpinner").show();
		const response = await callAPI({
			URL: "stations/" + stationId,
			method: stationId === "NEW" ? "POST" : "PUT",
			body: {
				stationName,
				DSO,
				address,
				pincode,
				TINNumber,
				CNGRate,
			},
		});
		window.$("#stationModal #modalSpinner").hide();
		if (response.status === 200) {
			setSubmitNoteClass("text-success");
			setSubmitNoteTxt(stationId === "NEW" ? "Added" : "Updated");
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
	const deleteStation = async (e) => {
		e.preventDefault();
		setSubmitNoteTxt("");
		window.$("#deleteModal #modalSpinner").show();
		const response = await callAPI({
			URL: "stations/" + stationId,
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

	// modal
	const [submitNoteClass, setSubmitNoteClass] = useState("");
	const [submitNoteTxt, setSubmitNoteTxt] = useState("");

	const [stationId, setStationId] = useState("NEW");
	const [stationName, setStationName] = useState("");
	const [DSO, setDSO] = useState("");
	const [address, setAddress] = useState("");
	const [pincode, setPincode] = useState("");
	const [TINNumber, setTINNumber] = useState("");
	const [CNGRate, setCNGRate] = useState("");
	const modal = (action = null, data = null) => {
		if (action === "NEW" || action === "EDIT") {
			window.$("#stationModal #modalSpinner").hide();
			window.$("#stationModal").modal("show");
			setStationName(action === "EDIT" && data.stationName ? data.stationName : "");
			setDSO(action === "EDIT" && data.DSO ? data.DSO : "");
			setAddress(action === "EDIT" && data.address ? data.address : "");
			setPincode(action === "EDIT" && data.pincode ? data.pincode : "");
			setTINNumber(action === "EDIT" && data.TINNumber ? data.TINNumber : "");
			setCNGRate(action === "EDIT" && data.CNGRate ? data.CNGRate : "");
			setStationId(action === "EDIT" && data._id ? data._id : action);
		} else if (action === "DELETE") {
			window.$("#deleteModal").modal("show");
			setStationId(data._id);
			setStationName(data.stationName);
		}
	};

	// get all
	const [searchStr, setSearchStr] = useState("");
	const triggerGetAll = () => setRandom(Math.random());
	const [random, setRandom] = useState(0);
	const [dataArr, setDataArr] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [limit, setLimit] = useState(50);
	const [total, setTotal] = useState(0);
	useEffect(
		(e) => {
			const getAllStation = async () => {
				setDataArr(null);
				const response = await callAPI({
					URL: "stations/all?page=" + currentPage + "&limit=" + limit + "&search=" + searchStr,
					abort: true,
				});
				if (response.status !== 200 && response.status !== 404) return;
				setTotal(response.total);
				setDataArr(response.status === 200 ? response.data : []);
			};
			getAllStation();
			return () => {
				window.$("#pageSpinner").show();
			};
		},
		[currentPage, limit, random, searchStr]
	);

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
											<button type="button" onClick={() => modal("NEW")} title={"New Station"} className="btn btnIconC border mr-2">
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
							<DataTable tableRowHead={"Station Name,DSO,Address,Pincode,Action"} renderTable={renderTable} />
						</div>
					</div>
					{/* modal */}
					<div className="modal fade" id="stationModal">
						<div className="modal-dialog modal-lg modal-dialog-centered">
							<div className="modal-content">
								<div className="modal-header mb-3 mt-3 ">
									<h5 className="modal-title">Station Details</h5>
									<button type="button" className="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">×</span>
									</button>
								</div>
								<form onSubmit={(e) => e.preventDefault()}>
									<div className="modal-body">
										<div className="row">
											<div className="col-md-6">
												<fieldset className="formBox">
													<legend>Station Name </legend>
													<input type="text" required placeholder="Station Name" value={stationName} onChange={(e) => setStationName(e.target.value)} className="formField" />
												</fieldset>
												<fieldset className="formBox">
													<legend>DSO Name</legend>
													<input type="text" value={DSO} placeholder="DSO name" onChange={(e) => setDSO(e.target.value)} className="formField" />
												</fieldset>
												<fieldset className="formBox">
													<legend>Pincode </legend>
													<input type="number" placeholder="Pincode of Station" value={pincode} onChange={(e) => setPincode(e.target.value)} className="formField" />
												</fieldset>
												<fieldset className="formBox">
													<legend>TIN Number</legend>
													<input type="text" placeholder="TIN Number of Station" value={TINNumber} onChange={(e) => setTINNumber(e.target.value)} className="formField" />
												</fieldset>
												<fieldset className="formBox">
													<legend>CNG Rate</legend>
													<input type="number" required placeholder="CNG Rate of Station" value={CNGRate} onChange={(e) => setCNGRate(e.target.value)} className="formField" />
												</fieldset>
											</div>
											<div className="col-md-6">
												<fieldset className="formBox">
													<legend>Address</legend>
													<textarea className="formField" style={{ height: "165px" }} onChange={(e) => setAddress(e.target.value)} value={address} placeholder="Address of Station"></textarea>
												</fieldset>
											</div>
										</div>
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
									<p style={{ fontSize: "16px" }}>Are you sure to delete this Station record ?</p>
									<p style={{ fontSize: "16px" }}>
										Selected Station : <strong>{stationName}</strong>
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
									<button type="button" className="btn btn-danger" onClick={deleteStation}>
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
};
export default Stations;
