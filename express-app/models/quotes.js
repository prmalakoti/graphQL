import mongoose from "mongoose";
const quotesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    by: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
})
/* Registre model */
mongoose.model("Quote", quotesSchema)