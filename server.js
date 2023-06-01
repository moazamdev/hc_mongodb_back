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

// INSERTING QUERIES

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

// INSERINTG IN NEW_USERS TABLE

// for inserting NEED HELP page form data
app.post("/insert-new-users", (req, res) => {
	const name = req.body.name;
	const phone = req.body.phone;
	const email = req.body.email;
	const date = req.body.date;
	const source = req.body.source;

	// console.log(name);

	db.query(
		"INSERT INTO new_users (name, email, phone, date, source) VALUES (?,?,?,?,?)",
		[name, email, phone, date, source],
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

// SELECTING QUERIES

// for getting NEW USERS table data
app.get("/api/dashboard", (req, res) => {
	db.query("SELECT * FROM new_users", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

// for getting DONATE BLOOD table data
app.get("/api/donate-blood", (req, res) => {
	db.query("SELECT * FROM donate_blood", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

// for getting NEED BLOOD table data
app.get("/api/need-blood", (req, res) => {
	db.query("SELECT * FROM need_blood", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

// for getting HOST BLOOD DRIVE table data
app.get("/api/host-blood-drive", (req, res) => {
	db.query("SELECT * FROM host_blood_drive", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

// for getting NEED HELP table data
app.get("/api/need-help", (req, res) => {
	db.query("SELECT * FROM need_help", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

// UPDATING QUERIES

// for updating DONATE BLOOD table `donated` value
app.put("/api/donate-blood/donated", (req, res) => {
	const id = parseInt(req.body.id);
	const donated = req.body.status;
	db.query(
		"UPDATE donate_blood SET donated = ? where id = ?",
		[donated, id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

// for updating NEED BLOOD table `given` value
app.put("/api/need-blood/given", (req, res) => {
	const id = parseInt(req.body.id);
	const given = req.body.status;
	db.query(
		"UPDATE need_blood SET given = ? where id = ?",
		[given, id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

// for updating HOST BLOOD DRIVE table `done` value
app.put("/api/host-blood-drive/done", (req, res) => {
	const id = parseInt(req.body.id);
	const done = req.body.status;
	db.query(
		"UPDATE host_blood_drive SET done = ? where id = ?",
		[done, id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

// for updating NEED HELP table `answered` value
app.put("/api/need-help/answered", (req, res) => {
	const id = parseInt(req.body.id);
	const answered = req.body.status;
	db.query(
		"UPDATE need_help SET answered = ? where id = ?",
		[answered, id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

// for updating NEW USERS table `checked` value
app.put("/api/new-users/checked", (req, res) => {
	const id = parseInt(req.body.id);
	const checked = req.body.status;
	db.query(
		"UPDATE new_users SET checked = ? where id = ?",
		[checked, id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

// UPDATING QUERIES FOR UPDATING RECORDS

// for updating DONATE BLOOD table data
app.put("/api/donate-blood/update/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const { name, phone, bloodType, message } = req.body.updatedData;
	db.query(
		"UPDATE donate_blood SET name = ?, phone = ?, bloodType = ?, message = ? WHERE id = ?",
		[name, phone, bloodType, message, id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

// for updating NEED BLOOD table data
app.put("/api/need-blood/update/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const { name, phone, bloodType, message } = req.body.updatedData;
	db.query(
		"UPDATE need_blood SET name = ?, phone = ?, bloodType = ?, message = ? WHERE id = ?",
		[name, phone, bloodType, message, id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

// for updating HOST BLOOD DRIVE table data
app.put("/api/host-blood-drive/update/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const { name, phone, institute, designation, city, message } =
		req.body.updatedData;
	db.query(
		"UPDATE host_blood_drive SET name = ?, phone = ?, institute = ?, designation = ?, city = ?, message = ? WHERE id = ?",
		[name, phone, institute, designation, city, message, id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

// for updating NEED HELP table data
app.put("/api/need-help/update/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const { name, phone, reason, message } = req.body.updatedData;
	db.query(
		"UPDATE need_help SET name = ?, phone = ?, reason = ?, message = ? WHERE id = ?",
		[name, phone, reason, message, id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
});

// DELETING QUERIES

// for deleting DONATE BLOOD table data
app.delete("/api/donate-blood/delete/:id", (req, res) => {
	const id = parseInt(req.params.id);
	db.query("DELETE FROM donate_blood WHERE id = ?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

// for deleting NEED BLOOD table data
app.delete("/api/need-blood/delete/:id", (req, res) => {
	const id = parseInt(req.params.id);
	db.query("DELETE FROM need_blood WHERE id = ?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

// for deleting HOST BLOOD DRIVE table data
app.delete("/api/host-blood-drive/delete/:id", (req, res) => {
	const id = parseInt(req.params.id);
	db.query("DELETE FROM host_blood_drive WHERE id = ?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

// for deleting NEED HELP table data
app.delete("/api/need-help/delete/:id", (req, res) => {
	const id = parseInt(req.params.id);
	db.query("DELETE FROM need_help WHERE id = ?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

// for deleting NEW USERS table data
app.delete("/api/dashboard/delete/:id", (req, res) => {
	const id = parseInt(req.params.id);
	db.query("DELETE FROM new_users WHERE id = ?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.get("/", (req, res) => res.send("Welocome to HemoCell!"));

app.listen(port, () => console.log(`Yee! app listening on port ${port}!`));
