import {useState} from 'react';
import {handleSidebar} from '../../common/navbar';
// icons
import {RiAdminLine} from 'react-icons/ri';
import {IoMenuOutline} from 'react-icons/io5';
import { logOut } from '../../common/Auth';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const [isHidden,setIsHidden] = useState(false);

	return (
		<header class="top-header">
			<nav class="navbar navbar-expand">
				<div class="left-topbar d-flex align-items-center">
					<button  id="navbarBtn" onClick={handleSidebar} class="btn toggle-btn d-flex align-items-center justify-content-center"><IoMenuOutline />
					</button>
					<div className='d-flex'>
						<h4 style={{marginBottom:0,fontWeight:300, fontSize:'30px'}} id="activePageHead"> </h4>
						<div className="spinnerC">
						</div>
					</div>
				</div>
				<div class="right-topbar ml-auto">
					<ul class="navbar-nav">
						<li class="nav-item dropdown dropdown-user-profile ">
							<div class="nav-link dropdown-toggle dropdown-toggle-nocaret px-3" data-toggle="dropdown" aria-expanded="false">
								<div class="media user-box align-items-center">
									<div class="media-body user-info">
										<p class="user-name mb-0">Jessica Doe</p>
										<p class="designattion mb-0">Available</p>
									</div>
									<div style={{position:'relative',cursor : 'pointer'}} >
										<RiAdminLine style={{zIndex : 3}}  />
										<div class="spinner-border" id="pageSpinner"  style={{zIndex :2, width:'3rem',height:'3rem',borderWidth:'2px',position:'absolute',top:'-6px',left:'-8px' }} role="status">	
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
		</header>
	);
} 
export default Navbar;