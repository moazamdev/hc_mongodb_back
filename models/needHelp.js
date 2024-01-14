import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Need Help schema and model
const NeedHelpSchema = new Schema({
	name: { type: String, required: true },
	phone: { type: String, required: true },
	email: { type: String, required: true },
	reason: { type: String, required: true },
	answered: { type: Boolean, default: false },
	message: { type: String },

});
const NeedHelp = model("NeedHelp", NeedHelpSchema);

export default NeedHelp;
