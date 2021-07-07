import React, { useState } from "react";
import {Link} from 'react-router-dom';
import {handleSidebar} from '../../common/navbar';
import { motion } from "framer-motion";

// images
import img_brandLogo from '../../assets/images/custom/brandLogo.png';
// icons
import {IoMenuOutline} from 'react-icons/io5';
import {MdDashboard} from 'react-icons/md';
import {GoGraph} from 'react-icons/go';
import {FcStatistics} from 'react-icons/fc';
import {RiGasStationLine,RiQrCodeLine} from 'react-icons/ri';

const Sidebar = ({currentPath}) => {
    const activeClassName = 'mm-active';
    const [navToggled,setNavToggled] = useState(false);
    const navToggle = () => {
        handleSidebar();
        setNavToggled(window.$('#wrapperDiv').hasClass('toggled'));
    }
    const navToggleSm = () => {
        if(window.innerWidth <= 1024) 
            navToggle();
    }
    const variants = {
        in : {
            opactiy : 1,
            x:0
        },
        out : {
            opactiy : 0,
            x : '-100%'
        }
    }
    return (
        <motion.div initial='out' animate='in' exit='out' variants={variants} className="sidebar-wrapper" data-simplebar="init" style={{overflowY:'auto', overflowX:'hidden', top:0, height :'100%'}}>
            <div className="simplebar-wrapper" style={{margin : "0px"}} >
                <div className="simplebar-mask">
                    <div className="simplebar-offset" style={{right:0,bottom:0}}>
                        <div className="simplebar-content-wrapper" style={{height:"100%",overflow:"hidden"}}>
                            <div className="simplebar-content mm-active" style={{padding:"0"}}>
                                <div className="sidebar-header" style={{position:'relative'}} >
                                    <button onClick={navToggle} className=" toggle-btn d-flex align-items-center justify-content-center"> {navToggled ? <img src={img_brandLogo} className="logo-icon-2 img-fluid " style={{height:'45px',width:'45px'}} alt="" /> : <IoMenuOutline /> } 
                                    </button>
                                    <div className="imgBrand mr-2">
                                        <img src={img_brandLogo} className="logo-icon-2 img-fluid" alt="" />
                                    </div>
                                </div>
                                <ul className="metismenu mm-show" id="menu">
                                    <li className={currentPath === '/dashboard' ? activeClassName : ''} onClick={navToggleSm}>
                                        <Link to={'/dashboard'}  >
                                            <div className="parent-icon icon-color-2"><MdDashboard />
                                            </div>
                                            <div className="menu-title">Dashboard</div>
                                        </Link>
                                    </li>
                                    <li className={currentPath === '/sales' ? activeClassName : ''}  onClick={navToggleSm}>
                                        <Link to={'/sales'} >
                                            <div className="parent-icon icon-color-3"> <GoGraph />
                                            </div>
                                            <div className="menu-title">Sales</div>
                                        </Link>
                                    </li>
                                    <li className={currentPath === '/reports' ? activeClassName : ''}  onClick={navToggleSm}>
                                        <Link to={'/reports'} >
                                            <div className="parent-icon icon-color-3"> <FcStatistics />
                                            </div>
                                            <div className="menu-title">Reports</div>
                                        </Link>
                                    </li>
                                    <li className={currentPath === '/stations' ? activeClassName : ''}  onClick={navToggleSm}>
                                        <Link to={'/stations'} >
                                            <div className="parent-icon icon-color-3"> <RiGasStationLine />
                                            </div>
                                            <div className="menu-title">Stations</div>
                                        </Link>
                                    </li>
                                    <li className={currentPath === '/qr' ? activeClassName : ''}  onClick={navToggleSm}>
                                        <Link to={'/qr'} >
                                            <div className="parent-icon icon-color-3"> <RiQrCodeLine />
                                            </div>
                                            <div className="menu-title">QR Generate</div>
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
} 
export default Sidebar;