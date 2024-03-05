import { createContext, useState } from "react";

export const firbaseContext = createContext();

export const AuthContext = createContext();

export default function Context({ children }) {
  const [user, setUser] = useState();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
