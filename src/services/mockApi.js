import axios from "axios";
import { mockUsers } from "../data/mockUsers";
import { mockGroups } from "../data/mockGroups";
import { mockExpenses } from "../data/mockExpenses";
import { mockSettlements } from "../data/mockSettlements";
import { mockBalances } from "../data/mockBalances";

const api = axios.create({ timeout: 2500 });

const routeMap = {
  "/api/users": mockUsers,
  "/api/groups": mockGroups,
  "/api/expenses": mockExpenses,
  "/api/settlements": mockSettlements,
  "/api/balances": mockBalances,
};

api.interceptors.request.use((config) => {
  if (config.url && routeMap[config.url]) {
    const data = routeMap[config.url];
    return {
      ...config,
      adapter: async () => ({
        data,
        status: 200,
        statusText: "OK",
        headers: {},
        config,
        request: {},
      }),
    };
  }
  return config;
});

export const fetchUsers = () => api.get("/api/users").then((res) => res.data);
export const fetchGroups = () => api.get("/api/groups").then((res) => res.data);
export const fetchExpenses = () => api.get("/api/expenses").then((res) => res.data);
export const fetchSettlements = () => api.get("/api/settlements").then((res) => res.data);
export const fetchBalances = () => api.get("/api/balances").then((res) => res.data);

export default api;
