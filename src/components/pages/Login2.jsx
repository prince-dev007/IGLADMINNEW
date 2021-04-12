import { useState, useEffect } from 'react';
import { useHistory,Redirect } from 'react-router';
// animation
import { motion } from "framer-motion";
// styles
import '../../assets/css/Login2.css';
// images
import img_brandLogo from '../../assets/images/custom/brandLogo.png';
// auth
import { logIn, getIsLoggedIn } from '../../common/Auth';

const Login2 = () => {
    const history = useHistory();
    const [spinnerClass, setSpinner] = useState('');
    useEffect(() => {
        if (getIsLoggedIn()) {
            history.push('/dashboard');
        }
        document.title = 'IGL ADMIN | Login';
    }, [history]);
    const handleLogin = e => {
        e.preventDefault();
        spinnerClass ? setSpinner('') : setSpinner('loadingBtn');
        logIn();
        setTimeout(() => {
            setSpinner('');
            history.push('/dashboard');
        }, 1000);
    }

    const variants = {
        in: {
            opacity: 1,
            y: 0
        },
        out: {
            opacity: 0,
            y: "-100%"
        }

    }
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="loginBox">
            <div className='backdrop'></div>
            <div className="login">
                <form onSubmit={handleLogin} >
                    <motion.div initial={variants.out} animate={variants.in} exit={variants.out} variants={variants} className="card cardLogin">
                        <div className="card-title text-center">
                            <div className="imgWrapper text-center">
                                <img src={img_brandLogo} className='img-fluid' alt="" />
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="head">
                                <h6 >Log in into your account</h6>
                            </div>
                            <div className="form-group">
                                <label htmlFor='inputEmail'>Email</label>
                                <input type="email" name="email" className='form-control' title='Enter email address' placeholder='Email Address' id="inputEmail" />
                            </div>
                            <div className="form-group">
                                <label htmlFor='inputPswd'>Password</label>
                                <input type="email" name="email" className='form-control' title='Enter password' placeholder='Password' id="inputPswd" />
                            </div>
                            <button className={'btn ' + (spinnerClass ? spinnerClass : '')} onClick={handleLogin} id="loginBtn">
                                <span className={spinnerClass ? 'btnText hideBtnText' : 'btnText'} >Log in</span>
                            </button>
                        </div>
                    </motion.div>
                </form>
            </div>
        </motion.div>
    );
}
export default Login2;