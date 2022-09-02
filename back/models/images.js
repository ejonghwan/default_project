import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
    {
        key: { type: String, required:true },
        originalFileName: { type: String, required: true }
    },
    {
        timestamps: true
    }
)


export default mongoose.model("image", imageSchema)