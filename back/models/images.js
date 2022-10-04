import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
    {
        user: {
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, index: true,},
            name: { type: String, required: true, }  
        },
        key: { type: String, required:true },
        originalFileName: { type: String, required: true },
        public: { type: Boolean, required: true,  }
    },
    { timestamps: true }
)


export default mongoose.model("image", imageSchema)