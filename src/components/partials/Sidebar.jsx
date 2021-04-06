import React, { useState } from "react";
import {Link} from 'react-router-dom';
import {handleSidebar} from '../../common/navbar';
// import '../../assets/css/metisMenu.min.css';

// images
// import img_brand from '../../assets/images/custom/brand.png';
import img_brandLogo from '../../assets/images/custom/brandLogo.png';
// import img_brandText from '../../assets/images/custom/brandText.png';

// icons
import {IoMenuOutline} from 'react-icons/io5';
import {MdDashboard} from 'react-icons/md';
import {GoGraph} from 'react-icons/go';
import {FcStatistics} from 'react-icons/fc';

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
    return (
        <div class="sidebar-wrapper" data-simplebar="init" style={{overflowY:'auto'}}>
            <div class="simplebar-wrapper" style={{margin : "0px"}} >
                <div class="simplebar-mask">
                    <div class="simplebar-offset" style={{right:0,bottom:0}}>
                        <div class="simplebar-content-wrapper" style={{height:"100%",overflow:"hidden"}}>
                            <div class="simplebar-content mm-active" style={{padding:"0"}}>
                                <div class="sidebar-header">
                                    <button onClick={navToggle} class=" toggle-btn d-flex align-items-center justify-content-center"> {navToggled ? <img src={img_brandLogo} class="logo-icon-2 img-fluid " style={{height:'45px',width:'45px'}} alt="" /> : <IoMenuOutline /> } 
                                    </button>
                                    <div class="imgBrand mr-2">
                                        <img src={img_brandLogo} class="logo-icon-2 img-fluid" alt="" />
                                    </div>
                                    <div>
                                        {/* <h4 class="logo-text "></h4> */}
                                    </div>
                                </div>
                                <ul class="metismenu mm-show" id="menu">
                                    <li class={currentPath === '/dashboard' && activeClassName} onClick={navToggleSm}>
                                        <Link to={'/dashboard'}  >
                                            <div class="parent-icon icon-color-2"><MdDashboard />
                                            </div>
                                            <div class="menu-title">Dashboard</div>
                                        </Link>
                                    </li>
                                    <li class={currentPath === '/sales' && activeClassName}  onClick={navToggleSm}>
                                        <Link to={'/sales'} >
                                            <div class="parent-icon icon-color-3"> <GoGraph />
                                            </div>
                                            <div class="menu-title">Sales</div>
                                        </Link>
                                    </li>
                                    <li class={currentPath === '/reports' && activeClassName}  onClick={navToggleSm}>
                                        <Link to={'/reports'} >
                                            <div class="parent-icon icon-color-3"> <FcStatistics />
                                            </div>
                                            <div class="menu-title">Reports</div>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 
export default Sidebar;