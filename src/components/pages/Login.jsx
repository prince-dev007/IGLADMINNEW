import { Redirect, useHistory } from 'react-router-dom';
import {useEffect} from 'react';
import { getIsLoggedIn, logIn } from '../../common/Auth';

// images
import loginFrontImg from '../../assets/images/login-front-img.jpg'
import img_brand from '../../assets/images/custom/brand.png'
const Login = () => {
    const history = useHistory();
	useEffect(() => {
        document.title = 'IGL ADMIN | Login';
    }, [])
    if(getIsLoggedIn()) 
       return <Redirect to={{pathname :'/dashboard'}} />;
    return (
        <div class="section-authentication-login">
			<div class="row">
				<div class="col-12 col-lg-10 mx-auto">
					<div class="card radius-15">
						<div class="row no-gutters">
							<div class="col-lg-6">
								<div class="card-body p-md-5">
									<div class="text-center">
										<img src={img_brand} className='img-fluid' alt=""/>
										<h3 class="mt-4 font-weight-bold">ADMIN</h3>
									</div>
									<div class="form-group mt-4">
										<label>Email Address</label>
										<input type="text" class="form-control" placeholder="Enter your email address"/>
									</div>
									<div class="form-group">
										<label>Password</label>
										<input type="password" class="form-control" placeholder="Enter your password"/>
									</div>
									<div class="btn-group mt-3 w-100">
										<button type="button" class="btn btn-block submitBtn" onClick={e => { logIn(); history.push('/dashboard') }}>Log In</button>
									</div>
								</div>
							</div>
							<div class="col-lg-6">
								<img src={loginFrontImg} class="card-img login-img h-100" alt="..."/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    );
}
export default Login;