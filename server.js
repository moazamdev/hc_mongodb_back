import dotenv from "dotenv";
import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import DonateBlood from "./models/donateBlood.js";
import NewUsers from "./models/newUsers.js";
import NeedBlood from "./models/needBlood.js";
import NeedHelp from "./models/needHelp.js";
import HostBloodDrive from "./models/hostBloodDrive.js";
import { ObjectId } from "mongodb";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(json());

const connectionString = `${process.env.CONNECTION_STRING}`;

mongoose
	.connect(connectionString, { dbName: "hemocelldb" })
	.then(() => console.log("MongoDB Connected..."));

// ========================================

// // INSERTING QUERIES

// for inserting DONATE BLOOD page form data
app.post("/create-donate-blood", (req, res) => {
	const name = req.body.name;
	const phone = req.body.phone;
	const email = req.body.email;
	const bloodType = req.body.bloodType;
	const message = req.body.message;

	const newDonateBlood = new DonateBlood({
		name,
		phone,
		email,
		bloodType,
		message,
	});

	newDonateBlood.save().then(() => res.json("Donate Blood Added!"));
});

// INSERINTG IN NEW_USERS TABLE
app.post("/insert-new-users", (req, res) => {
	const name = req.body.name;
	const phone = req.body.phone;
	const email = req.body.email;
	const date = req.body.date;
	const source = req.body.source;

	const newUsers = new NewUsers({
		name,
		phone,
		email,
		date,
		source,
	});

	newUsers.save().then(() => res.json("New Users Added!"));
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

	const hostBloodDrive = new HostBloodDrive({
		name,
		phone,
		email,
		institute,
		designation,
		city,
		message,
	});

	hostBloodDrive.save().then(() => res.json("Host Blood Drive Added!"));
});

// for inserting NEED BLOOD page form data
app.post("/create-need-blood", (req, res) => {
	const name = req.body.name;
	const phone = req.body.phone;
	const email = req.body.email;
	const bloodType = req.body.bloodType;
	const message = req.body.message;

	const needBlood = new NeedBlood({
		name,
		phone,
		email,
		bloodType,
		message,
	});

	needBlood.save().then(() => res.json("Need Blood Added!"));
});

// for inserting NEED HELP page form data
app.post("/create-need-help", (req, res) => {
	const name = req.body.name;
	const phone = req.body.phone;
	const email = req.body.email;
	const reason = req.body.reason;
	const message = req.body.message;

	const needHelp = new NeedHelp({
		name,
		phone,
		email,
		reason,
		message,
	});

	needHelp.save().then(() => res.json("Need Help Added!"));
});

// ========================================

// SELECTING QUERIES
// for getting NEW USERS table data
app.get("/api/dashboard", async (req, res) => {
	try {
		const users = await NewUsers.find();
		const newUsers = users.map((user) => {
			return {
				id: user._id.toString(),
				name: user.name,
				phone: user.phone,
				email: user.email,
				date: user.date,
				source: user.source,
				checked: user.checked,
			};
		});
		res.send(newUsers);
	} catch (err) {
		console.log(err);
	}
});

// for getting DONATE BLOOD table data
app.get("/api/donate-blood", async (req, res) => {
	try {
		const donations = await DonateBlood.find();

		const donationsData = donations.map((user) => {
			return {
				id: user._id.toString(),
				name: user.name,
				phone: user.phone,
				email: user.email,
				bloodType: user.bloodType,
				donated: user.donated,
				message: user.message,
			};
		});
		res.send(donationsData);
	} catch (err) {
		console.log(err);
	}
});

// for getting NEED BLOOD table data
app.get("/api/need-blood", async (req, res) => {
	try {
		const needs = await NeedBlood.find();
		const needsData = needs.map((user) => {
			return {
				id: user._id.toString(),
				name: user.name,
				phone: user.phone,
				email: user.email,
				bloodType: user.bloodType,
				given: user.given,
				message: user.message,
			};
		});

		res.send(needsData);
	} catch (err) {
		console.log(err);
	}
});

