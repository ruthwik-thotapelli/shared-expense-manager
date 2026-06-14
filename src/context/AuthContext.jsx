/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { mockUsers } from "../data/mockUsers";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    // Default to Alice (u1) if none is saved
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing user from localStorage", e);
      }
    }
    const defaultUser = mockUsers[0]; // Alice Smith
    localStorage.setItem("currentUser", JSON.stringify(defaultUser));
    return defaultUser;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing users list", e);
      }
    }
    localStorage.setItem("users", JSON.stringify(mockUsers));
    return mockUsers;
  });

  const login = (email) => {
    // Simulating login - find user by email
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, error: "Invalid email or password" };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const register = (userData) => {
    const emailExists = users.some((u) => u.email.toLowerCase() === userData.email.toLowerCase());
    if (emailExists) {
      return { success: false, error: "Email already registered" };
    }

    const newUser = {
      id: `u${Date.now()}`,
      name: userData.name,
      email: userData.email,
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(userData.name)}`,
      currency: userData.currency || "USD",
      phone: userData.phone || "",
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    setCurrentUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    return { success: true, user: newUser };
  };

  const updateProfile = (profileData) => {
    if (!currentUser) return { success: false, error: "Not logged in" };

    const updatedUser = { ...currentUser, ...profileData };
    setCurrentUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const updatedUsers = users.map((u) => (u.id === currentUser.id ? updatedUser : u));
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    return { success: true, user: updatedUser };
  };

  return (
    <AuthContext.Provider value={{ currentUser, users, login, logout, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
