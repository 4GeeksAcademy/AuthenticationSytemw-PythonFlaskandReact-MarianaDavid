import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUpLogIn = () => {
    const { store, dispatch } = useGlobalReducer();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logIn, setLogIn] = useState(true);
    const backEndUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }
        const endpoint = logIn ? 'api/login' : 'api/signup'
        const response = await fetch(backEndUrl + endpoint, options);
        const data = await response.json();

        if (response.status != 200) {
            alert(data.message);
            return false;
        }

        if (logIn) {
            dispatch({ type: "set_token", payload: data.token });
            localStorage.setItem("token", data.token);
            navigate("/private/" + email);
        }
        else {
            alert(data.message);
            setLogIn(true);
        }
    }

    return (
        <div>
            <h1>
                {
                    logIn
                        ? "Log In"
                        : "Sign Up"
                }
            </h1>
            <div className="mt-3">
                <label htmlFor="email_input">Enter Email</label><br />
                <input id="email_input" className="input" type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mt-3">
                <label htmlFor="password_input">Enter Password</label><br />
                <input id="password_input" className="input" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mt-3">
                <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
            </div>
            <div className="mt-3">
                <h5>Go to</h5>
                <button
                    className={
                        logIn
                            ? "btn btn-outline-primary"
                            : "btn btn-outline-success"
                    }
                    onClick={() => setLogIn(!logIn)}
                >
                    {
                        logIn
                            ? "Sign Up"
                            : "Log In"
                    }
                </button>
            </div>
        </div>
    );
};