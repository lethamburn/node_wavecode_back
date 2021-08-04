const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tagSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    playlist: [{ type: mongoose.Types.ObjectId, ref: 'Playlist' }]
}, { timestamps: true });

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;