// for getting HOST BLOOD DRIVE table data
app.get("/api/host-blood-drive", async (req, res) => {
	try {
		const drives = await HostBloodDrive.find();

		const drivesData = drives.map((user) => {
			return {
				id: user._id.toString(),
				name: user.name,
				phone: user.phone,
				email: user.email,
				institute: user.institute,
				designation: user.designation,
				city: user.city,
				done: user.done,
				message: user.message,
			};
		});
		res.send(drivesData);
	} catch (err) {
		console.log(err);
	}
});

// for getting NEED HELP table data
app.get("/api/need-help", async (req, res) => {
	try {
		const helps = await NeedHelp.find();

		const helpsData = helps.map((user) => {
			return {
				id: user._id.toString(),
				name: user.name,
				phone: user.phone,
				email: user.email,
				reason: user.reason,
				answered: user.answered,
				message: user.message,
			};
		});

		res.send(helpsData);
	} catch (err) {
		console.log(err);
	}
});

// ========================================

// UPDATING QUERIES
// for updating DONATE BLOOD table `donated` value
app.put("/api/donate-blood/donated", async (req, res) => {
	let id = req.body.id;
	if (typeof id === "number") {
		id = id.toString(); // Convert id to string if it's a number
	}
	const donated = req.body.status;
	try {
		const updatedDonation = await DonateBlood.findOneAndUpdate(
			{
				_id: new ObjectId(id),
			},
			{ donated },
			{ new: true }
		);
		res.send(updatedDonation);
	} catch (err) {
		console.log(err);
	}
});

// for updating NEED BLOOD table `given` value
app.put("/api/need-blood/given", async (req, res) => {
	let id = req.body.id;
	if (typeof id === "number") {
		id = id.toString(); // Convert id to string if it's a number
	}
	const given = req.body.status;
	try {
		const updatedNeed = await NeedBlood.findOneAndUpdate(
			{
				_id: new ObjectId(id),
			},
			{ given },
			{ new: true }
		);
		res.send(updatedNeed);
	} catch (err) {
		console.log(err);
	}
});

// for updating HOST BLOOD DRIVE table `done` value
app.put("/api/host-blood-drive/done", async (req, res) => {
	let id = req.body.id;
	if (typeof id === "number") {
		id = id.toString(); // Convert id to string if it's a number
	}
	const done = req.body.status;
	try {
		const updatedDrive = await HostBloodDrive.findOneAndUpdate(
			{
				_id: new ObjectId(id),
			},
			{ done },
			{ new: true }
		);
		res.send(updatedDrive);
	} catch (err) {
		console.log(err);
	}
});

// for updating NEED HELP table `answered` value
app.put("/api/need-help/answered", async (req, res) => {
	let id = req.body.id;
	if (typeof id === "number") {
		id = id.toString(); // Convert id to string if it's a number
	}
	const answered = req.body.status;
	try {
		const updatedHelp = await NeedHelp.findOneAndUpdate(
			{
				_id: new ObjectId(id),
			},
			{ answered },
			{ new: true }
		);
		res.send(updatedHelp);
	} catch (err) {
		console.log(err);
	}
});

// for updating NEW USERS table `checked` value
app.put("/api/new-users/checked", async (req, res) => {
	const id = req.body.id;
	if (typeof id === "number") {
		id = id.toString(); // Convert id to string if it's a number
	}

	const checked = req.body.status;

	try {
		// Fetch the document with the matching _id
		const updatedUser = await NewUsers.findOneAndUpdate(
			{
				_id: new ObjectId(id),
			},
			{ checked },
			{ new: true }
		);
		res.send(updatedUser);
	} catch (err) {
		console.log(err);
	}
});
// // for updating NEW USERS table `checked` value
// app.put("/api/new-users/checked", async (req, res) => {
// 	const id = req.body.id;
// 	const checked = req.body.status;
// 	try {
// 		// Fetch the document with the matching _id
// 		const user = await NewUsers.findById(id);

// 		// Check if the document exists
// 		if (!user) {
// 			return res.status(404).send({ message: "User not found" });
// 		}

// 		// Update the document
// 		const updatedUser = await NewUsers.findOneAndUpdate(
// 			id,
// 			{ checked },
// 			{ new: true }
// 		);

// 		res.send(updatedUser);
// 	} catch (err) {
// 		console.log(err);
// 	}
// });

