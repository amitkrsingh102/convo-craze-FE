import { createContext, useReducer } from "react";
import {
	ActionTypes,
	StateType,
	globalUserContextReducer,
} from "../utils/globalUserContextReducer";

export type GlobalStateValueType = {
	globalState: StateType;
	globalDispatch: React.Dispatch<ActionTypes>;
};

export const GlobalStateContext = createContext<GlobalStateValueType | null>(
	null
);

export const GlobalStateContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const INITIAL_STATE: StateType = {
		selectedUser: null,
		// JSON.parse(localStorage.getItem("user") as string) || null,
	};
	const [globalState, globalDispatch] = useReducer(
		globalUserContextReducer,
		INITIAL_STATE
	);
	const globalContextValue: GlobalStateValueType = {
		globalState,
		globalDispatch,
	};

	return (
		<GlobalStateContext.Provider value={globalContextValue}>
			{children}
		</GlobalStateContext.Provider>
	);
};
