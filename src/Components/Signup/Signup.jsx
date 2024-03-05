import React, { useContext, useState } from "react";
import "./Signup.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { firbaseContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { firebaseApp } = useContext(firbaseContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!username || !email || !phone || !password) {
      alert("Please fill in all fields");
      return;
    }

    // Get the auth instance from the firebaseApp
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // User created successfully
      const user = userCredential.user;

      // Store additional user information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        phone: phone,
      });

      console.log("User created successfully and ");
    } catch (error) {
      // Handle errors
      console.error("Error creating user:", error.message);
      alert("Error creating user. Please try again.");
    }
  };

  return (
    <>
      <div className=" w-full h-screen">
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[600px] mx-auto text-black border-2 border-black">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col py-4"
              >
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="text"
                  placeholder="Username"
                  autoComplete="username"
                />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                />
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="text"
                  placeholder="Phone"
                  autoComplete="Phone"
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
                  Sign Up
                </button>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <p>
                    <input className="mr-2" type="checkbox" />
                    Remember me
                  </p>
                </div>
                <p className="py-8">
                  <span className="text-gray-600">Already A user?</span>
                  <Link to="/login" className="font-bold">
                    Login
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
