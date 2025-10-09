import { createContext, useState, useContext, useEffect } from "react";
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:4000";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  console.log("Current user:", user);
  console.log("Auth checked:", authChecked);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/user/isauth');
      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log("Auth check failed:", error.message);
      setUser(null);
    } finally {
      setLoading(false);
      setAuthChecked(true);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    axios,
    loading,
    authChecked,
    fetchUser
    // ✅ useNavigate hata diya
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};