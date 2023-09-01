import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { GlobalStateContextProvider } from "./context/GlobalUserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	// <React.StrictMode>
	<AuthContextProvider>
		<GlobalStateContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</GlobalStateContextProvider>
	</AuthContextProvider>
	// </React.StrictMode>
);
