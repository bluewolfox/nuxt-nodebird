const express = require("express");

const db = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      include: [
        { model: db.User, attributes: ["id", "nickname"] },
        { model: db.Comment },
        { model: db.Image },
      ],
      order: [["createdAt", "DESC"]],
      offset: parseInt(req.query.offset) || 0,
      limit: parseInt(req.query.limit) || 0,
    });

    return res.json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
