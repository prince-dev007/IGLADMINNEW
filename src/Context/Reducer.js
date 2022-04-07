export const reducer = (state, action) => {
	switch (action.type) {
		case "REINIT_STATE": {
			const prevState = handleStorage("GET", null);
			return {
				...state,
				...prevState,
				isAdminLoggedIn: prevState.user?.profileType === "ADMIN",
			};
		}
		case "SET_PAGE_TITLE": {
			document.title = "IGL Admin | " + action.payload;
			return {
				...state,
				pageTitle: "IGL | " + action.payload,
			};
		}
		case "SET_ACTIVE_PAGE_HEAD": {
			return {
				...state,
				pageHead: action.payload,
			};
		}
		case "SET_ACTIVE_PAGE_SPINNER": {
			return {
				...state,
				isActivePageSpinner: action.payload,
			};
		}
		case "LOGIN": {
			const currentState = handleStorage("SAVE", action.payload);

			return {
				...state,
				...currentState,
				isAdminLoggedIn: currentState.user.profileType === "ADMIN",
			};
		}
		case "LOGOUT": {
			const currentState = handleStorage("REMOVE", null);
			return {
				...state,
				...currentState,
			};
		}
		default:
	}
};

const localStorageName = "IGL_APP_STATE";

function handleStorage(actionType, state) {
	const stateDB = localStorage.getItem(localStorageName);

	let currentState;
	if (!stateDB)
		currentState = {
			user: null,
			isLoggedIn: false,
		};
	else currentState = JSON.parse(stateDB);

	if (actionType === "SAVE") {
		currentState.user = state;
		currentState.isLoggedIn = true;
	} else if (actionType === "REMOVE") {
		currentState.user = null;
		currentState.isLoggedIn = false;
	}

	localStorage.setItem(localStorageName, JSON.stringify(currentState));
	return currentState;
}

export const getUser = () => {
	const stateDB = localStorage.getItem(localStorageName);

	let currentState;
	if (!stateDB)
		currentState = {
			user: {},
			isLoggedIn: false,
		};
	else currentState = JSON.parse(stateDB);
	return currentState.user;
};
