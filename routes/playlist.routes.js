const express = require("express");
const router = express.Router();
const Playlist = require("../models/Playlist.model");
const Tag = require("../models/Tag.model");

router.get("/", async (req, res) => {
  const playlists = await Playlist.find();
  return res.status(200).json(playlists);
});

router.post("/create", async (req, res, next) => {
  try {
    const { title, description, image, tags, playlistID } = req.body;
    const newPlaylist = new Playlist({
      title,
      description,
      image,
      tags,
      playlistID,
    });

    await newPlaylist.save();
    return res.redirect("/playlists");
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const playlist = await Playlist.findById(id);

    return res.status(200).json(playlist);
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, description, image, tags, playlistID } = req.body;
    const editPlaylist = { title, description, image, tags, playlistID };
    await Tag.findByIdAndUpdate(id, editPlaylist, { new: true });
    return res.redirect("/playlists");
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await Playlist.findByIdAndDelete(id);
    return res.redirect("/tags");
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
