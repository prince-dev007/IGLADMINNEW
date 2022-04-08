import { useState, useEffect, useContext } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import "../../assets/css/sale.pdf.css";
// images

// icons
import { Form, InputGroup, Table } from "react-bootstrap";
import { IoRefreshOutline } from "react-icons/io5";
import { BiExport } from "react-icons/bi";

// components

// Common
import { motion } from "framer-motion";
import Animation from "../../common/Animation";

import Pagination from "../partials/Pagination";
import { callAPI, fDate } from "../../common/common";

// Context
import { AppContext } from "../../Context/Context";

const Sales = () => {
	const { user, contextDispatch } = useContext(AppContext);

	useEffect(() => {
		contextDispatch({
			type: "SET_PAGE_TITLE",
			payload: "Sales",
		});
		contextDispatch({
			type: "SET_ACTIVE_PAGE_HEAD",
			payload: "Sales",
		});
		contextDispatch({
			type: "SET_ACTIVE_PAGE_SPINNER",
			payload: false,
		});
		return () => {
			contextDispatch({
				type: "SET_ACTIVE_PAGE_SPINNER",
				payload: true,
			});
		};
	}, [contextDispatch]);

	const [activeItem, setActiveItem] = useState({});
	// modal
	const modal = (action = null, data = null) => {
		if (action === "VIEW") {
			window.$("#saleModal").modal("show");
			setActiveItem(data);
		} else if (action === "EXPORT") {
			window.$("#exportModal").modal("show");
			// initExport();
		}
	};

	//

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
		if (dataArr == null) return renderProgress(50, 11);
		return (
			<>
				{dataArr.length > 0 ? (
					dataArr.map((item) => (
						<tr key={Math.random()} onClick={() => modal("VIEW", item)}>
							<td>{item.billNumber}</td>
							<td>{item.Station ? item.Station.stationName : item.Station}</td>
							<td>{item.Manager ? item.Manager.fullName : ""}</td>
							<td>{item.generatedBy ? item.generatedBy.name : ""}</td>
							<td>{fDate(item.createdAt)}</td>
							<td>{item.dispensor + " - " + item.side}</td>
							<td>{(item.name ? item.name + " - " : "") + (item.contactNumber ? item.contactNumber : "")}</td>
							<td>{item.vehicleNumber}</td>
							<td>{item.quantity}</td>
							<td>{Number(item.quantity) && Number(item.amount) ? (Number(item.amount) / Number(item.quantity)).toFixed(2) : ""}</td>
							<td>{item.amount}</td>
						</tr>
					))
				) : (
					<tr>
						<td className="text-center" colSpan={11}>
							<span className="badge badge-info">Record Not Found</span>
						</td>
					</tr>
				)}
			</>
		);
	};

	// export
	const exportData = async (format) => {
		if (format === "PDF") {
			window.$("#exportModal #closeBtn").click();

			setTimeout(() => {
				window.print();
			}, 250);
		} else if (format === "XLS") {
		}
	};

	// DSMs, user, station from API
	const [DSMArr, setDSMArr] = useState([]);
	const [userArr, setUserArr] = useState([]);
	const [stationArr, setStationArr] = useState([]);

	const [selectedDSM, setSelectedDSM] = useState("ALL");
	const [selectedUser, setSelectedUser] = useState("ALL");
	const [selectedStation, setSelectedStation] = useState("ALL");

	// filter
	// Station
	const [filteredUser, setFilteredUser] = useState([]);
	const [filteredDSM, setFilteredDSM] = useState([]);
	useEffect(
		(e) => {
			if (selectedStation === "ALL") {
				setFilteredUser(userArr);
				setFilteredDSM(DSMArr);
				setSelectedDSM("ALL");
				setSelectedUser("ALL");
			} else {
				if (true) {
					const arr = userArr.filter((arrElem) => arrElem.Station === selectedStation);
					setFilteredUser(arr.length > 0 ? arr : []);
				}
				if (true) {
					const arr = DSMArr.filter((arrElem) => arrElem.Station === selectedStation);
					setFilteredDSM(arr.length > 0 ? arr : []);
				}
			}
		},
		[selectedStation, DSMArr, userArr]
	);

	// get all
	const triggerGetAll = () => setRandom(Math.random());
	const [random, setRandom] = useState(0);
	const [dataArr, setDataArr] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [lastPage, setLastPage] = useState(0);
	const [limit, setLimit] = useState(50);
	const [total, setTotal] = useState(0);
	useEffect(
		(e) => {
			console.log(user);
			let stationGetQuery = "",
				userGetQuery = "",
				dsmGetQuery = "";
			if (user && user.profileType === "ADMIN") {
				stationGetQuery = selectedStation && selectedStation !== "ALL" ? "&station=" + selectedStation : "";
				userGetQuery = selectedUser && selectedUser !== "ALL" ? "&user=" + selectedUser : "";
			} else {
				stationGetQuery = "&station=" + user.Station;
				userGetQuery = "&user=" + user._id;
			}
			if (selectedDSM && selectedDSM !== "ALL") {
				dsmGetQuery = "&dsm=" + selectedDSM;
			}

			const getAllSale = async () => {
				setDataArr(null);
				contextDispatch({
					type: "SET_ACTIVE_PAGE_SPINNER",
					payload: true,
				});
				const response = await callAPI({
					URL: "sales/all?page=" + currentPage + "&limit=" + limit + stationGetQuery + userGetQuery + dsmGetQuery,
					abort: true,
				});
				contextDispatch({
					type: "SET_ACTIVE_PAGE_SPINNER",
					payload: false,
				});
				if (response.status !== 200 && response.status !== 404) return;
				setLastPage(response.lastPage);
				setTotal(response.total);
				setDataArr(response.status === 200 ? response.data : []);
			};
			getAllSale();
		},
		[currentPage, limit, random, contextDispatch, user, selectedDSM, selectedStation, selectedUser]
	);

	useEffect(() => {
		const getAllDSM = async () => {
			const responseAPI = await callAPI({
				URL: "common/mini?user=" + user._id,
			});
			if (responseAPI.status === 200) {
				setDSMArr(responseAPI.data.employee);
				setUserArr(responseAPI.data.user);
				setFilteredUser(responseAPI.data.user);
				setFilteredDSM(responseAPI.data.employee);
				setStationArr(responseAPI.data.station);
			}
		};
		getAllDSM();
	}, [user]);

	return (
		<div className="page-wrapper sales-all">
			<div className="page-content-wrapper">
				<motion.div initial={Animation.variants.out} animate={Animation.variants.in} exit={Animation.variants.exit} transition={Animation.PageTransition} className="page-content">
					<div className="card cardC">
						<div className="card-body">
							<div className="card-title cardC__head">
								{user.profileType === "ADMIN" && (
									<>
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
												<option value={"ALL"}>All Station</option>
												{stationArr.map((obj) => {
													return (
														<option value={obj._id} key={obj._id}>
															{obj.stationName}
														</option>
													);
												})}
											</Form.Select>
										</InputGroup>
										<InputGroup className="inputGroupC">
											<InputGroup.Text id="basic-addon1" className="inputGroupC__label">
												Manager
											</InputGroup.Text>
											<Form.Select
												className="form-control inputGroupC__input"
												title="Manager"
												value={selectedUser}
												onChange={(e) => {
													setSelectedUser(e.target.value);
													setCurrentPage(1);
												}}
											>
												<option value={"ALL"}>All Manager</option>
												{filteredUser.map((obj) => {
													return (
														<option value={obj._id} key={obj._id}>
															{obj.fullName}
														</option>
													);
												})}
											</Form.Select>
										</InputGroup>
									</>
								)}
								<InputGroup className="inputGroupC">
									<InputGroup.Text id="basic-addon1" className="inputGroupC__label">
										DSM
									</InputGroup.Text>
									<Form.Select
										className="form-control inputGroupC__input"
										title="DSM"
										value={selectedDSM}
										onChange={(e) => {
											setSelectedDSM(e.target.value);
											setCurrentPage(1);
										}}
									>
										<option value={"ALL"}>All DSM</option>
										{filteredDSM.map((obj) => {
											return (
												<option value={obj._id} key={obj._id}>
													{obj.name}
												</option>
											);
										})}
									</Form.Select>
								</InputGroup>

								<button type="button" data-toggle="tooltip" data-placement="top" title={"Excprt PDF"} onClick={(e) => modal("EXPORT")} className="btn btnIconC mr-2 border">
									<BiExport />
								</button>
								<button type="button" data-toggle="tooltip" data-placement="top" title={"Refresh"} onClick={triggerGetAll} className="btn btnIconC mr-2 border">
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
								<Pagination className="mb-0" total={total} currentPage={currentPage} setCurrentPage={setCurrentPage} lastPage={lastPage} pageSize={limit} />
							</div>
							<Table bordered responsive hover>
								<thead>
									<tr>
										<th>Bill</th>
										<th>Station</th>
										<th>Manager</th>
										<th>DSM</th>
										<th>CreatedDate</th>
										<th>Dispenser</th>
										<th>Customer</th>
										<th>Vehicle</th>
										<th>Quantity</th>
										<th>Price</th>
										<th>Amount</th>
									</tr>
								</thead>
								<tbody>{renderTable()}</tbody>
							</Table>
						</div>
					</div>
					{/* modal */}
					<div className="modal fade" id="saleModal">
						<div className="modal-dialog modal-dialog-centered modal-lg">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title">Sale Details</h5>
									<button type="button" className="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">×</span>
									</button>
								</div>
								<div className="modal-body">
									<div className="row textBlock">
										<div className="col-md-6 col-sm-12">
											<div className="block ">
												<label className="blockHead">Bill Details</label>
												<label>CNG Station</label>
												<span>{activeItem.Station ? activeItem.Station.stationName : ""}</span>
												<label>Manager</label>
												<span>{activeItem.Manager ? activeItem.Manager.fullName : ""}</span>
												<label>Bill No.</label>
												<span>{activeItem.billNumber}</span>
												<label>Quantity (KG) </label>
												<span>{activeItem.quantity} </span>
												<label>Amount</label>
												<span>{activeItem.amount} </span>
												<label>CNG Rate</label>
												<span>{activeItem.CNGRate} </span>
											</div>
										</div>
										<div className="col-md-6 col-sm-12">
											<div className="block">
												<label className="blockHead">Customer Details</label>
												<label>Name</label>
												<span>{activeItem.name} </span>
												<label>Contact No.</label>
												<span>{activeItem.contactNumber} </span>
												<label>Vehicle No.</label>
												<span>{activeItem.vehicleNumber} </span>
											</div>
										</div>
									</div>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-dismiss="modal">
										Close
									</button>
								</div>
							</div>
						</div>
					</div>

					{/*  export modal */}
					<div className="modal fade" id="exportModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div className="modal-dialog modal-dialog-centered">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title">Export Sales</h5>
									<button type="button" className="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div className="modal-body">
									<div className="row">
										<div className="col-12">
											<ReactHTMLTableToExcel className="btn btn-sm btn-info m-2 border" table="dataTable" filename="Sales" sheet="Sales" buttonText="Export as XLS" />
											<button className="btn btn-info btn-sm m-2" onClick={(e) => exportData("PDF")}>
												Export as PDF
											</button>
										</div>
									</div>
								</div>
								<div className="modal-footer mt-3">
									<div className="submitNote">{/* <span className={submitNoteClass} >{submitNoteTxt}</span>    */}</div>
									<div id="modalSpinner" style={{ transform: "scale(0.7)" }}>
										<div className="spinner-border text-success" role="status">
											<span className="sr-only">Loading...</span>
										</div>
									</div>
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
export default Sales;
