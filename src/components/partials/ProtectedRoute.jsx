import { Route, Redirect } from "react-router-dom";
import { getUser } from "../../Context/Reducer";

const ProtectedRoute = ({ component: Comp, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				return getUser() ? (
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
