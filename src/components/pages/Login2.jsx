import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
// animation
import { motion } from "framer-motion";
// styles
import '../../assets/css/Login2.css';
// images
import img_brandLogo from '../../assets/images/custom/brandLogo.png';
// auth
import { logIn, getIsLoggedIn } from '../../common/Auth';
import { callAPI } from '../../common/common';

const Login2 = () => {
    const history = useHistory();
    const [email,setEmail] = useState('');
    const [pswd,setPswd] = useState('');
    const [loginBtnTxt,setloginBtnTxt]= useState('Log in');
    const [alertText,setAlertTxt] = useState('');
    
    const [spinnerClass, setSpinner] = useState('');
    useEffect(() => {
        if (getIsLoggedIn()) {
            history.push('/dashboard');
        }
        document.title = 'IGL ADMIN | Login';
    }, [history]);
    const handleLogin = async e => {
        setAlertTxt('');
        e.preventDefault();
        if(!email || !pswd)
            return setAlertTxt('Required Email and Password');
        setSpinner('loadingBtn');
        const response = await callAPI({
            URL : 'auth/login',
            method : 'POST',
            body : {
                email : email,
                password : pswd
            }
        });
        setSpinner('');
        if(response.status !== 200) {
           return setAlertTxt(response.message);
        }
        setAlertTxt('');
        setloginBtnTxt('Redirecting...');
        logIn(response.data);
        history.push('/dashboard');
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
                                <h6>Log in into your account</h6>
                            </div>
                            <div className="form-group">
                                <label htmlFor='inputEmail'>Email</label>
                                <input type="email" onChange={e => setEmail(e.target.value)} className='form-control' title='Enter email address' placeholder='Email Address' id="inputEmail" />
                            </div>
                            <div className="form-group" style={{marginBottom:'10px'}}>
                                <label htmlFor='inputPswd'>Password</label>
                                <input type="password" onChange={e => setPswd(e.target.value)} className='form-control' title='Enter password' placeholder='Password' id="inputPswd" />
                            </div>
                            <div style={{ opacity : alertText ? 1 : 0  ,backgroundColor: '#f44336',marginBottom:'10px',transition : 'all 0.2s',borderRadius:'3px',padding:'2px 10px',color:'#fff' }} >
                                <label style={{marginBottom:'0'}} >{alertText}</label>
                            </div>
                            <button className={'btn ' + (spinnerClass ? spinnerClass : '')} onClick={handleLogin} id="loginBtn">
                                <span className={spinnerClass ? 'btnText hideBtnText' : 'btnText'}>{loginBtnTxt}</span>
                            </button>
                        </div>
                    </motion.div>
                </form>
            </div>
        </motion.div>
    );
}
export default Login2;