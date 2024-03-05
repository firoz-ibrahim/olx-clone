import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { firbaseContext } from "./context/AuthContext";
import firebaseApp from "./firebase/confiq";
import { AuthContext } from "./context/AuthContext";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Create from "./Pages/Create";
import { getAuth } from "firebase/auth";

function App() {
  const { user, setUser } = useContext(AuthContext);
  useEffect(() => {
    const auth = getAuth(firebaseApp);
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);
  return (
    <firbaseContext.Provider value={{ firebaseApp }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sell" element={<Create />} />
      </Routes>
    </firbaseContext.Provider>
  );
}

export default App;
