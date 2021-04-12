import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import { getIsLoggedIn } from "./common/Auth";
import ProtectedRoute from "./components/partials/ProtectedRoute";
import {AnimatePresence} from 'framer-motion';

// styles
import "./App.css";
import "./assets/css/app.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/custom.css";

// components
import Navbar from "./components/partials/Navbar";
import Sidebar from "./components/partials/Sidebar";
import Dashboard from "./components/pages/Dashboard";
import { handleSidebar } from "./common/navbar";
import Sales from "./components/pages/Sales";
import Reports from "./components/pages/Reports";
import Login2 from "./components/pages/Login2";
import Stations from "./components/pages/Stations";

function App() {
  const location = useLocation();
  const isLoggedIn = getIsLoggedIn();
  return (
    <div className="wrapper" id="wrapperDiv" style={{overflowX:'hidden'}}>
      {isLoggedIn && (
        <>
          <Navbar />
          <Sidebar currentPath={location.pathname} />
        </>
      )}
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname} >
          <Route path="/" exact component={Login2} />
          <ProtectedRoute path="/dashboard" exact component={Dashboard} />
          <ProtectedRoute path="/sales" exact component={Sales} />
          <ProtectedRoute path="/reports" exact component={Reports} />
          <ProtectedRoute path="/stations" exact component={Stations} />
          <Redirect to={{ pathname: '/' }} />
        </Switch>
      </AnimatePresence>
      <div class="overlay toggle-btn-mobile" onClick={handleSidebar} ></div>
    </div>
  );
}

export default App;

