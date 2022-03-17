import React, { createContext, useReducer } from "react";
import { INITIAL_STATE } from "./initialState";
import { reducer } from "./Reducer";

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
	const [contextState, contextDispatch] = useReducer(reducer, INITIAL_STATE);
	return <AppContext.Provider value={{ ...contextState, contextDispatch }}> {children} </AppContext.Provider>;
};

export default ContextProvider;
