const fs = require("fs");
const csv = require("csv-parser");

function convertCsvToArray(csvFilePath) {
	const results = [];
	return new Promise((resolve, reject) => {
		fs.createReadStream(csvFilePath)
			.pipe(csv({ separator: ";" }))
			.on("data", (row) => {
				const processedRow = {};

				for (let key in row) {
					const newKey = key.replace(/['"]+/g, "").trim();

					const value = isNaN(row[key]) ? row[key].replace(/\s+/g, " ").trim() : Number(row[key]);

					processedRow[newKey] = value;
				}

				results.push(processedRow);
			})
			.on("end", () => resolve(results))
			.on("error", (error) => reject(error));
	});
}

// convertCsvToArray("src/resources/Clients.csv")
// 	.then((data) => {
// 		const dataString = "const clients = " + JSON.stringify(data, null, 2);
// 		fs.writeFile("src/data/clients.js", dataString, (err) => {
// 			if (err) throw err;
// 			console.log("Los datos de Clients.csv se han escrito en el archivo con éxito.");
// 		});
// 	})
// 	.catch((error) => {
// 		console.error(error);
// 	});

convertCsvToArray("src/resources/Phones.csv")
	.then((data) => {
		const dataString = "const phones = " + JSON.stringify(data, null, 2);
		fs.writeFile("src/data/phones.js", dataString, (err) => {
			if (err) throw err;
			console.log("Los datos de Phones.csv se han escrito en el archivo con éxito.");
		});
	})
	.catch((error) => {
		console.error(error);
	});

convertCsvToArray("src/resources/Sales.csv")
	.then((data) => {
		const dataString = "const sales = " + JSON.stringify(data, null, 2);
		fs.writeFile("src/data/sales.js", dataString, (err) => {
			if (err) throw err;
			console.log("Los datos de Sales.csv se han escrito en el archivo con éxito.");
		});
	})
	.catch((error) => {
		console.error(error);
	});
