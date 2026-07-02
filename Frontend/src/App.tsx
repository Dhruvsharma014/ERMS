import axios from "axios";
import Approutes from "./routes/routes";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
axios.defaults.baseURL = "http://localhost:5000/";

const App = () => {
  return (
    <AuthProvider>
      <>
      <Approutes />
      <ToastContainer />
      
      </>
   
    </AuthProvider>
  );
};
export default App;
