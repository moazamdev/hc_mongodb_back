import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Need Blood schema and model
const NeedBloodSchema = new Schema({
	name: { type: String, required: true },
	phone: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	bloodType: { type: String, required: true },
	given: { type: Boolean, default: false },
	message: { type: String },

});
const NeedBlood = model("NeedBlood", NeedBloodSchema);

export default NeedBlood;
