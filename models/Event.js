import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    date: String,
    time: String,
    location: String,
    organizerName: String,
    eventBanner: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);
export default Event;
