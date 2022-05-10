import { Switch, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/partials/ProtectedRoute";
import { useContext, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

// styles
import "./App.css";
import "./assets/styles/css/app.css";
import "./assets/styles/css/bootstrap.min.css";
import "./assets/styles/css/custom.css";
import "./assets/styles/scss/global.css";

// components
import Navbar from "./components/partials/Navbar";
import Sidebar from "./components/partials/Sidebar";
import Dashboard from "./components/pages/Dashboard";
import { handleSidebar } from "./common/navbar";
import Sales from "./components/pages/Sales";
import Reports from "./components/pages/Reports";
import Login from "./components/pages/Login";
import Stations from "./components/pages/Stations";
import QR from "./components/pages/QRCode";
import Manager from "./components/pages/Manager";
import MyStation from "./components/pages/MyStation";
import Profile from "./components/pages/Profile";
import Employee from "./components/pages/Employee";
import Helpdesk from "./components/pages/Helpdesk";

import { AppContext } from "./Context/Context";
import { Redirect } from "react-router-dom";

export default function App() {
	const location = useLocation();
	const { isLoggedIn, contextDispatch } = useContext(AppContext);

	useEffect(() => {
		contextDispatch({
			type: "REINIT_STATE",
		});
	}, [contextDispatch]);

	return isLoggedIn !== null ? (
		<div className="wrapper" id="wrapperDiv" style={{ overflowX: "hidden" }}>
			{isLoggedIn && (
				<>
					<Navbar />
					<Sidebar currentPath={location.pathname} />
				</>
			)}
			<AnimatePresence exitBeforeEnter>
				<Switch location={location} key={location.pathname}>
					<Route path="/" exact component={Login} />
					<ProtectedRoute path="/dashboard" exact component={Dashboard} />
					<ProtectedRoute path="/sales" exact component={Sales} />
					<ProtectedRoute path="/reports" exact component={Reports} />
					<ProtectedRoute path="/station/all" exact component={Stations} />
					<ProtectedRoute path="/station/me" exact component={MyStation} />
					<ProtectedRoute path="/profile" exact component={Profile} />
					<ProtectedRoute path="/user/all" exact component={Manager} />
					<ProtectedRoute path="/employee" exact component={Employee} />
					<ProtectedRoute path="/qr" exact component={QR} />
					<ProtectedRoute path="/helpdesk" exact component={Helpdesk} />
					<Redirect to={{ pathname: "/" }} />
				</Switch>
			</AnimatePresence>
			<div className="overlay toggle-btn-mobile" onClick={handleSidebar}></div>
		</div>
	) : (
		<>
			<h2> {isLoggedIn ? "true" : "false"} </h2>
		</>
	);
}
