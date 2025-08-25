import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
    const event = await Event.create({ ...req.body, user: req.user._id });
    res.status(201).json(event);
};

export const getAllEvents = async (req, res) => {
    const events = await Event.find();
    res.json(events);
};

export const getEventById = async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
};

export const updateEvent = async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized" });
    }
    Object.assign(event, req.body);
    await event.save();
    res.json(event);
};

export const deleteEvent = async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (event.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized" });
    }
    await event.deleteOne();
    res.json({ message: "Event removed" });
};
