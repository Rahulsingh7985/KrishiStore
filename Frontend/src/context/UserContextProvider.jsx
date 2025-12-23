// import { useState } from "react";
// import UserContext from "./UserContext";

// const UserContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserContextProvider;



import { useEffect, useState } from "react";
import axios from "axios";
import UserContext from "./UserContext";

axios.defaults.withCredentials = true;

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 restore user on page refresh
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v2/users/me`
        );
        setUser(res.data.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v2/users/logout`);
    } catch (error) {
      console.log("Logout error", error);
    } finally {
      setUser(null);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Checking login...
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
