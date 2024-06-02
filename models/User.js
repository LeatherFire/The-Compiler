import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    profilePhoto: { type: String, default: "/uploads/default-profile.jpg" },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, required: true },
    phone: { type: String, default: "" },
    city: { type: String, default: "" },
    country: { type: String, default: "" },
    bio: { type: String, default: "" },
    job: { type: String, default: "" },
    hobbies: { type: String, default: "" },
    email: { type: String, required: true },
    password: { type: String, required: true },
    links: {
        github: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        twitter: { type: String, default: "" },
        facebook: { type: String, default: "" },
        instagram: { type: String, default: "" },
        website: { type: String, default: "" },
        youtube: { type: String, default: "" }
    },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
