import { useContext } from "react";
import {
	GlobalStateContext,
	GlobalStateValueType,
} from "../context/GlobalUserContext";

export const useUserGlobalStateContext = () => {
	const context = useContext(GlobalStateContext);

	if (!context) {
		console.error(
			"cannot invoke useGlobalStateContext hook outside GlobalStateContextProvider"
		);
	}
	return context as GlobalStateValueType;
};
