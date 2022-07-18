import { useState, useEffect } from "react";
import { motion } from "framer-motion";
// import QRCode from "react-qr-code";

// icons
import { IoRefreshOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
// import {MdModeEdit} from 'react-icons/md';

// components
import Pagination from "../partials/Pagination";
import Animation from "../../common/Animation";

// utils
import { callAPI } from "../../common/common";
import { useContext } from "react";
import { AppContext } from "../../Context/Context";
import { Button, Form, InputGroup, Modal, Table } from "react-bootstrap";

export default function Machine() {
	const { user, contextDispatch } = useContext(AppContext);

	useEffect(() => {
		contextDispatch({
			type: "SET_PAGE_TITLE",
			payload: "Employee",
		});
		contextDispatch({
			type: "SET_ACTIVE_PAGE_HEAD",
			payload: "Employee",
		});

		return () => {
			contextDispatch({
				type: "SET_ACTIVE_PAGE_SPINNER",
				payload: true,
			});
		};
	}, [contextDispatch]);

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
							<td onClick={ () => user.profileType === "ADMIN" ? modal("EDIT", item) : "" }>{item.Station ? item.Station.stationName : "Not Assigned"}</td>
							<td onClick={ () => user.profileType === "ADMIN" ? modal("EDIT", item) : "" } style={{ fontWeight: "bold" }}>
								{item.MachineId}
							</td>
							{
								user.profileType === "ADMIN" ? 
								<td>
									<button className="btn btn-sm border btnDanger m-1 " onClick={() => modal("DELETE", item)}>
										<RiDeleteBinLine />
									</button>
								</td>
							: ""
							}
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
	// const [employeeId, setEmployeeId] = useState("NEW");

	const [machineCode, setMachineCode] = useState("");
	const [machineId, setMachineId] = useState("NEW");
	const modal = (action = null, data = null) => {
		if (action === "NEW" || action === "EDIT") {
			window.$("#stationModal #modalSpinner").hide();
			window.$("#stationModal").modal("show");
			setMachineCode(action === "EDIT" && data.MachineId ? data.MachineId : "");
			setStationId(action === "EDIT" && data.Station ? data.Station._id : "");
			setMachineId(action === "EDIT" && data._id ? data._id : action);
		} else if (action === "DELETE") {
			showDeleteModal();
			setMachineId(data._id);
			setMachineCode(data.MachineId);
		}
		setSubmitNoteTxt("");
	};

	// submit form PUT/POST
	const submitForm = async (e) => {
		e.preventDefault();
		setSubmitNoteTxt("");
		window.$("#stationModal #modalSpinner").show();
		const response = await callAPI({
			URL: "machine/"+ machineId,
			method: machineId === "NEW" ? "POST" : "PUT",
			body: {
				Station: stationId,
				MachineId: machineCode
			},
		});
		window.$("#stationModal #modalSpinner").hide();
		if (response.status === 200) {
			setSubmitNoteClass("text-success");
			setSubmitNoteTxt(machineId === "NEW" ? "Added" : "Updated");
			setTimeout(() => {
				window.$("#stationModal #closeBtn").click();
				triggerGetAll();
			}, 1000);
			window.$('#machineForm').trigger('reset');
		} else {
			setSubmitNoteClass("text-danger");
			setSubmitNoteTxt("Something went wrong !");
		}
	};

	// delete Machine
	const deleteHandler = async (e) => {
		e.preventDefault();
		setSubmitNoteTxt("");
		console.log("machine/"+machineId, "machine Id");
		window.$("#deleteModal #modalSpinner").show();
		const response = await callAPI({
			URL: "machine/" + machineId,
			method: "DELETE",
		});
		window.$("#deleteModal #modalSpinner").hide();
		if (response.status === 200) {
			setSubmitNoteClass("text-success");
			setSubmitNoteTxt("Deleted");
			setTimeout(() => {
				hideDeleteModal();
				triggerGetAll();
			}, 1000);
		} else {
			setSubmitNoteClass("text-danger");
			setSubmitNoteTxt("Something went wrong !");
		}
	};

	const [selectedStation, setSelectedStation] = useState(null);

	// get all machine
	const [searchStr, setSearchStr] = useState("");
	console.log(searchStr, "Search String");
	const triggerGetAll = () => setRandom(Math.random());
	const [random, setRandom] = useState(0);
	const [dataArr, setDataArr] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [limit, setLimit] = useState(50);
	const [total, setTotal] = useState(0);
	useEffect(
		(e) => {
			let stationGet = user.profileType === "ADMIN" ? "" : user.Station;
			if(selectedStation !== null){
				stationGet = selectedStation;
			}
			const getAllMachine = async () => {
				contextDispatch({
					type: "SET_ACTIVE_PAGE_SPINNER",
					payload: true,
				});
				setDataArr(null);
				const response = await callAPI({
					URL: `machine/all?page=${currentPage}&limit=${limit}&search=${searchStr}&station=${stationGet}`,
					abort: true,
				});
				if (response.status !== 200 && response.status !== 404) return;
				contextDispatch({
					type: "SET_ACTIVE_PAGE_SPINNER",
					payload: false,
				});
				setTotal(response.total);
				setDataArr(response.status === 200 ? response.data : []);
			};
			getAllMachine();
		},
		[currentPage, limit, random, searchStr, selectedStation, user]
	);

	// all station
	// getting stations for dropdown
	const [stationArr, setStationArr] = useState([]);
	const [stationId, setStationId] = useState("DEFAULT");

	useEffect(() => {
		// stations
		const getAllStation = async () => {
			const response = await callAPI({
				URL: "stations/mini?fields=stationId,stationName",
			});
			if (response.status === 200) {
				setStationArr(response.data);
			}
		};
		getAllStation();
	}, []);

	// delete Modal
	const [deleteModalShow, setDeleteModalShow] = useState(false);

	const hideDeleteModal = () => setDeleteModalShow(false);
	const showDeleteModal = () => setDeleteModalShow(true);

	return (
		<div className="page-wrapper">
			<div className="page-content-wrapper">
				<motion.div initial={Animation.variants.out} animate={Animation.variants.in} exit={Animation.variants.exit} transition={Animation.PageTransition} className="page-content">
					<div className="card dataCard">
						<div className="card-body">
							<div className="card-title cardC__head">
								{user.profileType === "ADMIN" && (
									<InputGroup className="inputGroupC">
										<InputGroup.Text id="basic-addon1" className="inputGroupC__label">
											Station
										</InputGroup.Text>
										<Form.Select
											className="form-control inputGroupC__input"
											title="Station"
											value={selectedStation}
											onChange={(e) => {
												setSelectedStation(e.target.value);
												setCurrentPage(1);
											}}
										>
											<option value="">All Station</option>
											{stationArr.map((obj) => {
												return (
													<option value={obj._id} key={obj._id}>
														{obj.stationName}
													</option>
												);
											})}
										</Form.Select>
									</InputGroup>
								)}
								<div className="input-group inputGroupC" style={{ width: "unset" }}>
									<div className="input-group-prepend">
										<span className="input-group-text">Search</span>
									</div>
									<input type="text" className="form-control" title={"Search"} onChange={(e) => setSearchStr(e.target.value)} value={searchStr} placeholder="Search-Machine ID" />
								</div>
								{
									user.profileType === "ADMIN" ? 
									<>
									<button type="button" onClick={() => modal("NEW")} title={"New Machine"} className="btn btnIconC border mr-2">
									<IoMdAdd />
									</button>
									</>
									:
									""
								}
								<button type="button" onClick={triggerGetAll} title={"Refresh"} className="btn btnIconC border mr-2">
									<IoRefreshOutline />
								</button>
								<InputGroup className="inputGroupC">
									<Form.Select className="form-control inputGroupC__input" title="Station" onChange={(e) => setLimit(e.target.value)} defaultValue={limit}>
										<option value="50">50</option>
										<option value="100">100</option>
										<option value="500">500</option>
										<option value="1000">1000</option>
									</Form.Select>
								</InputGroup>
								<Pagination className="mb-0" total={total} currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={limit} />
							</div>
							<Table bordered responsive hover>
								<thead>
									<tr>
										<th>Station Name</th>
										<th>Machine Code</th>
										{
											user.profileType === "ADMIN" ?
											<th>Action</th> : ""
										}
									</tr>
								</thead>
								<tbody>{renderTable()}</tbody>
							</Table>
						</div>
					</div>
					{/* modal */}
					<div className="modal fade" id="stationModal">
						<div className="modal-dialog modal-dialog-centered">
							<div className="modal-content">
								<div className="modal-header mb-3 mt-3 ">
									<h5 className="modal-title">Machine Detail</h5>
									<button type="button" className="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">×</span>
									</button>
								</div>
								<form id="machineForm" onSubmit={(e) => e.preventDefault()}>
									<div className="modal-body">
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
										<fieldset className="formBox">
											<legend> Machine Code </legend>
											<input type="text" required placeholder="IMEI No" value={machineCode} onChange={(e) => setMachineCode(e.target.value)} className="formField" />
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
										{
											user.profileType === "ADMIN" ?
											<>
											<button type="submit" className="btn btn-primary" onClick={submitForm}>
											Submit
												</button>
											</>
											:
											""
										}
										<button type="button" id="closeBtn" className="btn btn-secondary" data-dismiss="modal">
											Close
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>

					{/*  delete modal */}
					<Modal show={deleteModalShow} centered onHide={hideDeleteModal}>
						<Modal.Header>
							<Modal.Title>Confirm Delete</Modal.Title>
							<button type="button" className="close" onClick={hideDeleteModal}>
								<span aria-hidden="true">&times;</span>
							</button>
						</Modal.Header>
						<Modal.Body>
							<p style={{ fontSize: "16px" }}>Are you sure to delete this Machine record ?</p>
							<p style={{ fontSize: "16px" }}>
								Selected Machine : <strong>{machineCode}</strong>
							</p>
						</Modal.Body>
						<Modal.Footer>
							<div className="submitNote">
								<span className={submitNoteClass}>{submitNoteTxt}</span>
							</div>
							<div id="modalSpinner" style={{ transform: "scale(0.7)" }}>
								<div className="spinner-border text-success" role="status">
									<span className="sr-only">Loading...</span>
								</div>
							</div>
							<Button variant="danger" onClick={deleteHandler}>
								Confirm Delete
							</Button>
							<Button variant="secondary" onClick={hideDeleteModal}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>
				</motion.div>
			</div>
		</div>
	);
}
