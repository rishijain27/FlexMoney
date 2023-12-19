const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 65,
  },
  batch_id: {
    type: Number,
    required: true,
    min: 1,
    max: 4,
  },
  mobile_no: {
    type: String,
    required: true,
  },
});

mongoose.model("Participant", participantSchema);
