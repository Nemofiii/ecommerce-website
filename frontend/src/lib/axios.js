import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.mode === "development" ? "http://localhost:5000/api" : "/api",  // connect to the backend
	withCredentials: true, // send cookies to the server automatically when making requests
});

export default axiosInstance;

//Easily send cookies (like JWT tokens) between frontend and backend using axios.
//This is useful when you want to make requests to the backend from the frontend
//Axios automatically parses JSON.
//Perfect for authentication-based systems.
