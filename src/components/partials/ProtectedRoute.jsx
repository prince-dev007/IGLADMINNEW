import { Route, Redirect } from "react-router-dom";
import { getIsLoggedIn } from "../../common/Auth";

const ProtectedRoute = ({ component: Comp, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				return getIsLoggedIn() ? (
					<Comp {...props} />
				) : (
					<Redirect
						to={{
							pathname: "/",
							state: {
								from: props.location,
							},
						}}
					/>
				);
			}}
		/>
	);
};

export default ProtectedRoute;
