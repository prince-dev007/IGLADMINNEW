import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// animation
import { motion } from "framer-motion";
import Animation from "../../common/Animation";
// components
import { Graph1, CardGraph1, CardGraph2, ColumnChart, Donut } from "../partials/Graph";
import { callAPI } from "../../common/common";
import { AppContext } from "../../Context/Context";

const Dashboard = () => {
	const { user, contextDispatch } = useContext(AppContext);

	useEffect(() => {
		contextDispatch({
			type: "SET_PAGE_TITLE",
			payload: "Dashboard",
		});
		contextDispatch({
			type: "SET_ACTIVE_PAGE_HEAD",
			payload: "Dashboard",
		});
		// window.$("#pageSpinner").hide();

		return () => {
			contextDispatch({
				type: "SET_ACTIVE_PAGE_SPINNER",
				payload: true,
			});
		};
	}, [contextDispatch]);

	const [totalAmount, setTotalAmount] = useState(0);
	const [billCount, setBillCount] = useState(0);
	const [totalQuantity, setTotalQuantity] = useState(0);
	const [todayTotalAmt, setTodayTotalAmt] = useState(0);

	// donut data
	const [donutData, setDonutData] = useState([]);

	useEffect(() => {
		let queryStr = "";
		if (user.profileType !== "ADMIN") {
			queryStr = "?station=" + user.Station + "&user=" + user._id;
		}
		const initAPI = async () => {
			contextDispatch({
				type: "SET_ACTIVE_PAGE_SPINNER",
				payload: true,
			});
			const response = await callAPI({
				URL: "dashboard/summary" + queryStr,
			});
			contextDispatch({
				type: "SET_ACTIVE_PAGE_SPINNER",
				payload: false,
			});
			if (response.status !== 200) return;
			const data = response.data.counts;
			setBillCount(data.billCount.toFixed(0));
			setTotalAmount(data.totalAmount.toFixed(0));
			setTotalQuantity(data.totalQuantity.toFixed(0));
			setTodayTotalAmt(data.todayTotalAmt.toFixed(0));
			setDonutData(response.data.stationGroup);
		};
		initAPI();
	}, [user, contextDispatch]);

	return (
		<div className="page-wrapper">
			<div className="page-content-wrapper">
				<motion.div initial={Animation.variants.out} animate={Animation.variants.in} exit={Animation.variants.exit} transition={Animation.PageTransition} className="page-content">
					<div className="row ">
						<div className="col-sm-12 col-md-3">
							<div className="card " style={{ borderRadius: "15px" }}>
								<Link style={{ textDecoration: "none" }} to="/sales">
									<div className="card-body">
										<div>
											<CardGraph1 title={"Sales"} count={"Rs. " + totalAmount} />
										</div>
									</div>
								</Link>
							</div>
						</div>
						<div className="col-sm-12 col-md-3">
							<div className="card " style={{ borderRadius: "15px" }}>
								<Link style={{ textDecoration: "none" }} to="/sales">
									<div className="card-body">
										<div>
											<CardGraph2 title={"Today Sales"} count={"Rs. " + todayTotalAmt} />
										</div>
									</div>
								</Link>
							</div>
						</div>
						<div className="col-sm-12 col-md-3">
							<div className="card " style={{ borderRadius: "15px" }}>
								<Link style={{ textDecoration: "none" }} to="/sales">
									<div className="card-body">
										<div>
											<CardGraph1 title={"Kgs"} count={totalQuantity} />
										</div>
									</div>
								</Link>
							</div>
						</div>
						<div className="col-sm-12 col-md-3">
							<div className="card " style={{ borderRadius: "15px" }}>
								<Link style={{ textDecoration: "none" }} to="/sales">
									<div className="card-body">
										<div>
											<CardGraph2 title={"Bills"} count={billCount} />
										</div>
									</div>
								</Link>
							</div>
						</div>
					</div>
					<div className="row ">
						<div className="col-md-12">
							<div className="card p-4" style={{ borderRadius: "15px", overflow: "hidden" }}>
								<Graph1 />
							</div>
						</div>
						<div className="col-md-6">
							<div className="card p-4" style={{ borderRadius: "15px", overflow: "hidden" }}>
								<ColumnChart />
							</div>
						</div>
						<div className="col-md-6">
							{donutData != null && donutData.length > 0 && (
								<div className="card p-4" style={{ borderRadius: "15px", overflow: "hidden" }}>
									<Donut donutData={donutData} />
								</div>
							)}
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};
export default Dashboard;
