import { Redirect, useHistory } from 'react-router-dom';
import {useEffect, useState} from 'react';
import { getIsLoggedIn, logIn } from '../../common/Auth';

// images
import loginFrontImg from '../../assets/images/login-front-img.jpg'
import img_brand from '../../assets/images/custom/brand.png'
const Login = () => {
    const history = useHistory();

	const [email,setEmail] = useState('');
	const [password,setPassword] = useState('');
	useEffect(() => {
        document.title = 'IGL ADMIN | Login';
    }, [])
    if(getIsLoggedIn()) 
       return <Redirect to={{pathname :'/dashboard'}} />;
    return (
        <div className="section-authentication-login">
			<div className="row">
				<div className="col-12 col-lg-10 mx-auto">
					<div className="card radius-15">
						<div className="row no-gutters">
							<div className="col-lg-6">
								<div className="card-body p-md-5">
									<div className="text-center">
										<img src={img_brand} className='img-fluid' alt=""/>
										<h3 className="mt-4 font-weight-bold">ADMIN</h3>
									</div>
									<div className="form-group mt-4">
										<label>Email Address</label>
										<input type="text" className="form-control" onChange={e => setEmail(e.target.value)} placeholder="Enter your email address"/>
									</div>
									<div className="form-group">
										<label>Password</label>
										<input type="password" className="form-control" onChange={e => setPassword(e.target.value)} placeholder="Enter your password"/>
									</div>
									<div className="btn-group mt-3 w-100">
										<button type="button" className="btn btn-block submitBtn" onClick={e => { logIn(); history.push('/dashboard') }}>Log In</button>
									</div>
								</div>
							</div>
							<div className="col-lg-6">
								<img src={loginFrontImg} className="card-img login-img h-100" alt="..."/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    );
}
export default Login;