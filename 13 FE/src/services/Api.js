import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:3000/api/v1",
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

export default instance;
