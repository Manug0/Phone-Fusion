import axios from "axios";

const instance = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1",
	headers: {
		"Content-Type": "application/json",
	},
});

export const loginUser = (email, password) => {
	return instance.post("/users/login", { email, password });
};

export const registerUser = (name, email, password) => {
	return instance.post("/users/register", { name, email, password });
};

export const fetchPhones = (page = 1, limit = 10, query = "") => {
	return instance.get("/phones", {
		params: { page, limit, query },
	});
};

export const fetchAllPhones = () => {
	return instance.get("/phones/all");
};

export const getPhoneById = (id) => {
	return instance.get(`/phones/${id}`);
};

export const updatePhone = (id, updates) => {
	return instance.put(`/phones/${id}`, updates);
};

export const createSale = (newSale, token) => {
	return instance.post("/sales", newSale, {
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const getSaleById = (id) => {
	return instance.get(`/sales/${id}`);
};

export const getClientByUserId = (id) => {
	return instance.get(`/clients/${id}`);
};

export const createClient = (clientData, token) => {
	return instance.post("/clients", clientData, {
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const updateClient = (id, clientData, token) => {
	return instance.put(`/clients/${id}`, clientData, {
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const updateCart = (cart, token) => {
	return instance.post(
		"/users/update-cart",
		{ cart },
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
};

export const updateFavorites = (favorites, token) => {
	return instance.post(
		"/users/update-favorites",
		{ favorites },
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
};

export const getUserData = (token) => {
	return instance.get("/users/user-data", {
		headers: { Authorization: `Bearer ${token}` },
	});
};

export default instance;
