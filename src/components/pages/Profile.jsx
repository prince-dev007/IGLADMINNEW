import { useEffect, useState, useContext } from "react";
// animation
import { motion } from "framer-motion";
import Animation from "../../common/Animation";
import { callAPI } from "../../common/common";

// Context
import { AppContext } from "../../Context/Context";

// icons

export default function Profile() {
	const { user, contextDispatch } = useContext(AppContext);

	useEffect(() => {
		contextDispatch({
			type: "SET_PAGE_TITLE",
			payload: "My Profile",
		});
		contextDispatch({
			type: "SET_ACTIVE_PAGE_HEAD",
			payload: "My Profile",
		});

		return () => {
			contextDispatch({
				type: "SET_ACTIVE_PAGE_SPINNER",
				payload: true,
			});
		};
	}, [contextDispatch]);
	function submitForm() {}

	const [stationName, setStationName] = useState("");
	const [DSO, setDSO] = useState("");
	const [address, setAddress] = useState("");
	const [pincode, setPincode] = useState("");
	const [TINNumber, setTINNumber] = useState("");
	const [CNGRate, setCNGRate] = useState("");
	useEffect(() => {
		async function getProfile() {
			const response = await callAPI({
				URL: "profile/" + user._id,
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
		getProfile();
	}, []);

	return (
		<div className="page-wrapper">
			<div className="d-none">{DSO + address + pincode + TINNumber + CNGRate}</div>
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
												<legend>Full Name</legend>
												<input type="text" required placeholder="Station Name" value={stationName} onChange={(e) => setStationName(e.target.value)} className="formField" />
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
