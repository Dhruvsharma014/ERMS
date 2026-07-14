import axios from "axios";
import Approutes from "./routes/routes";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import { BACKEND_URL } from "./assets/config";
axios.defaults.baseURL = BACKEND_URL;
axios.defaults.withCredentials = true;

const App = () => {
  return (
   
      <AuthProvider>
        
          <Approutes />
          <ToastContainer />
        
      </AuthProvider>
    
  );
};
export default App;
