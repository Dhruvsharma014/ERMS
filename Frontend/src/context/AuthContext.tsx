import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";


interface AuthContextType {
    auth: any;
    setAuth: React.Dispatch<React.SetStateAction<any>>;
}
const AuthContext = createContext<AuthContextType | null>(null);

const getCookie =  () => {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`data=`));

  if (!cookie) return null;
  const data = JSON.parse(decodeURIComponent(cookie.split("=")[1]));
  return data;
  
};

export const AuthProvider = ({ children }) => {
  const location = useLocation()
  const [auth, setAuth] = useState<any>(null);

  useLayoutEffect(() => {
  
    const value = getCookie();
  
    setAuth(value);
    console.log("authcontext render ", value);
  }, [location.pathname]);
  
  return <AuthContext.Provider value={{auth,setAuth}}>{children}</AuthContext.Provider>;

};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if(!context){
    throw new Error("useAuth must be used inside AuthProvider")
  }

  return context;
};
