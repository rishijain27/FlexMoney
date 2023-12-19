const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const paymentSchema = new mongoose.Schema(
  {
    participant_id: {
      type: ObjectId,
      ref: "Participant",
    },
    batch_id: {
      type: Number,
      min: 1,
      max: 4,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

mongoose.model("Payment", paymentSchema);
