import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Donate Blood schema and model
const DonateBloodSchema = new Schema({
	name: { type: String, required: true },
	phone: { type: String, required: true },
	email: { type: String, required: true },
	bloodType: { type: String, required: true },
	donated: { type: Boolean, default: false },
	message: { type: String },
});
const DonateBlood = model("DonateBlood", DonateBloodSchema);

export default DonateBlood;
