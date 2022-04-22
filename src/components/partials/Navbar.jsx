import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
// styles
import "../../assets/css/Sidebar.css";
// icons
import { RiAdminLine } from "react-icons/ri";
import { IoMenuOutline } from "react-icons/io5";
import { handleSidebar } from "../../common/navbar";
import { AppContext } from "../../Context/Context";

const Navbar = () => {
	// Context
	const { user, isActivePageSpinner, pageHead, contextDispatch } = useContext(AppContext);

	const [isHidden, setIsHidden] = useState(false);

	const [isOnline, setIsOnline] = useState(false);
	useEffect(() => {
		const init = () => {
			window.addEventListener("online", (e) => {
				setIsOnline(true);
				contextDispatch({
					type: "SET_ACTIVE_PAGE_SPINNER",
					payload: false,
				});
			});
			window.addEventListener("offline", (e) => {
				setIsOnline(false);
				contextDispatch({
					type: "SET_ACTIVE_PAGE_SPINNER",
					payload: true,
				});
			});
			setIsOnline(navigator.onLine);
		};
		init();
	}, []);

	function handleLogout() {
		contextDispatch({
			type: "LOGOUT",
		});
	}

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

	return (
		<motion.header initial="out" animate="in" exit="out" variants={variants} className="top-header">
			<nav className="navbar navbar-expand">
				<div className="left-topbar d-flex align-items-center">
					<button id="navbarBtn" onClick={handleSidebar} className="btn toggle-btn d-flex align-items-center justify-content-center">
						<IoMenuOutline />
					</button>
					<div className="d-flex">
						<h4 style={{ marginBottom: 0, fontWeight: 300 }} id="activePageHead">
							{pageHead}
						</h4>
					</div>
				</div>
				<div className="right-topbar ml-auto">
					<ul className="navbar-nav">
						<li className="nav-item dropdown dropdown-user-profile ">
							<div className="nav-link dropdown-toggle dropdown-toggle-nocaret px-3" data-toggle="dropdown" aria-expanded="false">
								<div className="media user-box align-items-center">
									<div className="media-body user-info">
										<p className="user-name mb-0">{user.fullName}</p>
										<span style={{ display: "block", fontSize: "12px", fontWeight: "700", padding: "2px 5px", background: isOnline ? "#4BB543 " : "#c9302c" }} className={" badge " + (isOnline ? "badge-success" : "badge-danger")}>
											{isOnline ? "Online" : "Offline"}
										</span>
									</div>
									<div style={{ position: "relative", cursor: "pointer" }} className="userAvatar">
										<RiAdminLine style={{ zIndex: 3 }} />
										<div className="spinner-border" id="pageSpinner" style={{ borderWidth: "1.5px", display: !isActivePageSpinner ? " none" : " block" }} role="status">
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
								<Link className="dropdown-item" onClick={handleLogout} to="/">
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
