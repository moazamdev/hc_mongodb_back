import mongoose from "mongoose";
const { Schema, model } = mongoose;

// New Users schema and model
const NewUsersSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	phone: { type: String, required: true },
	source: { type: String, required: true },
	checked: { type: Boolean, default: false },
	date: { type: Date, required: true },
});
const NewUsers = model("NewUsers", NewUsersSchema);

export default NewUsers;
