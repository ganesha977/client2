import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  const AuthorizationToken = `Bearer ${token}`;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
    setUser(null); // Clear user data on logout
  };

  // Function to authenticate user
  const userAuthentication = async () => {
    if (!token) return;

    try {
      const response = await fetch("https://server-1-a1zo.onrender.com/api/v1/auth/user-info", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData); // Ensure user data is set correctly
      } else {
        console.error("Error fetching user data", await response.text());
        LogoutUser();
      }
    } catch (error) {
      console.error("Error during user authentication:", error);
      LogoutUser();
    }
  };

  // Function to fetch all users data
  const getAllUsersData = async () => {
    if (!token) return;

    try {
      const response = await fetch('https://server-1-a1zo.onrender.com/api/v1/admin/users', {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.warn('Unexpected data format:', data);
      }

    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      userAuthentication();
      getAllUsersData();
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, AuthorizationToken, users }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};