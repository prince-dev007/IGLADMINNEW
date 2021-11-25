import { useState, useEffect } from "react";
import { handleSidebar } from "../../common/navbar";
import { motion } from "framer-motion";
// styles
import "../../assets/css/Sidebar.css";
// icons
import { RiAdminLine } from "react-icons/ri";
import { IoMenuOutline } from "react-icons/io5";
import { getUser, logOut } from "../../common/Auth";
import { Link } from "react-router-dom";

const Navbar = () => {
	const [isHidden, setIsHidden] = useState(false);
	const variants = {
		in: {
			opactiy: 1,
			y: 0,
		},
		out: {
			opactiy: 0,
			y: "-100%",
		},
	};
	const [isOnline, setIsOnline] = useState(false);
	useEffect(() => {
		const init = () => {
			setInterval(() => {
				navigator.onLine ? setIsOnline(true) : setIsOnline(false);
			}, 500);
		};
		init();
	}, []);

	// user
	// const [userName, setUserName] = useState(getUser().fullName);

	return (
		<motion.header initial="out" animate="in" exit="out" variants={variants} className="top-header">
			<nav className="navbar navbar-expand">
				<div className="left-topbar d-flex align-items-center">
					<button id="navbarBtn" onClick={handleSidebar} className="btn toggle-btn d-flex align-items-center justify-content-center">
						<IoMenuOutline />
					</button>
					<div className="d-flex">
						<h4 style={{ marginBottom: 0, fontWeight: 300 }} id="activePageHead">
							{}
						</h4>
					</div>
				</div>
				<div className="right-topbar ml-auto">
					<ul className="navbar-nav">
						<li className="nav-item dropdown dropdown-user-profile ">
							<div className="nav-link dropdown-toggle dropdown-toggle-nocaret px-3" data-toggle="dropdown" aria-expanded="false">
								<div className="media user-box align-items-center">
									<div className="media-body user-info">
										<p className="user-name mb-0">{getUser().fullName}</p>
										<span style={{ display: "block", fontSize: "12px", fontWeight: "700", padding: "2px 5px", background: isOnline ? "#4BB543 " : "#c9302c" }} className={" badge " + (isOnline ? "badge-success" : "badge-danger")}>
											{isOnline ? "Online" : "Offline"}
										</span>
									</div>
									<div style={{ position: "relative", cursor: "pointer" }} className="userAvatar">
										<RiAdminLine style={{ zIndex: 3 }} />
										<div className="spinner-border" id="pageSpinner" style={{ borderWidth: "1.5px", display: isOnline ? " none" : " block" }} role="status">
											<span className="sr-only">Loading...</span>
										</div>
									</div>
								</div>
							</div>
							<div className={isHidden ? "dropdown-menu dropdown-menu-right show" : "dropdown-menu dropdown-menu-right"} onBlur={() => setIsHidden(false)}>
								<Link className="dropdown-item" to="/profile" onClick={() => setIsHidden(!isHidden)}>
									<i className="bx bx-user"></i>
									<span>Profile</span>
								</Link>
								<Link className="dropdown-item" to="/settings" onClick={() => setIsHidden(!isHidden)}>
									<i className="bx bx-cog"></i>
									<span>Settings</span>
								</Link>
								<Link className="dropdown-item" to="/dashboard" onClick={() => setIsHidden(!isHidden)}>
									<i className="bx bx-tachometer"></i>
									<span>Dashboard</span>
								</Link>
								<div className="dropdown-divider mb-0"></div>
								<Link className="dropdown-item" onClick={logOut} to="/">
									<i className="bx bx-power-off"></i>
									<span>Logout</span>
								</Link>
							</div>
						</li>
					</ul>
				</div>
			</nav>
		</motion.header>
	);
};
export default Navbar;
