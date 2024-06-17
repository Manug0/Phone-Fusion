const sales = [
	{
		saleId: 1,
		clientId: 1,
		phoneId: 45,
		review: "Buen móvil",
		rating: 4,
		saleDate: "01/01/2023",
	},
	{
		saleId: 2,
		clientId: 2,
		phoneId: 22,
		review: "Excelente",
		rating: 5,
		saleDate: "02/01/2023",
	},
	{
		saleId: 3,
		clientId: 3,
		phoneId: 67,
		review: "No me gustó",
		rating: 2,
		saleDate: "03/01/2023",
	},
	{
		saleId: 4,
		clientId: 4,
		phoneId: 89,
		review: "Muy bueno",
		rating: 4,
		saleDate: "04/01/2023",
	},
	{
		saleId: 5,
		clientId: 5,
		phoneId: 33,
		review: "Me encanta",
		rating: 5,
		saleDate: "05/01/2023",
	},
	{
		saleId: 6,
		clientId: 6,
		phoneId: 77,
		review: "Regular",
		rating: 3,
		saleDate: "06/01/2023",
	},
	{
		saleId: 7,
		clientId: 7,
		phoneId: 50,
		review: "No está mal",
		rating: 3,
		saleDate: "07/01/2023",
	},
	{
		saleId: 8,
		clientId: 8,
		phoneId: 12,
		review: "Fantástico",
		rating: 5,
		saleDate: "08/01/2023",
	},
	{
		saleId: 9,
		clientId: 9,
		phoneId: 98,
		review: "Podría mejorar",
		rating: 2,
		saleDate: "09/01/2023",
	},
	{
		saleId: 10,
		clientId: 10,
		phoneId: 71,
		review: "Muy útil",
		rating: 4,
		saleDate: "10/01/2023",
	},
	{
		saleId: 11,
		clientId: 11,
		phoneId: 56,
		review: "Bueno",
		rating: 4,
		saleDate: "11/01/2023",
	},
	{
		saleId: 12,
		clientId: 12,
		phoneId: 34,
		review: "Excelente",
		rating: 5,
		saleDate: "12/01/2023",
	},
	{
		saleId: 13,
		clientId: 13,
		phoneId: 78,
		review: "No me gustó",
		rating: 2,
		saleDate: "13/01/2023",
	},
	{
		saleId: 14,
		clientId: 14,
		phoneId: 91,
		review: "Muy bueno",
		rating: 4,
		saleDate: "14/01/2023",
	},
	{
		saleId: 15,
		clientId: 15,
		phoneId: 46,
		review: "Me encanta",
		rating: 5,
		saleDate: "15/01/2023",
	},
	{
		saleId: 16,
		clientId: 16,
		phoneId: 23,
		review: "Regular",
		rating: 3,
		saleDate: "16/01/2023",
	},
	{
		saleId: 17,
		clientId: 17,
		phoneId: 68,
		review: "No está mal",
		rating: 3,
		saleDate: "17/01/2023",
	},
	{
		saleId: 18,
		clientId: 18,
		phoneId: 90,
		review: "Fantástico",
		rating: 5,
		saleDate: "18/01/2023",
	},
	{
		saleId: 19,
		clientId: 19,
		phoneId: 32,
		review: "Podría mejorar",
		rating: 2,
		saleDate: "19/01/2023",
	},
	{
		saleId: 20,
		clientId: 20,
		phoneId: 76,
		review: "Muy útil",
		rating: 4,
		saleDate: "20/01/2023",
	},
	{
		saleId: 21,
		clientId: 21,
		phoneId: 49,
		review: "Bueno",
		rating: 4,
		saleDate: "21/01/2023",
	},
	{
		saleId: 22,
		clientId: 22,
		phoneId: 11,
		review: "Excelente",
		rating: 5,
		saleDate: "22/01/2023",
	},
	{
		saleId: 23,
		clientId: 23,
		phoneId: 97,
		review: "No me gustó",
		rating: 2,
		saleDate: "23/01/2023",
	},
	{
		saleId: 24,
		clientId: 24,
		phoneId: 70,
		review: "Muy bueno",
		rating: 4,
		saleDate: "24/01/2023",
	},
	{
		saleId: 25,
		clientId: 25,
		phoneId: 55,
		review: "Me encanta",
		rating: 5,
		saleDate: "25/01/2023",
	},
	{
		saleId: 26,
		clientId: 26,
		phoneId: 35,
		review: "Regular",
		rating: 3,
		saleDate: "26/01/2023",
	},
	{
		saleId: 27,
		clientId: 27,
		phoneId: 79,
		review: "No está mal",
		rating: 3,
		saleDate: "27/01/2023",
	},
	{
		saleId: 28,
		clientId: 28,
		phoneId: 92,
		review: "Fantástico",
		rating: 5,
		saleDate: "28/01/2023",
	},
	{
		saleId: 29,
		clientId: 29,
		phoneId: 47,
		review: "Podría mejorar",
		rating: 2,
		saleDate: "29/01/2023",
	},
	{
		saleId: 30,
		clientId: 30,
		phoneId: 24,
		review: "Muy útil",
		rating: 4,
		saleDate: "30/01/2023",
	},
	{
		saleId: 31,
		clientId: 31,
		phoneId: 69,
		review: "Bueno",
		rating: 4,
		saleDate: "31/01/2023",
	},
	{
		saleId: 32,
		clientId: 32,
		phoneId: 93,
		review: "Excelente",
		rating: 5,
		saleDate: "01/02/2023",
	},
	{
		saleId: 33,
		clientId: 33,
		phoneId: 48,
		review: "No me gustó",
		rating: 2,
		saleDate: "02/02/2023",
	},
	{
		saleId: 34,
		clientId: 34,
		phoneId: 13,
		review: "Muy bueno",
		rating: 4,
		saleDate: "03/02/2023",
	},
	{
		saleId: 35,
		clientId: 35,
		phoneId: 99,
		review: "Me encanta",
		rating: 5,
		saleDate: "04/02/2023",
	},
	{
		saleId: 36,
		clientId: 36,
		phoneId: 72,
		review: "Regular",
		rating: 3,
		saleDate: "05/02/2023",
	},
	{
		saleId: 37,
		clientId: 37,
		phoneId: 57,
		review: "No está mal",
		rating: 3,
		saleDate: "06/02/2023",
	},
	{
		saleId: 38,
		clientId: 38,
		phoneId: 36,
		review: "Fantástico",
		rating: 5,
		saleDate: "07/02/2023",
	},
	{
		saleId: 39,
		clientId: 39,
		phoneId: 80,
		review: "Podría mejorar",
		rating: 2,
		saleDate: "08/02/2023",
	},
	{
		saleId: 40,
		clientId: 40,
		phoneId: 94,
		review: "Muy útil",
		rating: 4,
		saleDate: "09/02/2023",
	},
	{
		saleId: 41,
		clientId: 41,
		phoneId: 51,
		review: "Bueno",
		rating: 4,
		saleDate: "10/02/2023",
	},
	{
		saleId: 42,
		clientId: 42,
		phoneId: 25,
		review: "Excelente",
		rating: 5,
		saleDate: "11/02/2023",
	},
	{
		saleId: 43,
		clientId: 43,
		phoneId: 70,
		review: "No me gustó",
		rating: 2,
		saleDate: "12/02/2023",
	},
	{
		saleId: 44,
		clientId: 44,
		phoneId: 14,
		review: "Muy bueno",
		rating: 4,
		saleDate: "13/02/2023",
	},
	{
		saleId: 45,
		clientId: 45,
		phoneId: 100,
		review: "Me encanta",
		rating: 5,
		saleDate: "14/02/2023",
	},
];

module.exports = sales;
