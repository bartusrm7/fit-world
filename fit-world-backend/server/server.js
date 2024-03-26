const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 7777;

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
	const { userName, password, email } = req.body;
	res.json({ success: true, message: `User ${userName} registered successfully!` });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
