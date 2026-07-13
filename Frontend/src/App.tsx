import axios from "axios";
import Approutes from "./routes/routes";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
axios.defaults.baseURL = "https://erms-rjhx.onrender.com/";

const App = () => {
  return (
   
      <AuthProvider>
        
          <Approutes />
          <ToastContainer />
        
      </AuthProvider>
    
  );
};
export default App;
