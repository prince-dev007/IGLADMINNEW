import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import { getIsLoggedIn } from "./common/Auth";
import ProtectedRoute from "./components/partials/ProtectedRoute";
import { AnimatePresence } from "framer-motion";

// styles
import "./App.css";
import "./assets/css/app.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/custom.css";

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

function App() {
	const location = useLocation();
	return (
		<div className="wrapper" id="wrapperDiv" style={{ overflowX: "hidden" }}>
			{" "}
			{getIsLoggedIn() && (
				<>
					<Navbar />
					<Sidebar currentPath={location.pathname} />{" "}
				</>
			)}{" "}
			<AnimatePresence exitBeforeEnter>
				<Switch location={location} key={location.pathname}>
					<Route path="/" exact component={Login} />
					<ProtectedRoute path="/dashboard" exact component={Dashboard} />
					<ProtectedRoute path="/sales" exact component={Sales} />
					<ProtectedRoute path="/reports" exact component={Reports} />
					<ProtectedRoute path="/stations" exact component={Stations} />
					<ProtectedRoute path="/myStation" exact component={MyStation} />
					<ProtectedRoute path="/manager" exact component={Manager} />
					<ProtectedRoute path="/qr" exact component={QR} /> <Redirect to={{ pathname: "/" }} />{" "}
				</Switch>{" "}
			</AnimatePresence>{" "}
			<div className="overlay toggle-btn-mobile" onClick={handleSidebar}>
				{" "}
			</div>{" "}
		</div>
	);
}

export default App;
