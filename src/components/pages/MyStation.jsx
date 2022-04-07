import { useEffect, useState, useContext } from "react";
// animation
import { motion } from "framer-motion";
import Animation from "../../common/Animation";
import { callAPI } from "../../common/common";

// Context
import { AppContext } from "../../Context/Context";

// icons

export default function MyStation() {
	const { user, contextDispatch } = useContext(AppContext);

	useEffect(() => {
		contextDispatch({
			type: "SET_PAGE_TITLE",
			payload: "My Station",
		});
		contextDispatch({
			type: "SET_ACTIVE_PAGE_HEAD",
			payload: "My Station",
		});

		return () => {
			contextDispatch({
				type: "SET_ACTIVE_PAGE_SPINNER",
				payload: true,
			});
		};
	}, [contextDispatch]);
	// const [dispensor, setDispensor] = useState("");
	// const [side, setSide] = useState("");
	// const [qrString, setQRString] = useState("");
	// const [isHiddenQR, setIsHiddenQR] = useState(true);

	// const genQR = () => {
	// 	setIsHiddenQR(true);
	// 	setQRString(
	// 		JSON.stringify({
	// 			dispensor,
	// 			side,
	// 		})
	// 	);
	// 	setIsHiddenQR(false);
	// };

	// submit
	async function submitForm(e) {
		e.preventDefault();
		setSubmitNoteTxt("");
		window.$("#stationModal #modalSpinner").show();
		const response = await callAPI({
			URL: "stations/" + stationId,
			method: stationId === "NEW" ? "POST" : "PUT",
			body: {
				stationName,
				stationCode,
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
				setRetrigger(Math.random());
			}, 1000);
		} else {
			setSubmitNoteClass("text-danger");
			setSubmitNoteTxt(response.message);
		}
	}
	const [retrigger, setRetrigger] = useState("");
	// get
	const [submitNoteClass, setSubmitNoteClass] = useState("");
	const [submitNoteTxt, setSubmitNoteTxt] = useState("");

	const [stationId, setStationId] = useState(user.Station);
	const [stationName, setStationName] = useState("");
	const [stationCode, setStationCode] = useState("");
	const [DSO, setDSO] = useState("");
	const [address, setAddress] = useState("");
	const [pincode, setPincode] = useState("");
	const [TINNumber, setTINNumber] = useState("");
	const [CNGRate, setCNGRate] = useState("");

	const [timeOutState, setTimeOutState] = useState("");
	useEffect(
		(e) => {
			if (timeOutState) {
				clearTimeout(timeOutState);
			}
			setTimeOutState(
				setTimeout((e) => {
					setSubmitNoteTxt("");
				}, 3000)
			);
		},
		[submitNoteTxt]
	);

	useEffect(() => {
		setStationId(user.Station);
		async function getStation() {
			const response = await callAPI({
				URL: "stations/" + user.Station,
			});
			if (response.status !== 200) return;

			const data = response.data;
			setStationName(data.stationName);
			setDSO(data.DSO);
			setAddress(data.address);
			setPincode(data.pincode);
			setTINNumber(data.TINNumber);
			setCNGRate(data.CNGRate);
			setStationCode(data.stationCode);
		}
		getStation();
	}, [user, retrigger]);

	return (
		<div className="page-wrapper">
			<div className="page-content-wrapper">
				<motion.div initial={Animation.variants.out} animate={Animation.variants.in} exit={Animation.variants.exit} transition={Animation.PageTransition} className="page-content">
					<div className="card dataCard">
						<div className="card-body">
							<div className="card-title ">
								<h4 className="my-4" style={{ fontWeight: "bold" }}>
									{stationName}
								</h4>
							</div>
							<div className="row">
								<div className="col-md-12">
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
												<legend>Station Code</legend>
												<input type="text" placeholder="Station Code for Bill" value={stationCode} onChange={(e) => setStationCode(e.target.value)} className="formField" />
											</fieldset>
											<fieldset className="formBox">
												<legend>CNG Rate</legend>
												<input type="number" required placeholder="CNG Rate of Station" value={CNGRate} onChange={(e) => setCNGRate(e.target.value)} className="formField" />
											</fieldset>
										</div>
										<div className="col-md-6">
											<fieldset className="formBox">
												<legend>TIN Number</legend>
												<input type="text" placeholder="TIN Number of Station" value={TINNumber} onChange={(e) => setTINNumber(e.target.value)} className="formField" />
											</fieldset>
											<fieldset className="formBox">
												<legend>Pincode </legend>
												<input type="number" placeholder="Pincode of Station" value={pincode} onChange={(e) => setPincode(e.target.value)} className="formField" />
											</fieldset>
											<fieldset className="formBox">
												<legend>Address</legend>
												<textarea className="formField" style={{ height: "125px" }} onChange={(e) => setAddress(e.target.value)} value={address} placeholder="Address of Station"></textarea>
											</fieldset>
										</div>
										<div className="col-md-12" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
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
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
