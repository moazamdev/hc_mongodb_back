require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
// 	res.setHeader("Access-Control-Allow-Origin", "*");
// 	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
// 	res.setHeader(
// 		"Access-Control-Allow-Headers",
// 		"Content-Type, Authorization"
// 	);
// 	next();
// });

const db = mysql.createConnection({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

// db.connect(function (err) {
// 	if (err) {
// 		console.error("Error connecting to the database:", err.code);
// 		console.error("Error details:", err);
// 	} else {
// 		console.log("Successfully connected to the database");
// 	}
// });

// for inserting DONATE BLOOD page form data
app.post("/create-donate-blood", (req, res) => {
	const name = req.body.name;
	const phone = req.body.phone;
	const email = req.body.email;
	const bloodType = req.body.bloodType;
	const message = req.body.message;

	// console.log(name);

	db.query(
		"INSERT INTO donate_blood (name, email, phone, bloodType, message) VALUES (?,?,?,?,?)",
		[name, email, phone, bloodType, message],
		(err, result) => {
			if (err) {
				console.log(err);
				// res.status(500).send("Error inserting data");
			} else {
				console.log(result);
				res.send("Values Inserted");
			}
		}
	);
});

// for inserting HOST BLOOD DRIVE page form data
app.post("/create-host-blood-drive", (req, res) => {
	const name = req.body.name;
	const phone = req.body.phone;
	const email = req.body.email;
	const institute = req.body.institute;
	const designation = req.body.designation;
	const city = req.body.city;
	const message = req.body.message;

	// console.log(name);

	db.query(
		"INSERT INTO host_blood_drive (name, phone, email, institute, designation, city, message) VALUES (?,?,?,?,?,?,?)",
		[name, phone, email, institute, designation, city, message],
		(err, result) => {
			if (err) {
				console.log(err);
				// res.status(500).send("Error inserting data");
			} else {
				console.log(result);
				res.send("Values Inserted");
			}
		}
	);
});

// for inserting NEED BLOOD page form data
app.post("/create-need-blood", (req, res) => {
	const name = req.body.name;
	const phone = req.body.phone;
	const email = req.body.email;
	const bloodType = req.body.bloodType;
	const message = req.body.message;

	// console.log(name);

	db.query(
		"INSERT INTO need_blood (name, email, phone, bloodType, message) VALUES (?,?,?,?,?)",
		[name, email, phone, bloodType, message],
		(err, result) => {
			if (err) {
				console.log(err);
				// res.status(500).send("Error inserting data");
			} else {
				console.log(result);
				res.send("Values Inserted");
			}
		}
	);
});

// for inserting NEED HELP page form data
app.post("/create-need-help", (req, res) => {
	const name = req.body.name;
	const phone = req.body.phone;
	const email = req.body.email;
	const reason = req.body.reason;
	const message = req.body.message;

	// console.log(name);

	db.query(
		"INSERT INTO need_help (name, email, phone, reason, message) VALUES (?,?,?,?,?)",
		[name, email, phone, reason, message],
		(err, result) => {
			if (err) {
				console.log(err);
				// res.status(500).send("Error inserting data");
			} else {
				console.log(result);
				res.send("Values Inserted");
			}
		}
	);
});

app.get("/api/donate-blood", (req, res) => {
	db.query("SELECT * FROM donate_blood", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.get("/", (req, res) => res.send("Welocome to HemoCell!"));

app.listen(port, () => console.log(`Yee! app listening on port ${port}!`));