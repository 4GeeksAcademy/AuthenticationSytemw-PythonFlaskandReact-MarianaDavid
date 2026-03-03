import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();
	const token = store.token;
	const logOut = () => {
		dispatch({ type: "set_token", payload: "" });
		localStorage.removeItem("token");
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Autentication test</span>
				</Link>
				{
					token
						? <div className="ml-auto">
							<Link to="/">
								<button className="btn btn-primary" onClick={logOut}>Log Out</button>
							</Link>
						</div>
						: ""
				}
			</div>
		</nav>
	);
};