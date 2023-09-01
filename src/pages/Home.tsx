import { useNavigate } from "react-router-dom";
import Chat from "../components/Chat";
import Chats from "../components/Chats";
import { useAuthContext } from "../hooks/useAuthContext";
import { useUserGlobalStateContext } from "../hooks/useUserGlobalState";
import { useEffect } from "react";

const Home = () => {
	const { authState } = useAuthContext();
	const navigate = useNavigate();
	const { globalState } = useUserGlobalStateContext();
	useEffect(() => {
		if (!authState.user) {
			navigate("/login");
		}
	}, [authState.user, navigate]);

	return (
		<main className="flex">
			<Chats />
			<Chat user={globalState.selectedUser} />
		</main>
	);
};

export default Home;
