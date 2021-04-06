import "./App.css";
import "./assets/css/app.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/custom.css";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import { getIsLoggedIn } from "./common/Auth";
import Login from "./components/pages/Login";
import ProtectedRoute from "./components/partials/ProtectedRoute";
import Navbar from "./components/partials/Navbar";
import Sidebar from "./components/partials/Sidebar";
import Dashboard from "./components/pages/Dashboard";
import { handleSidebar } from "./common/navbar";
import Sales from "./components/pages/Sales";
import Reports from "./components/pages/Reports";

function App() {
  const location = useLocation();
  const isLoggedIn = getIsLoggedIn();
  return (
    <div className="wrapper" id="wrapperDiv">
      {isLoggedIn && (
        <>
          <Navbar />
          <Sidebar currentPath={location.pathname} />
        </>
      )}
      <Switch>
        <Route path="/"  exact component={Login} />
        <ProtectedRoute path="/dashboard" exact  component={Dashboard} />
        <ProtectedRoute path="/sales" exact component={Sales} />
        <ProtectedRoute path="/reports" exact component={Reports} />
        <Redirect to={{pathname :'/'}} />
      </Switch>
      <div class="overlay toggle-btn-mobile" onClick={handleSidebar} ></div>
    </div>
  );
}

export default App;

