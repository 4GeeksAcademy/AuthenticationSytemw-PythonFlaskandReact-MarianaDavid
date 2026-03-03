import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state
import { useState, useEffect } from "react";

export const Private = props => {

  const { store, dispatch } = useGlobalReducer();
  const backEndUrl = import.meta.env.VITE_BACKEND_URL;
  const { theId } = useParams();
  const [loggedIn, setLoggedIn] = useState(false);

  const check_token = async () => {
    const options = {
      headers: {
        "Authorization": "Bearer " + store.token
      },
    }
    const response = await fetch(backEndUrl + "api/token", options);
    if (response.status == 200) {
      setLoggedIn(true);
    }
    else {
      setLoggedIn(false);
    }
  }

  useEffect(() => {
    check_token()
  }, [])


  return (
    <div className="container text-center">
      <h1 className="display-4">
        {
          loggedIn
            ? "Hello there " + theId
            : "You shouldn't be here"
        }
      </h1>
    </div>
  );
};

Private.propTypes = {
  match: PropTypes.object
};