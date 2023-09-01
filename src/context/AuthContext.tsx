import { ReactNode, createContext, useReducer, Dispatch } from "react";
import { ActionType, StateType, authReducer } from "../utils/authReducer";

export type AuthContextValueType = {
	authState: StateType;
	authDispatch: Dispatch<ActionType>;
};
export const AuthContext = createContext<AuthContextValueType | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const INITIAL_STATE: StateType = {
		user: JSON.parse(localStorage.getItem("user") as string) || null,
	};
	const [authState, authDispatch] = useReducer(authReducer, INITIAL_STATE);

	const contextValue: AuthContextValueType = { authState, authDispatch };

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	);
};
