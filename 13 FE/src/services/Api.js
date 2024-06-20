import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:3000/api/v1",
	headers: {
		"Content-Type": "application/json",
	},
});

export const fetchPhones = (page = 1, limit = 10) => {
	return instance.get("/phones", {
		params: { page, limit },
	});
};

export const createClient = () => {
	return instance.post("/create-client");
};

export const createSale = (saleData) => {
	return instance.post("/create-sale", saleData);
};

export default instance;
