import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
// animation
import { motion } from "framer-motion";
import Animation from "../../common/Animation";
// components
import { Graph1, CardGraph1, CardGraph2, ColumnChart, Donut } from "../partials/Graph";
import { callAPI } from "../../common/common";
import { useState } from "react/cjs/react.development";

const Dashboard = () => {
	useEffect(() => {
		document.title = "IGL ADMIN | Dashboard";
		window.$("#activePageHead").text("Dashboard");
		window.$("#pageSpinner").hide();
		return () => {
			window.$("#pageSpinner").show();
		};
	}, []);

	const [totalAmount, setTotalAmount] = useState(0);
	const [billCount, setBillCount] = useState(0);
	const [totalQuantity, setTotalQuantity] = useState(0);
	const [todayTotalAmt, setTodayTotalAmt] = useState(0);
	useEffect(() => {
		const initAPI = async () => {
			const response = await callAPI({
				URL: "dashboard/summary",
			});
			if (response.status !== 200) return;
			const data = response.data;
			setBillCount(data.billCount);
			setTotalAmount(data.totalAmount);
			setTotalQuantity(data.totalQuantity);
			setTodayTotalAmt(data.todayTotalAmt);
		};
		initAPI();
	}, []);

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
							<div className="card p-4" style={{ borderRadius: "15px", overflow: "hidden" }}>
								<Donut />
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};
export default Dashboard;
