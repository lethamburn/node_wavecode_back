const express = require("express");
const router = express.Router();
const Tag = require("./../models/Tag.model");

router.get("/", async(req, res) => {
    const tags = await Tag.find();
    return res.status(200).json(tags);
});

router.post("/create", async(req, res, next) => {
    try {
        const { title, description, image, playlist } = req.body;

        const newTag = new Tag({ title, description, image, playlist });

        await newTag.save();
        return res.redirect("/tags");
    } catch (error) {
        return next(error);
    }
});

router.get("/:id", async(req, res, next) => {
    try {
        const id = req.params.id;
        const tag = await Tag.findById(id).populate('playlist');

        return res.status(200).json(tag);
    } catch (error) {
        return next(error);
    }
});

router.put("/:id", async(req, res, next) => {
    try {
        const id = req.params.id;
        const { title, description, image, playlist } = req.body;
        const editTag = { title, description, image, playlist };
        await Tag.findByIdAndUpdate(id, editTag, { new: true });
        return res.redirect("/tags");
    } catch (error) {
        return next(error);
    }
});

router.delete("/:id", async(req, res, next) => {
    try {
        const id = req.params.id;
        await Tag.findByIdAndDelete(id);
        return res.redirect("/tags");
    } catch (error) {
        return next(error);
    }
});


module.exports = router;