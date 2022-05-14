import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";

import { Form, InputGroup, Table } from "react-bootstrap";
// icons
import { IoRefreshOutline, IoHandRightOutline } from "react-icons/io5";
import { FcFeedback } from "react-icons/fc";
import { RiGasStationLine, RiDeleteBinLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { FaFistRaised, FaPlusCircle } from "react-icons/fa";

// components
import Pagination from "../partials/Pagination";
import Animation from "../../common/Animation";

// utils
import { callAPI } from "../../common/common";

// Date 
import dateGenerator from "../../common/date";

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
			return <span className="badge badge-secondary">On Hold</span>
		} else if (status === "Closed") {
			return <span className="badge badge-success">Closed</span>
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
							<td onClick={() => modal("EDIT", item)}>{item.Station ? item.Station.stationName : <span className="badge badge-default">No Station</span>}</td>
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
		console.log(dateGenerator.dateTime());
		const reqBody = {
			title: "",
			type: problemType,
			subType: problemSubType,
			status,
			caseDesc: problemDesc,
			image: caseImage,
		}

		if (user.profileType === "ADMIN") {
			reqBody.resolutionDesc = caseResolve;
			reqBody.resolutionTime = dateGenerator.dateTime();
		}
		if (caseId === "NEW") {
			reqBody.Station = stationId;
			reqBody.Manager = userId;
		}

		const response = await callAPI({
			URL: "case/" + caseId,
			method: caseId === "NEW" ? "POST" : "PUT",
			body: reqBody,
			// body : data,
			bodyType: "FORM_DATA",
		});
		window.$("#caseModal #modalSpinner").hide();
		if (response.status === 200) {
			setSubmitNoteClass("text-success");
			setSubmitNoteTxt(caseId === "NEW" ? "Added" : "Updated");
			setTimeout(() => {
				window.$("#caseModal #closeBtn").click();
				setSubmitNoteTxt("");
				setSubmitNoteClass("");
				window.$('#helpdeskForm').trigger('reset');
				triggerGetAll();
			}, 1000);
		} else {
			setSubmitNoteClass("text-danger");
			setSubmitNoteTxt(response.message);
		}
	};

	const imageHandle = (e) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				this.setState({ setCaseImg: reader.result })
			}
		}
		reader.readAsDataURL(e.target.files[0])
	};

	// modal
	const [stationId, setStationId] = useState("");
	const [userId, setUserId] = useState("");
	const [submitNoteClass, setSubmitNoteClass] = useState("");
	const [submitNoteTxt, setSubmitNoteTxt] = useState("");
	const [stationName, setStationName] = useState("");
	const [managerName, setManagerName] = useState("");
	const [problemType, setProblemType] = useState("");
	const [problemSubType, setProblemSubType] = useState("");
	const [caseImage, setImage] = useState("");
	const [status, setStatus] = useState("");
	const [problemDesc, setProblemDesc] = useState("");
	const [caseId, setCaseId] = useState("NEW");
	const [caseImg, setCaseImg] = useState("");
	const [caseResolve, setResolution] = useState("");
	const [resolveTime , setResolveDate] = useState("");
	const [createDate, setCreatedDate] = useState("");

	// const ii= window.$('input');
	// // console.log(ii, "Image Data");
	// ii.forEach(element=>{
	// 	console.log(element.id);
	// });
	const modal = (action = null, data = null) => {
		if (action === "NEW" || action === "EDIT") {
			window.$("#caseModal #modalSpinner").hide();
			window.$("#caseModal").modal("show");
			setStationName(action === "EDIT" && data.Station ? data.Station.stationName : user.Station.stationName);
			//setManagerName(action === "EDIT" && data.Manager.fullName ? data.Manager.fullName : userProfile.fullName);
			filterProblemType(action === "EDIT" && data.type ? data.type : "");
			setProblemDesc(action === "EDIT" && data.caseDesc ? data.caseDesc : "");
			setProblemSubType(action === "EDIT" && data.subType ? data.subType : "");
			setStatus(action === "EDIT" && data.status ? data.status : "Open");
			setCaseId(action === "EDIT" && data._id ? data._id : action);
			setResolution(action === "EDIT" && data.resolutionDesc ? data.resolutionDesc : "");
			setStationId(action === "EDIT" && data.Station ?  data.Station._id : (user.profileType !== "ADMIN" ? user.Station : ""));
			if(action === 'EDIT') {
				filterStationId(data.Station !== null ? data.Station._id : '')
			}
			setUserId(action === "EDIT" && data.Manager._id ?  data.Manager._id : (user.profileType !== "ADMIN" ? user._id : ""));
			setResolveDate(action === "EDIT" && data.resolutionTime ? dateGenerator.fDateTIme(data.resolutionTime) : "Not Resolved Yet");
			setCreatedDate(action === "EDIT" && data.createdAt ? dateGenerator.fDateTIme(data.createdAt) : "No created Date");
			
			if (!data || data.image === "" || !data.image) {
				setCaseImg(NoImg);
			} else {
				setCaseImg(action === "EDIT" && data.image ? data.image : "");
			}
			// if(action === "NEW" && user.profileType !== "ADMIN") {
			// 	setStationId(user.Station);
			// 	setUserId(user._id);
			// }

			if (user.profileType != "ADMIN")
				window.$("#tktSubmitBtn").hide();

			// if (action === "NEW") {
			// 	if(user.profileType != "ADMIN"){
			// 		setStationName(userProfile.Station.stationName ? userProfile.Station.stationName : "");
			// 	}else{
			// 		setManagerName(userProfile.fullName ? userProfile.fullName : "");
			// 		window.$("#tktSubmitBtn").show();
			// 	}
			// }
		} else if (action === "DELETE") {
			window.$("#deleteModal").modal("show");
		}
	};

	// get Problem Sub Type according to Problem Type
	const filterProblemType = (val) => {
		setProblemType(val)
		const filteredSubType = issues.filter(el => el.type === val);
		if (filteredSubType.length === 0) {
			setSubTypeArray([])
			return;
		}
		console.log(filteredSubType)
		setSubTypeArray(filteredSubType[0].subTypes);
	};

	const filterStationId = (val) => {
		setStationId(val);
		const filterManager = userArr.filter(el => el.Station === val);
		if(filterManager.length === 0) {
			setFilterManagerArr([]);
			return;
		}
		console.log(filterManager);
		setFilterManagerArr(filterManager);
	}

	const [filterManagerArr, setFilterManagerArr] = useState([]);

	const [subTypeArray, setSubTypeArray] = useState([]);


	const issues = [
		{
			type: "Machine Issue",
			subTypes: [
				"Biometric Issue",
				"Dispencer Reading Issue",
				"Vehicle Registration Number reading issue",
				"Battery Issue",
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

	// all station
	// getting stations for dropdown
	const [stationArr, setStationArr] = useState([]);

	const [userArr, setUserArr] = useState([]);


	// console.log(userArr, "Profile Array");

	useEffect(() => {
		// stations
		const getAllStation = async () => {
			let response = await callAPI({
				URL: "stations/mini?fields=stationId,stationName",
			});
			if (response.status === 200) {
				setStationArr(response.data);
				console.log(response.data, "Stations");
			}

			response = await callAPI({
				URL: "user/mini",
				abort: true,
			});
			if (response.status === 200) {
				setUserArr(response.data);
				console.log(response.data, "Users Profile");
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
								<button type="button" onClick={() => modal("NEW")} title={"Raise Problem"} className="btn mr-2 ticket-btn">
									Create Ticket <FaPlusCircle />
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
										<th>Ticket Status</th>
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
									<h5 className="modal-title">{caseId === "NEW" ? "Raise Ticket" : "Ticket Detail"}
									&nbsp; {getBadge(status)}
									</h5>
									<button type="button" className="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">×</span>
									</button>
								</div>
								<form onSubmit={submitForm} enctype="multipart/form-data" id="helpdeskForm">
									<div className="modal-body">
										<div className="row">
											<div className="col-md-6">
												<fieldset className="formBox">
												<legend>Station</legend>
												<select required className="formField" value={stationId} disabled={user.profileType !== "ADMIN" ? true : (caseId !== "NEW" ? true : "") } onChange={e => filterStationId(e.target.value)}>
													<option value="">Select Station</option>
													{stationArr.map((obj) => {
														return (
															<option value={obj._id} key={obj._id}>
																{obj.stationName}
															</option>
														);
													})}
												</select>
												</fieldset>
												<fieldset className="formBox">
												<legend>Manager</legend>
												<select required className="formField" value={userId} disabled={user.profileType !== "ADMIN" ? true : (caseId !== "NEW" ? true : "")} onChange={e => setUserId(e.target.value)}>
													{filterManagerArr.map((obj) => {
														return (
															<option value={obj._id} key={obj._id}>
																{obj.fullName}
															</option>
														);
													})}
												</select>
												</fieldset>
												<fieldset className="formBox">
													<legend>Problem Type</legend>
													{
														caseId !== "NEW" ?
															<>
																<input type="text" value={problemType} onChange={(e) => setProblemType(e.target.value)} readOnly="true" className="formField" />
															</>
															:
															<>
																<select required className="formField" value={problemType} onChange={e => filterProblemType(e.target.value)}>
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
														caseId != "NEW" ?
															<>
																<input type="text" value={problemSubType} onChange={(e) => setProblemSubType(e.target.value)} readOnly="true" className="formField" />
															</>
															:
															<>
																<select required className="formField" value={problemSubType} onChange={(e) => setProblemSubType(e.target.value)}>
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
																<textarea className="formField" style={{ height: "auto" }} onChange={(e) => setProblemDesc(e.target.value)} value={problemDesc} readOnly={caseId !== "NEW" } placeholder="Write Problem Description"></textarea>
															</>
															:
															<>
																<textarea className="formField" style={{ height: "auto" }} onChange={(e) => setProblemDesc(e.target.value)} value={problemDesc} readOnly={caseId !== "NEW" } placeholder="Write Problem Description"></textarea>
															</>
													}
												</fieldset>
												{
													user.profileType === "ADMIN" ?
														<>

															<fieldset className="formBox">
																<legend>Case Status</legend>
																<select required className="formField" value={status} onChange={(e) => setStatus(e.target.value)}>
																	{caseStatus.map((el) =>
																		<option value={el}>{el}</option>
																	)}
																</select>
															</fieldset>
															<fieldset className="formBox">
																<legend>Resolution Decsription</legend>
																<textarea className="formField" style={{ height: "165px" }} value={caseResolve} onChange={(e) => setResolution(e.target.value)} id="resolveDesc" placeholder="Write Problem Status"></textarea>
															</fieldset>

														</>
														:
														<>
															{
																caseId === "NEW" ?
																	<>

																	</>
																	:
																	<>
																		<fieldset className="formBox">
																			<legend>Case Status</legend>
																			<input type="text" className="formField" value={status} readOnly="true" />
																			{/* <select required className="formField" value={status} onChange={(e) => setStatus(e.target.value)} readOnly="true"	>
																				{caseStatus.map((el) =>
																					<option value={el}>{el}</option>
																				)}
																			</select> */}
																		</fieldset>
																		<fieldset className="formBox">
																			<legend>Resolution Decsription</legend>
																			<textarea className="formField" style={{ height: "165px" }} value={caseResolve} onChange={(e) => setResolution(e.target.value)} readOnly="true" id="resolveDesc" placeholder="Write Problem Status"></textarea>
																		</fieldset>
																	</>
															}
														</>
												}
												<fieldset>
												<div className="row">
													<div className="col-md-6">
													<label><b>Created Ticket Time</b></label>
													<p> { caseId !== "NEW" ? createDate : Date() } </p>
													</div>

													<div className="col-md-6">
													<label><b>Ticket Resolution Time</b></label>
													<p> { caseId !== "NEW" ? resolveTime : "No Resolve Time" } </p>
													</div>
												</div>
												</fieldset>
											</div>
											<div className="col-md-6">
												<fieldset>
													{
														user.profileType === "ADMIN" ?
															<>
																{
																	caseId === "NEW" ?
																		<>
																			<legend>Choose Image</legend>
																			<input type="file" onChange={(e) => setImage(e.target.files[0])} className="formField" accept="image/*" />
																		</>
																		:
																		<>

																		</>
																}
															</>
															:
															<>
																{
																	caseId === "NEW" ?
																		<>
																			<legend>Choose Image</legend>
																			<input type="file" onChange={(e) => setImage(e.target.files[0])} className="formField" accept="image/*" />
																		</>
																		:
																		<>

																		</>
																}
															</>
													}
												</fieldset>
												<img src={caseImg} alt="" className="img-fluid" />
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
										{
											user.profileType === "ADMIN" ?
												<>
													<button type="submit" className="btn btn-primary">
														Submit
													</button>
												</>
												:
												<>
													{
														caseId === "NEW" ?
															<>
																<button type="submit" className="btn btn-primary">
																	Submit
																</button>
															</> : <>

															</>
													}
												</>
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