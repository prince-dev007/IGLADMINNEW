import { useEffect, useState } from "react";
// animation
import { motion } from "framer-motion";
import Animation from "../../common/Animation";
import { callAPI } from "../../common/common";
import { getUser } from "../../common/Auth";

// icons

export default function MyStation() {
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
	function submitForm() {}

	// get
	// const [submitNoteClass, setSubmitNoteClass] = useState("");
	// const [submitNoteTxt, setSubmitNoteTxt] = useState("");

	// const [stationId, setStationId] = useState("");
	const [stationName, setStationName] = useState("");
	const [DSO, setDSO] = useState("");
	const [address, setAddress] = useState("");
	const [pincode, setPincode] = useState("");
	const [TINNumber, setTINNumber] = useState("");
	const [CNGRate, setCNGRate] = useState("");

	useEffect(() => {
		window.$("#activePageHead").text("My Station");
		window.$("#pageSpinner").hide();
		document.title = "IGL ADMIN | My Station";
	}, []);

	useEffect(() => {
		const user = getUser();
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
		}
		getStation();
	}, []);

	return (
		<div className="page-wrapper">
			<div className="page-content-wrapper">
				<motion.div initial={Animation.variants.out} animate={Animation.variants.in} exit={Animation.variants.exit} transition={Animation.PageTransition} className="page-content">
					<div className="card dataCard">
						<div className="card-body">
							<div className="card-title "></div>
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
										<div className="col-md-12 d-none" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
											<div className="submitNote">
												<span id="submitNote" className={""}>
													{/* {submitNoteTxt} */}
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
