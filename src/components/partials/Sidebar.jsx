import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { handleSidebar } from "../../common/navbar";
import { motion } from "framer-motion";

// images
import img_brandLogo from "../../assets/images/custom/brandLogo.png";
// icons
import { IoMenuOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { GoGraph } from "react-icons/go";
// import { FcStatistics } from "react-icons/fc";
import { FaUserFriends, FaRupeeSign } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiGasStationLine, RiAdminLine } from "react-icons/ri";
import { AppContext } from "../../Context/Context";

const Sidebar = ({ currentPath }) => {
	// Context
	const { isAdminLoggedIn } = useContext(AppContext);

	const activeClassName = "mm-active";
	const [navToggled, setNavToggled] = useState(false);
	const navToggle = () => {
		handleSidebar();
		setNavToggled(window.$("#wrapperDiv").hasClass("toggled"));
	};
	const navToggleSm = () => {
		if (window.innerWidth <= 1024) navToggle();
	};

	return (
		<motion.div
			initial="out"
			animate="in"
			exit="out"
			variants={{
				in: {
					opactiy: 1,
					x: 0,
				},
				out: {
					opactiy: 0,
					x: "-100%",
				},
			}}
			className="sidebar-wrapper"
			data-simplebar="init"
			style={{
				overflowY: "auto",
				overflowX: "hidden",
				top: 0,
				height: "100%",
			}}
		>
			<div className="simplebar-wrapper" style={{ margin: "0px" }}>
				<div className="simplebar-mask">
					<div className="simplebar-offset" style={{ right: 0, bottom: 0 }}>
						<div className="simplebar-content-wrapper" style={{ height: "100%", overflow: "hidden" }}>
							<div className="simplebar-content mm-active" style={{ padding: "0" }}>
								<div className="sidebar-header" style={{ position: "relative" }}>
									<button onClick={navToggle} className=" toggle-btn d-flex align-items-center justify-content-center">
										{navToggled ? (
											<img
												src={img_brandLogo}
												className="logo-icon-2 img-fluid "
												style={{
													height: "45px",
													width: "45px",
												}}
												alt=""
											/>
										) : (
											<IoMenuOutline />
										)}
									</button>
									<div className="imgBrand mr-2">
										<img src={img_brandLogo} className="logo-icon-2 img-fluid" alt="" />
									</div>
								</div>
								<ul className="metismenu mm-show" id="menu">
									<li className={currentPath === "/dashboard" ? activeClassName : ""} onClick={navToggleSm}>
										<Link to={"/dashboard"}>
											<div className="parent-icon icon-color-2">
												<MdDashboard />
											</div>
											<div className="menu-title">Dashboard</div>
										</Link>
									</li>
									<li className={currentPath === "/sales" ? activeClassName : ""} onClick={navToggleSm}>
										<Link to={"/sales"}>
											<div className="parent-icon icon-color-3">
												<GoGraph />
											</div>
											<div className="menu-title">Sales</div>
										</Link>
									</li>
									{isAdminLoggedIn ? (
										<>
											<li className={currentPath === "/station/all" ? activeClassName : ""} onClick={navToggleSm}>
												<Link to={"/station/all"}>
													<div className="parent-icon icon-color-3">
														<RiGasStationLine />
													</div>
													<div className="menu-title">Stations</div>
												</Link>
											</li>
											<li className={currentPath === "/user/all" ? activeClassName : ""} onClick={navToggleSm}>
												<Link to={"/user/all"}>
													<div className="parent-icon icon-color-3">
														<RiAdminLine />
													</div>
													<div className="menu-title">Managers</div>
												</Link>
											</li>
										</>
									) : (
										<>
											<li className={currentPath === "/station/me" ? activeClassName : ""} onClick={navToggleSm}>
												<Link to={"/station/me"}>
													<div className="parent-icon icon-color-3">
														<RiGasStationLine />
													</div>
													<div className="menu-title">My Station</div>
												</Link>
											</li>
										</>
									)}
									<li className={currentPath === "/employee" ? activeClassName : ""} onClick={navToggleSm}>
										<Link to={"/employee"}>
											<div className="parent-icon icon-color-3">
												<FaUserFriends />
											</div>
											<div className="menu-title">Employees</div>
										</Link>
									</li>
									<li className={currentPath === "/profile" ? activeClassName : ""} onClick={navToggleSm}>
										<Link to={"/profile"}>
											<div className="parent-icon icon-color-3">
												<CgProfile />
											</div>
											<div className="menu-title">My Profile</div>
										</Link>
									</li>
									<li className={currentPath === "/helpdesk" ? activeClassName : ""} onClick={navToggleSm}>
										<Link to={"/helpdesk"}>
											<div className="parent-icon icon-color-3">
												<MdDashboard />
											</div>
											<div className="menu-title">Helpdesk</div>
										</Link>
									</li>
									<li className={currentPath === "/pricebook" ? activeClassName : ""} onClick={navToggleSm}>
										<Link to={"/pricebook"}>
											<div className="parent-icon icon-color-3">
												<FaRupeeSign />
											</div>
											<div className="menu-title">Price Book</div>
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
};
export default Sidebar;
