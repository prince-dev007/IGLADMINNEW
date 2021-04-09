import "../../assets/css/Login3.css";
import img_brandLogo from "../../assets/images/custom/brandLogo.png";
import img_brandTxt from '../../assets/images/custom/brandText.png';
import img_security from '../../assets/images/security.svg';
const Login3 = () => {
  return (
    <>
      <div className="container-fluid" id="login3Wrapper">
        <div className="row">
          <div className="login3Backdrop"></div>
          <div className="col-lg-4 col-md-6 col-sm-12  p-5 login3Box" >
            <div className="imgWrap">
              <img src={img_security} className="img-fluid" alt="" />
            </div>
            <div className="head">
              <h6>Login into your account</h6>
            </div>
            <form action="" id="login3Form">
              <div>
                <div className="form-group">
                  <label htmlFor="inputEmail">Email</label>
                  <input type="text" className="form-control" placeholder='Email Address' id="inputEmail" />
                </div>
                <div className="form-group">
                  <label htmlFor="inputPswd">Password</label>
                  <input type="text" className="form-control" placeholder='Password' id="inputPswd" />
                </div>
                <button className="btn btn-success" type="button">
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="col-lg-8 col-md-6 col-sm-0 login3Banner">
            <img src={img_brandLogo} className="img-fluid" alt="" />
            <img src={img_brandTxt} className="img-fluid" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Login3;
