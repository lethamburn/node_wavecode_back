const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema (
    {
        comment: {type: String, required: true },
        idUser: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
    