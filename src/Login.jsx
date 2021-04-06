import {useHistory} from 'react-router-dom';
const Login = (e) => {
    console.log('login props',e);
    const history = useHistory();
    console.log('login props history',history)
    const handleLogin = () =>  {
        localStorage.setItem('isAuth',true);
        // history.push(history.location.state ? history.location.state.from.pathname : '/profile');
    }
    return (
        <>
        <h1>Login Page</h1>
        <button onClick={handleLogin}>Login</button>
        </>
    );
}
export default Login;