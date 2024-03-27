const express = require("express");
const cors = require("cors");
const app = express();
const userData = [];

app.use(express.json());
app.use(cors());

app.post("/login", (req, res) => {
	const { userName, password } = req.body;
});

app.get("/register", (req, res) => {
	res.json(userData);
});

app.post("/register", (req, res) => {
	const { userName, password, email } = req.body;
	const userExist = userData
		.map(user => user.name === userName || user.password === password || user.email === email)
		.includes(true);

	if (userExist) {
		res.status(400).json({ success: false, message: "The user is already existing!" });
		console.log("Wrong data, try again!");
	} else {
		userData.push(req.body);
		res.status(200).json({ success: true, message: "Registration succesfull!" });
	}
});

app.listen(7777, () => {
	console.log("Server is running on port 7777");
});
