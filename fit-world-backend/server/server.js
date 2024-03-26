const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

// Endpoint GET dla pobrania danych
app.get("/api/dane", (req, res) => {
	res.json({ message: "Pobrane dane z backendu" });
});

// Endpoint POST dla przesyłania danych
app.post("/api/dane", (req, res) => {
	console.log("Dane otrzymane:", req.body);
	res.json({ message: "Dane przesłane do backendu" });
});
