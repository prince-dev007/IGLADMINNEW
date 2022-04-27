import { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
// animation
import { motion } from "framer-motion";
// styles
import "../../assets/styles/css/Login.css";
// images
import img_brandLogo from "../../assets/images/custom/brandLogo.png";
// auth
import { callAPI } from "../../common/common";
import { AppContext } from "../../Context/Context";

// icons

export default function Login() {
	// Context
	const { contextDispatch, isLoggedIn } = useContext(AppContext);
	useEffect(() => {
		contextDispatch({
			type: "SET_PAGE_TITLE",
			payload: "Login",
		});
	}, [contextDispatch]);

	const [email, setEmail] = useState("");
	const [pswd, setPswd] = useState("");
	const [loginBtnTxt, setloginBtnTxt] = useState("Log in");
	const [alertText, setAlertTxt] = useState("");

	const [spinnerClass, setSpinner] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();
		setAlertTxt("");
		if (!email || !pswd) {
			return;
			// return setAlertTxt("Required Email and Password");
		}
		setSpinner("loadingBtn");
		const response = await callAPI({
			URL: "auth/login",
			method: "POST",
			body: {
				email: email,
				password: pswd,
			},
		});
		setSpinner("");
		if (response.status !== 200) {
			return setAlertTxt(response.message);
		}
		setAlertTxt("");
		setloginBtnTxt("Redirecting...");
		contextDispatch({
			type: "LOGIN",
			payload: response.data,
		});
	};

	const variants = {
		in: {
			opacity: 1,
			y: 0,
		},
		out: {
			opacity: 0,
			y: "-100%",
		},
	};
	return (
		<>
			{isLoggedIn && <Redirect to={{ pathname: "/dashboard" }} />}
			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="loginBox">
				<div className="backdrop"></div>
				<div className="login">
					<form onSubmit={(e) => false}>
						<motion.div initial={variants.out} animate={variants.in} exit={variants.out} variants={variants} className="card cardLogin">
							<div className="card-title text-center">
								<div className="imgWrapper text-center">
									<img src={img_brandLogo} className="img-fluid" alt="" />
								</div>
							</div>
							<div className="card-body">
								<div className="head">
									<h6>Log in into your account</h6>
								</div>
								<fieldset className="formBox">
									<legend>UserID</legend>
									<input type="text" onChange={(e) => setEmail(e.target.value)} required placeholder="User Id (Mobile or Email)" title="Enter email or Mobile" className="formField" />
								</fieldset>
								<fieldset className="formBox" style={{ marginBottom: "10px" }}>
									<legend>Password</legend>
									<input type="password" onChange={(e) => setPswd(e.target.value)} required placeholder="Password" title="Enter password" className="formField" />
								</fieldset>
								<div style={{ opacity: alertText ? 1 : 0, backgroundColor: "#f44336", marginBottom: "10px", transition: "all 0.2s", borderRadius: "3px", padding: "2px 10px", color: "#fff" }}>
									<label style={{ marginBottom: "0" }}>{alertText}</label>
								</div>
								<button className={"btn " + (spinnerClass ? spinnerClass : "")} type="submit" onClick={handleLogin} id="loginBtn">
									<span className={spinnerClass ? "btnText hideBtnText" : "btnText"}>{loginBtnTxt}</span>
								</button>
							</div>
						</motion.div>
					</form>
				</div>
			</motion.div>
		</>
	);
}
