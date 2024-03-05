import React, { useContext, useState } from "react";

import "./Login.css";
import { firbaseContext } from "../../context/AuthContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { firebaseApp } = useContext(firbaseContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const auth = getAuth(firebaseApp);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
      alert(error.message);
    }
  };
  return (
    <>
      <div className=" w-full h-screen">
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[600px] mx-auto text-black border-2 border-black">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Login</h1>
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col py-4"
              >
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                />

                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <button
                  className="bg-blue-600 py-3 my-6 font-bold rounded"
                  type="submit"
                >
                  Login
                </button>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <p>
                    <input className="mr-2" type="checkbox" />
                    Remember me
                  </p>
                </div>
                <p className="py-8">
                  <span className="text-gray-600 ">Not A user?</span>
                  <Link to="/signup" className="font-bold">
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
