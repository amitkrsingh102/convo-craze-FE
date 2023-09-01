import { useContext } from "react";
import { AuthContext, AuthContextValueType } from "../context/AuthContext";

export const useAuthContext = () => {
	const context = useContext(AuthContext);

	if (!context) {
		console.error(
			"cannot invoke useAuthContext hook outside AuthContextProvider"
		);
	}
	return context as AuthContextValueType;
};
