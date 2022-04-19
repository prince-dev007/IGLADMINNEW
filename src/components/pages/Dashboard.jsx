import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
// animation
import { motion } from "framer-motion";
import Animation from "../../common/Animation";
// components
import ApexChart from "react-apexcharts";
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

	const [allTimeStat, setAllTimeStat] = useState({
		billCount: 0,
		quantity: 0,
		amount: 0,
	});
	const [todayStat, setTodayStat] = useState({
		billCount: 0,
		quantity: 0,
		amount: 0,
	});

	// donut data
	const [allTimePie, setAllTimePie] = useState({});
	const [todayPie, setTodayPie] = useState({});

	useEffect(() => {
		let stationRes = [];
		// Station Data
		const getAllStation = async () => {
			const response = await callAPI({
				URL: "stations/mini?fields=stationId,stationName",
			});
			if (response.status === 200) {
				// setStationArr((val) => [...val, ...response.data]);
				stationRes = response.data;
			}
		};
		// dashboard summary
		let queryStr = "";
		if (user.profileType !== "ADMIN") {
			queryStr = "?station=" + user.Station + "&user=" + user._id;
		}
		const initAPI = async () => {
			await getAllStation();
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
			const allTimeRes = response.data.allTime;
			const todayRes = response.data.today;
			setAllTimeStat({
				billCount: allTimeRes.billCount,
				quantity: allTimeRes.billQuantity.toFixed(2),
				amount: allTimeRes.billAmount.toFixed(2),
			});

			setTodayStat({
				billCount: todayRes.billCount,
				quantity: todayRes.billQuantity.toFixed(2),
				amount: todayRes.billAmount.toFixed(2),
			});

			if (response.data?.graph?.pie?.allTime) {
				const allTimePieRes = response.data.graph.pie.allTime;

				const donutData = [];
				allTimePieRes.map((elem) => {
					const filteredStationArr = stationRes.filter((e) => elem._id === e._id);
					if (filteredStationArr.length === 0) return;
					elem.stationName = filteredStationArr[0].stationName;
					donutData.push(elem);
				});

				setAllTimePie(allTimePieRes);
			}

			if (response.data?.graph?.pie?.today) {
				const allTimePieRes = response.data.graph.pie.today;

				const donutData = [];
				allTimePieRes.map((elem) => {
					const filteredStationArr = stationRes.filter((e) => elem._id === e._id);
					if (filteredStationArr.length === 0) return;
					elem.stationName = filteredStationArr[0].stationName;
					donutData.push(elem);
				});

				setTodayPie(allTimePieRes);
			}
		};
		initAPI();
	}, [user, contextDispatch]);

	return (
		<div className="page-wrapper">
			<div className="page-content-wrapper">
				<motion.div initial={Animation.variants.out} animate={Animation.variants.in} exit={Animation.variants.exit} transition={Animation.PageTransition} className="page-content">
					<div className="row">
						<div className="col-12">
							<Card border="info" className="dashboard-summary-card">
								<Card.Header className="dashboard-summary-card__title">
									<b>All Time</b>
								</Card.Header>
								<Card.Body>
									<div className="row">
										<div className="col-sm-12 col-md-3 dashboard-summary-card__detail-card">
											<h5>Amount</h5>
											<p>{allTimeStat.amount}</p>
										</div>
										<div className="col-sm-12 col-md-3 dashboard-summary-card__detail-card">
											<h5>Quantity</h5>
											<p>{allTimeStat.quantity}</p>
										</div>
										<div className="col-sm-12 col-md-3 dashboard-summary-card__detail-card">
											<h5>Bill Count</h5>
											<p>{allTimeStat.billCount}</p>
										</div>
									</div>
								</Card.Body>
							</Card>
						</div>
						<div className="col-12">
							<Card border="success" className="dashboard-summary-card">
								<Card.Header className="dashboard-summary-card__title">
									<b>Today</b>
								</Card.Header>
								<Card.Body>
									<div className="row">
										<div className="col-sm-12 col-md-3 dashboard-summary-card__detail-card">
											<h5>Amount</h5>
											<p>{todayStat.amount}</p>
										</div>
										<div className="col-sm-12 col-md-3 dashboard-summary-card__detail-card">
											<h5>Quantity</h5>
											<p>{todayStat.quantity}</p>
										</div>
										<div className="col-sm-12 col-md-3 dashboard-summary-card__detail-card">
											<h5>Bill Count</h5>
											<p>{todayStat.billCount}</p>
										</div>
									</div>
								</Card.Body>
							</Card>
						</div>
					</div>
					{user.profileType === "ADMIN" && (
						<div className="row ">
							<div className="col-md-6">
								<div className="card p-4" style={{ borderRadius: "15px", overflow: "hidden" }}>
									<h4>All Time Data</h4>
									<StationDonut donutData={allTimePie} />
								</div>
							</div>
							<div className="col-md-6">
								<div className="card p-4" style={{ borderRadius: "15px", overflow: "hidden" }}>
									<h4>Today Data</h4>
									<StationDonut donutData={todayPie} />
								</div>
							</div>
						</div>
					)}
				</motion.div>
			</div>
		</div>
	);
};
export default Dashboard;

const StationDonut = (props) => {
	const [series, setSeries] = useState([1]);
	const [labels, setLabels] = useState(["Station"]);

	useEffect(() => {
		if (props.donutData && props.donutData.length > 0) {
			const seriesArr = [];
			const labelArr = [];
			for (const obj of props.donutData) {
				seriesArr.push(obj.count);
				labelArr.push(obj.stationName);
			}
			setLabels(labelArr);
			setSeries(seriesArr);
		}
	}, [props]);

	const data = {
		series: series,
		options: {
			chart: {
				type: "donut",
			},
			labels: labels,
			responsive: [
				{
					breakpoint: 480,
					options: {
						chart: {
							width: 200,
						},
						legend: {
							position: "bottom",
						},
					},
				},
			],
		},
	};
	return (
		<div>
			<ApexChart options={data.options} series={data.series} labels={data.labels} type="donut" height="350" />
		</div>
	);
};
