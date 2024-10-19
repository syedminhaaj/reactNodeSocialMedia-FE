const BASE = {
  API_DEPLOYED_BASE_URL: "https://reactnodesocialmedia-be.onrender.com",
  API_LOCAL_URL: "http://localhost:3002",
  ACCESSTOKEN_HEADER: {
    headers: { accessToken: localStorage.getItem("accessToken") },
  },
};
//Revert url of API = https://reactnodesocialmedia-be.onrender.com

export default BASE;
