const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Participant = mongoose.model("Participant");

router.get("/participants", (req, res) => {
  Participant.find().then((participants) => {
    res.json({ participants: participants });
  });
});

router.get("/batch/:batch_id", (req, res) => {
  Participant.find({ batch_id: req.params.batch_id }).then((participants) => {
    res.json({ participants: participants });
  });
});

module.exports = router;
