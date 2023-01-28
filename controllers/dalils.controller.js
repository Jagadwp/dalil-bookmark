import Dalil from "../models/Dalil.js";

export const index = async (req, res) => {
    return res.status(200).json({
        data: "Hello World!"
    });
};

export const renderDalils = async (req, res) => {
    const { tag, keyword } = req.query;
    let dalils;

    if (tag && !keyword) {
        dalils = await Dalil.find({ tags: { $in: [tag.toLowerCase()] } });
    } else if (!tag && keyword) {
        dalils = await Dalil.find({ content: { "$regex": keyword, "$options": "i" } });
    } else if (tag && keyword) {
        dalils = await Dalil.find({
            tags: { $in: [tag.toLowerCase()] },
            content: { "$regex": keyword, "$options": "i" }
        });
    } else {
        dalils = await Dalil.find().lean();
    }

    return res.status(200).json({
        message: "Dalils rendered",
        data: dalils
    });
};

export const insertDalil = async (req, res) => {
    try {
        let dalil = new Dalil(req.body);

        dalil = await dalil.save();

        return res.status(201).json({
            message: "Dalil bookmarked",
            data: dalil
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message || "Bad request"
        });
    }
};

export const updateDalil = async (req, res) => {
    try {
        const dalil = await Dalil.findByIdAndUpdate(
            req?.params?.id,
            req?.body,
            { new: true }
        );

        if (!dalil) {
            return res.status(404).json({
                message: 'Dalil not found',
                data: [],
            });
        }

        return res.status(200).json({
            message: "Dalil updated",
            data: dalil
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message || "Bad request"
        });
    }
};

export const deleteDalil = async (req, res) => {
    try {
        const dalil = await Dalil.findByIdAndRemove(req?.params?.id);

        if (!dalil) {
            return res.status(404).json({
                message: 'Dalil not found',
                data: [],
            });
        }

        return res.status(200).json({
            message: "Dalil deleted",
            data: dalil
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Server error"
        });
    }
};

export const addTag = async (req, res) => {
    try {
        const dalil = await Dalil.findByIdAndUpdate(
            req?.params?.id,
            { $addToSet: { tags: req?.body?.tag } },
            { new: true }
        );

        if (!dalil) {
            return res.status(404).json({
                message: 'Dalil not found',
                data: [],
            });
        }

        return res.status(200).json({
            message: "Tag added",
            data: dalil
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message || "Bad request"
        });
    }
};

export const deleteTag = async (req, res) => {
    try {
        const dalil = await Dalil.findByIdAndUpdate(
            req?.params?.id,
            { $pull: { tags: { $in: req?.body?.tag } } },
            { new: true }
        );

        if (!dalil) {
            return res.status(404).json({
                message: 'Dalil not found',
                data: [],
            });
        }

        return res.status(200).json({
            message: "Tag deleted",
            data: dalil
        });
    } catch (err) {
        return res.status(400).json({
            message: err.message || "Bad request"
        });
    }
};