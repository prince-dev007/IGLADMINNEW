import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";

import { Form, InputGroup, Table } from "react-bootstrap";
// icons
import { IoRefreshOutline } from "react-icons/io5";
import { RiGasStationLine, RiDeleteBinLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";

// components
import Pagination from "../partials/Pagination";
import Animation from "../../common/Animation";

// utils
import { callAPI } from "../../common/common";

// Context
import { AppContext } from "../../Context/Context";

// import image
import NoImg from "../../assets/images/image-not.png";

const Helpdesk = () => {
	const { user, contextDispatch } = useContext(AppContext);

	useEffect(() => {
		contextDispatch({
			type: "SET_PAGE_TITLE",
			payload: "Helpdesk",
		});
		contextDispatch({
			type: "SET_ACTIVE_PAGE_HEAD",
			payload: "Helpdesk",
		});
		// window.$("#pageSpinner").hide();

		return () => {
			contextDispatch({
				type: "SET_ACTIVE_PAGE_SPINNER",
				payload: true,
			});
		};

	}, [contextDispatch]);

	// Render table Animation Progress
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

	// get Status Badge
	const getBadge = (status) => {
		if (status === "Open") {
			return <span className="badge badge-danger">Open</span>
		} else if (status === "In Progress") {
			return <span className="badge badge-warning">In Progress</span>
		} else if (status === "Resolved") {
			return <span className="badge badge-primary">Resolved</span>
		} else if (status === "On Hold") {
			return <span className="badge badge-default">On Hold</span>
		} else if (status === "Close") {
			return <span className="badge badge-success">Close</span>
		} else {
			return <span className="badge badge-info">No Status</span>
		}
	};

	// Render table
	const renderTable = () => {
		if (dataArr == null) return renderProgress(50, 5);

		return (
			<>
				{dataArr.length > 0 ? (
					dataArr.map((item) =>
					(
						<tr key={Math.random()}>
							<td onClick={() => modal("EDIT", item)}>{item.Station.stationName}</td>
							<td onClick={() => modal("EDIT", item)}>{item.Manager.fullName}</td>
							<td onClick={() => modal("EDIT", item)}>{item.type}</td>
							<td onClick={() => modal("EDIT", item)}>{item.subType}</td>
							<td onClick={() => modal("EDIT", item)}>{getBadge(item.status)}</td>
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

	// render Image

	const [userProfile, setUserProfile] = useState({});

	useEffect(() => {
		async function getProfile() {
			const response = await callAPI({
				URL: "user/one/" + user._id,
			});
			if (response.status !== 200) return;

			const data = response.data;
			console.log(data, "Station Manager Data");
			// setStationName(data.Station.stationName);
			setUserProfile(data);
			setManagerName(data.fullName);
			if (data.Station && data.Station.stationName) {
				setStationName(data.Station.stationName);
			} else {

			}
		}
		getProfile();
	}, [user]);

	// submit form PUT/POST
	const submitForm = async (e) => {
		e.preventDefault();
		setSubmitNoteTxt("");
		window.$("#caseModal #modalSpinner").show();
		// const data = new FormData(window.$('#helpdeskForm')[0]);
		// console.log(data, "Helpdesk Form Data");
		console.log('submitting...')
		// for(var pair of data.entries()) {
		// 	console.log(pair[0]+ ', '+ pair[1]);
		//  }
		const response = await callAPI({
			URL: "case/" + caseId,
			method: caseId === "NEW" ? "POST" : "PUT",
			body: {
				Station: user.Station,
				Manager: user._id,
				type: problemType,
				subType: problemSubType,
				status,
				caseDesc: problemDesc,
				image: caseImage,
			},
			// body : data,
			bodyType: "FORM_DATA",
		});
		window.$("#caseModal #modalSpinner").hide();
		if (response.status === 200) {
			window.$('#helpdeskForm').trigger('reset');
			setSubmitNoteClass("text-success");
			setSubmitNoteTxt(caseId === "NEW" ? "Added" : "Updated");
			setTimeout(() => {
				window.$("#caseModal #closeBtn").click();
				triggerGetAll();
			}, 1000);
		} else {
			setSubmitNoteClass("text-danger");
			setSubmitNoteTxt(response.message);
		}
	};

	// modal
	const [submitNoteClass, setSubmitNoteClass] = useState("");
	const [submitNoteTxt, setSubmitNoteTxt] = useState("");
	const [stationName, setStationName] = useState("");
	const [managerName, setManagerName] = useState("");
	const [problemType, setProblemType] = useState("");
	const [problemSubType, setProblemSubType] = useState("");
	const [caseImage, setImage] = useState("");
	const [status, setStatus] = useState("Open");
	const [problemDesc, setProblemDesc] = useState("");
	const [caseId, setCaseId] = useState("NEW");
	const [caseImg, setCaseImg] = useState("");
	const modal = (action = null, data = null) => {
		if (action === "NEW" || action === "EDIT") {
			window.$("#caseModal #modalSpinner").hide();
			window.$("#caseModal").modal("show");
			setStationName(action === "EDIT" && data.Station.stationName ? data.Station.stationName : "");
			setManagerName(action === "EDIT" && data.Manager.fullName ? data.Manager.fullName : "");
			setProblemType(action === "EDIT" && data.type ? data.type : "");
			setProblemDesc(action === "EDIT" && data.caseDesc ? data.caseDesc : "");
			setProblemSubType(action === "EDIT" && data.subType ? data.subType : "");
			setCaseId(action === "EDIT" && data._id ? data._id : action);
			if(!data || data.image === "" || !data.image){
				setCaseImg(NoImg);
			} else {
				setCaseImg(action === "EDIT" && data.image ? data.image : "")
			}
			
			if (user.profileType != "ADMIN")
				window.$("#tktSubmitBtn").hide();
			if (action === "NEW") {
				setStationName(userProfile.Station.stationName ? userProfile.Station.stationName : "");
				setManagerName(userProfile.fullName ? userProfile.fullName : "");
				window.$("#tktSubmitBtn").show();
			}
		} else if (action === "DELETE") {
			window.$("#deleteModal").modal("show");
		}
	};

	// get Problem Sub Type according to Problem Type
	const filterProblemType = (event) => {
		const issueType = event.target.value;
		setProblemType(issueType)
		const filteredSubType = issues.filter(el => el.type === issueType);
		console.log(filteredSubType)
		setSubTypeArray(filteredSubType[0].subTypes);
	};


	const [subTypeArray, setSubTypeArray] = useState([]);


	const issues = [
		{
			type: "Machine Issue",
			subTypes: [
				"Biometric Issue",
				"Dispencer Reading Issue",
				"Vehicle Registration Number reading issue",
				"Battery Drain Issue",
				"Network Issue",
				"Others"
			]

		},
		{
			type: "Software Issue",
			subTypes: [
				"Manager Login Issue",
				"Price not Changed",
				"Others"
			]
		}
	]

	// Case Status
	const caseStatus = [
		"Open",
		"In Progress",
		"On Hold",
		"Resolved",
		"Closed"
	]

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
			const getAllCase = async () => {
				setDataArr(null);
				contextDispatch({
					type: "SET_ACTIVE_PAGE_SPINNER",
					payload: true,
				});
				let stationCode = "";
				if (user.profileType === "ADMIN") {
					console.log("Admin Profile");
					stationCode = "";
				} else {
					console.log("Manager Profile");
					stationCode = "&station=" + user.Station;
				}
				const response = await callAPI({
					URL: "case/all?page=" + currentPage + "&limit=" + limit + "&search=" + searchStr + stationCode,
					abort: false,
				});
				contextDispatch({
					type: "SET_ACTIVE_PAGE_SPINNER",
					payload: false,
				});
				if (response.status !== 200 && response.status !== 404) return;
				setTotal(response.total);
				setDataArr(response.status === 200 ? response.data : []);
			};
			getAllCase();
			return () => {
				contextDispatch({
					type: "SET_ACTIVE_PAGE_SPINNER",
					payload: true,
				});
			};
		},
		[currentPage, limit, random, searchStr, contextDispatch]
	);

	return (
		<div className="page-wrapper">
			<div className="page-content-wrapper">
				<motion.div initial={Animation.variants.out} animate={Animation.variants.in} exit={Animation.variants.exit} transition={Animation.PageTransition} className="page-content">
					<div className="card dataCard">
						<div className="card-body">
							<div className="card-title cardC__head">
								<div>
									<div className="input-group inputGroupC" style={{ width: "unset" }}>
										<div className="input-group-prepend">
											<span className="input-group-text">
												<RiGasStationLine />
											</span>
										</div>
										<input type="text" className="form-control" title={"Search"} onChange={(e) => setSearchStr(e.target.value)} placeholder="Search here" />
									</div>
								</div>


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
								<button type="button" onClick={() => modal("NEW")} title={"New Station"} className="btn btn-primary border mr-2">
									Raise Ticket
								</button>
								<Pagination className="mb-0" total={total} currentPage={currentPage} setCurrentPage={setCurrentPage} pageSize={limit} />
							</div>
							<Table bordered responsive hover>
								<thead>
									<tr>
										<th>Station Name</th>
										<th>Manager Name</th>
										<th>Problem Type</th>
										<th>Problem Sub Type</th>
										<th>Case Status</th>
									</tr>
								</thead>
								<tbody>
									{renderTable()}
								</tbody>
							</Table>
						</div>
					</div>
					{/* modal */}
					<div className="modal fade" id="caseModal">
						<div className="modal-dialog modal-xl modal-dialog-centered">
							<div className="modal-content">
								<div className="modal-header mb-3 mt-3 ">
									<h5 className="modal-title">Raise Ticket</h5>
									<button type="button" className="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">×</span>
									</button>
								</div>
								<form onSubmit={submitForm} enctype="multipart/form-data" id="helpdeskForm">
									<div className="modal-body">
										<div className="row">
											<div className="col-md-6">
												<fieldset className="formBox">
													<legend>Station Name </legend>
													<input type="text" required placeholder="Station Name" value={stationName} onChange={(e) => setStationName(e.target.value)} readOnly="true" className="formField" />
												</fieldset>
												<fieldset className="formBox">
													<legend>Manager Name</legend>
													<input type="text" required placeholder="Manager Name" value={managerName} onChange={(e) => setManagerName(e.target.value)} readOnly="true" className="formField" />
												</fieldset>
												<fieldset className="formBox">
													<legend>Problem Type</legend>
													{
														user.profileType === "ADMIN" ?
															<>
																<input type="text" value={problemType} onChange={(e) => setProblemType(e.target.value)} readOnly="true" className="formField" />
															</>
															:
															<>
																<select required className="formField" value={problemType} onChange={filterProblemType}>
																	<option value="">-- Select --</option>
																	{issues.map((el) =>
																		<option value={el.type}>{el.type}</option>
																	)}
																</select>
															</>
													}
												</fieldset>
												<fieldset className="formBox">
													<legend>Problem Sub Type</legend>
													{
														user.profileType === "ADMIN" ?
															<>
																<input type="text" value={problemSubType} onChange={(e) => setProblemSubType(e.target.value)} readOnly="true" className="formField" />
															</>
															:
															<>
																<select required className="formField" value={problemSubType} onChange={(e) => setProblemSubType(e.target.value)}>
																	<option value="">-- Select --</option>
																	{subTypeArray.map((el) =>
																		<option value={el}>{el}</option>
																	)}
																</select>
															</>
													}
												</fieldset>
												<fieldset className="formBox">
													<legend>Problem Decsription</legend>
													{
														user.profileType === "ADMIN" ?
															<>
																<textarea className="formField" style={{ height: "auto" }} onChange={(e) => setProblemDesc(e.target.value)} value={problemDesc} readOnly="true" placeholder="Write Problem Description"></textarea>
															</>
															:
															<>
																<textarea className="formField" style={{ height: "165px" }} onChange={(e) => setProblemDesc(e.target.value)} value={problemDesc} placeholder="Write Problem Description"></textarea>
															</>
													}
												</fieldset>
												<fieldset>
													{
														user.profileType === "ADMIN" ?
															<>
																
															</>
															:
															<>
																<legend>Choose Image</legend>
																<input type="file" onChange={(e) => setImage(e.target.files[0])} className="formField" />
															</>
													}
												</fieldset>
												{user.profileType === "ADMIN" ?
													<>
														<fieldset className="formBox">
															<legend>Case Status</legend>
															<select required className="formField">
																<option value="">-- Select --</option>
																{caseStatus.map((el) =>
																	<option value={el}>{el}</option>
																)}
															</select>
														</fieldset>
														<fieldset className="formBox">
															<legend>Resolution Decsription</legend>
															<textarea className="formField" style={{ height: "165px" }} placeholder="Write Problem Status"></textarea>
														</fieldset>
													</>
													: <></>}
											</div>
											<div className="col-md-6">
												<img src={caseImg} alt=""  className="img-fluid" />
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
										<button type="submit" className="btn btn-primary" id="tktSubmitBtn">
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
									<button type="button" className="btn btn-danger" onClick="">
										Confirm Delete
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
	)
};
export default Helpdesk;