// // UPDATING QUERIES FOR UPDATING RECORDS

// // for updating DONATE BLOOD table data
// app.put("/api/donate-blood/update/:id", (req, res) => {
// 	const id = parseInt(req.params.id);
// 	const { name, phone, bloodType, message } = req.body.updatedData;
// 	db.query(
// 		"UPDATE donate_blood SET name = ?, phone = ?, bloodType = ?, message = ? WHERE id = ?",
// 		[name, phone, bloodType, message, id],
// 		(err, result) => {
// 			if (err) {
// 				console.log(err);
// 			} else {
// 				res.send(result);
// 			}
// 		}
// 	);
// });

// // for updating NEED BLOOD table data
// app.put("/api/need-blood/update/:id", (req, res) => {
// 	const id = parseInt(req.params.id);
// 	const { name, phone, bloodType, message } = req.body.updatedData;
// 	db.query(
// 		"UPDATE need_blood SET name = ?, phone = ?, bloodType = ?, message = ? WHERE id = ?",
// 		[name, phone, bloodType, message, id],
// 		(err, result) => {
// 			if (err) {
// 				console.log(err);
// 			} else {
// 				res.send(result);
// 			}
// 		}
// 	);
// });

// // for updating HOST BLOOD DRIVE table data
// app.put("/api/host-blood-drive/update/:id", (req, res) => {
// 	const id = parseInt(req.params.id);
// 	const { name, phone, institute, designation, city, message } =
// 		req.body.updatedData;
// 	db.query(
// 		"UPDATE host_blood_drive SET name = ?, phone = ?, institute = ?, designation = ?, city = ?, message = ? WHERE id = ?",
// 		[name, phone, institute, designation, city, message, id],
// 		(err, result) => {
// 			if (err) {
// 				console.log(err);
// 			} else {
// 				res.send(result);
// 			}
// 		}
// 	);
// });

// // for updating NEED HELP table data
// app.put("/api/need-help/update/:id", (req, res) => {
// 	const id = parseInt(req.params.id);
// 	const { name, phone, reason, message } = req.body.updatedData;
// 	db.query(
// 		"UPDATE need_help SET name = ?, phone = ?, reason = ?, message = ? WHERE id = ?",
// 		[name, phone, reason, message, id],
// 		(err, result) => {
// 			if (err) {
// 				console.log(err);
// 			} else {
// 				res.send(result);
// 			}
// 		}
// 	);
// });

// // DELETING QUERIES

// // for deleting DONATE BLOOD table data
// app.delete("/api/donate-blood/delete/:id", (req, res) => {
// 	const id = parseInt(req.params.id);
// 	db.query("DELETE FROM donate_blood WHERE id = ?", id, (err, result) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			res.send(result);
// 		}
// 	});
// });

// // for deleting NEED BLOOD table data
// app.delete("/api/need-blood/delete/:id", (req, res) => {
// 	const id = parseInt(req.params.id);
// 	db.query("DELETE FROM need_blood WHERE id = ?", id, (err, result) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			res.send(result);
// 		}
// 	});
// });

// // for deleting HOST BLOOD DRIVE table data
// app.delete("/api/host-blood-drive/delete/:id", (req, res) => {
// 	const id = parseInt(req.params.id);
// 	db.query("DELETE FROM host_blood_drive WHERE id = ?", id, (err, result) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			res.send(result);
// 		}
// 	});
// });

// // for deleting NEED HELP table data
// app.delete("/api/need-help/delete/:id", (req, res) => {
// 	const id = parseInt(req.params.id);
// 	db.query("DELETE FROM need_help WHERE id = ?", id, (err, result) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			res.send(result);
// 		}
// 	});
// });

// // for deleting NEW USERS table data
// app.delete("/api/dashboard/delete/:id", (req, res) => {
// 	const id = parseInt(req.params.id);
// 	db.query("DELETE FROM new_users WHERE id = ?", id, (err, result) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			res.send(result);
// 		}
// 	});
// });

app.get("/", (req, res) => res.send("Welocome to HemoCell!"));

app.listen(port, () => console.log(`Yee! app listening on port ${port}!`));
