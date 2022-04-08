import { Chart } from "react-google-charts";
import ApexChart from "react-apexcharts";
import { useEffect, useState } from "react";
// import  {randomizeArra} from 'react-apexcharts'
export const Graph = () => {
	return (
		<div className="">
			<Chart
				// width={'600px'}
				height={"400px"}
				chartType="LineChart"
				loader={<div>Loading Chart</div>}
				data={[
					["x", "Quantity (ltr)"],
					["21-3-21", 3100],
					["22-3-21", 3300],
					["23-3-21", 3430],
					["24-3-21", 3200],
					["25-3-21", 3090],
					["26-3-21", 3105],
					["30-3-21", 3900],
					["31-3-21", 3910],
					["1-4-21", 3800],
					["24-3-21", 3200],
					["25-3-21", 3090],
					["26-3-21", 3105],
					["26-3-21", 3600],
					["27-3-21", 3500],
					["28-3-21", 3700],
					["29-3-21", 3600],
					["30-3-21", 3900],
					["26-3-21", 3600],
					["27-3-21", 3500],
					["28-3-21", 3700],
					["29-3-21", 3600],
					["30-3-21", 3900],
					["31-3-21", 3910],
					["1-4-21", 3800],
					["24-3-21", 3200],
					["25-3-21", 3090],
					["30-3-21", 3900],
					["26-3-21", 3600],
					["27-3-21", 3500],
					["28-3-21", 3700],
					["29-3-21", 3600],
					["30-3-21", 3900],
					["31-3-21", 3910],
					["1-4-21", 3800],
					["24-3-21", 3200],
					["25-3-21", 3090],
					["26-3-21", 3105],
					["26-3-21", 3600],
					["30-3-21", 3900],
					["31-3-21", 3910],
					["1-4-21", 3800],
					["24-3-21", 3200],
					["25-3-21", 3090],
					["26-3-21", 3105],
					["26-3-21", 3600],
					["27-3-21", 3500],
					["28-3-21", 3700],
					["29-3-21", 3600],
					["27-3-21", 3500],
					["28-3-21", 3700],
					["29-3-21", 3600],
					["30-3-21", 3900],
					["31-3-21", 3910],
					["1-4-21", 3800],
					["2-4-21", 4000],
					["3-4-21", 3900],
					["4-4-21", 4001],
					["5-4-21", 3990],
				]}
				options={{
					hAxis: {
						title: "Sales",
					},
					vAxis: {
						title: "Quantity (ltr)",
					},
					series: {
						0: { curveType: "function" },
					},
				}}
				rootProps={{ "data-testid": "1" }}
			/>
		</div>
	);
};

export const Graph1 = () => {
	const data = {
		series: [
			{
				name: "Sales",
				data: [31, 40, 28, 51, 42, 109, 100],
			},
			{
				name: "Quantity",
				data: [11, 32, 45, 32, 34, 52, 41],
			},
		],
		options: {
			chart: {
				height: 350,
				type: "area",
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: "smooth",
			},
			xaxis: {
				type: "datetime",
				categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"],
			},
			tooltip: {
				x: {
					format: "dd/MM/yy HH:mm",
				},
			},
		},
	};
	return (
		<div>
			<ApexChart
				options={data.options}
				series={data.series}
				type="area"
				height="350"
				// width="800"
			/>
		</div>
	);
};

export const CardGraph1 = ({ title, count }) => {
	const data = {
		series: [
			{
				data: [31, 40, 28, 51, 42, 109, 100],
			},
		],
		options: {
			chart: {
				type: "area",
				height: 160,
				sparkline: {
					enabled: true,
				},
			},
			stroke: {
				curve: "straight",
			},
			fill: {
				opacity: 0.3,
			},
			yaxis: {
				min: 0,
			},
			colors: ["#DCE6EC"],
			title: {
				text: count,
				offsetX: 0,
				style: {
					fontSize: "30px",
				},
			},
			subtitle: {
				text: title,
				offsetX: 0,
				style: {
					fontSize: "18px",
				},
			},
		},
	};
	return (
		<div>
			<ApexChart options={data.options} series={data.series} type="area" />
		</div>
	);
};
export const CardGraph2 = ({ title, count }) => {
	const data = {
		series: [
			{
				data: [11, 32, 45, 32, 34, 52, 41],
			},
		],
		options: {
			chart: {
				type: "area",
				height: 160,
				sparkline: {
					enabled: true,
				},
			},
			stroke: {
				curve: "straight",
			},
			fill: {
				opacity: 0.3,
			},
			xaxis: {
				crosshairs: {
					width: 1,
				},
			},
			yaxis: {
				min: 0,
			},
			title: {
				text: count,
				offsetX: 0,
				style: {
					fontSize: "24px",
				},
			},
			subtitle: {
				text: title,
				offsetX: 0,
				style: {
					fontSize: "14px",
				},
			},
		},
	};
	return (
		<div>
			<ApexChart options={data.options} series={data.series} type="area" />
		</div>
	);
};

export const ColumnChart = () => {
	const data = {
		series: [
			{
				name: "Net Profit",
				data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
			},
			{
				name: "Revenue",
				data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
			},
			{
				name: "Free Cash Flow",
				data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
			},
		],
		options: {
			chart: {
				type: "bar",
				height: 350,
			},
			plotOptions: {
				bar: {
					horizontal: false,
					columnWidth: "55%",
					endingShape: "rounded",
				},
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				show: true,
				width: 2,
				colors: ["transparent"],
			},
			xaxis: {
				categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
			},
			yaxis: {
				title: {
					text: "$ (thousands)",
				},
			},
			fill: {
				opacity: 1,
			},
			tooltip: {
				y: {
					formatter: function (val) {
						return "$ " + val + " thousands";
					},
				},
			},
		},
	};
	return (
		<div>
			<ApexChart options={data.options} series={data.series} type="bar" height="315" />
		</div>
	);
};
export const Donut = ({ ...props }) => {
	const [series, setSeries] = useState([1, 2, 3, 4, 5]);
	const [labels, setLabels] = useState(["Station1", "Station2", "Station3", "Station4", "Station5"]);
	// const [triggerRender, setTriggerRender] = useState(0);

	useEffect(() => {
		console.log(props);
		const seriesArr = [];
		const labelArr = [];
		for (const obj of props.donutData) {
			seriesArr.push(obj.count);
			labelArr.push(obj.stationName);
		}
		setLabels(labelArr);
		setSeries(seriesArr);
		if (props.donutData && props.donutData.length > 0) {
			//setTriggerRender(Math.random());
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
