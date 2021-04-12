import {useState} from 'react';
import {handleSidebar} from '../../common/navbar';
import { motion } from "framer-motion";
// styles
import '../../assets/css/Sidebar.css';
// icons
import {RiAdminLine} from 'react-icons/ri';
import {IoMenuOutline} from 'react-icons/io5';
import { logOut } from '../../common/Auth';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const [isHidden,setIsHidden] = useState(false);
	const variants = {
        in : {
            opactiy : 1,
            y:0
        },
        out : {
            opactiy : 0,
            y : '-100%'
        }
    }
	return (
		<motion.header initial='out' animate='in' exit='out' variants={variants}  class="top-header">
			<nav class="navbar navbar-expand">
				<div class="left-topbar d-flex align-items-center">
					<button  id="navbarBtn" onClick={handleSidebar} class="btn toggle-btn d-flex align-items-center justify-content-center"><IoMenuOutline />
					</button>
					<div className='d-flex'>
						<h4 style={{marginBottom:0,fontWeight:300}} id="activePageHead"> </h4>
					</div>
				</div>
				<div class="right-topbar ml-auto">
					<ul class="navbar-nav">
						<li class="nav-item dropdown dropdown-user-profile ">
							<div class="nav-link dropdown-toggle dropdown-toggle-nocaret px-3" data-toggle="dropdown" aria-expanded="false">
								<div class="media user-box align-items-center">
									<div class="media-body user-info">
										<p class="user-name mb-0">Jessica Doe</p>
										<p class="designation mb-0">Available</p>
									</div>
									<div style={{position:'relative',cursor : 'pointer'}} className='userAvatar' >
										<RiAdminLine style={{zIndex : 3}}  />
										<div class="spinner-border" id="pageSpinner" style={{borderWidth:'1.5px'}}  role="status">	
											<span class="sr-only">Loading...</span>
										</div>
									</div>
								</div>
							</div>
							<div class={isHidden ? 'dropdown-menu dropdown-menu-right show' : 'dropdown-menu dropdown-menu-right'} onBlur={() => setIsHidden(false) } > 
								<Link class="dropdown-item" to='/profile' onClick={() => setIsHidden(!isHidden)}><i class="bx bx-user"></i><span>Profile</span></Link>
								<Link class="dropdown-item" to='/settings'  onClick={() => setIsHidden(!isHidden)} ><i class="bx bx-cog"></i><span>Settings</span></Link>
								<Link class="dropdown-item" to='/dashboard' onClick={() => setIsHidden(!isHidden)}><i class="bx bx-tachometer"></i><span>Dashboard</span></Link>
								<div class="dropdown-divider mb-0"></div> 
								<Link class="dropdown-item" onClick={logOut} to='/' ><i class="bx bx-power-off"></i><span>Logout</span></Link>
							</div>
						</li>
					</ul>
				</div>
			</nav>
		</motion.header>
	);
} 
export default Navbar;