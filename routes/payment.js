const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Payment = mongoose.model("Payment");
const Participant = mongoose.model("Participant");

router.post("/makePayment", (req, res) => {
  const { name, age, batch_id, mobile_no } = req.body;

  Participant.findOne({ mobile_no: mobile_no }).then(
    async (savedparticipant) => {
      let flag = 1;

      if (savedparticipant) {
        const participant_id = savedparticipant._id.toString();
        await Payment.find({ participant_id: participant_id }).then(
          (participant) => {
            let participant1 = participant[0];
            console.log(participant1);

            const curr_time = new Date();
            var temp = participant1.created_at;
            console.log(participant1.created_at);
            const diff_in_milli = new Date(temp) - curr_time;
            const diff_in_days = diff_in_milli / (1000 * 60 * 60 * 24);
            console.log(diff_in_days);
            if (diff_in_days < 30) {
              flag = 0;
              return res
                .status(422)
                .json({ message: "Payment already completed for this month" });
            }
          }
        );
      }
      if (flag) {
        const participant = new Participant({
          name,
          age,
          batch_id,
          mobile_no,
        });
        participant
          .save()
          .then((user) => {
            const payment = new Payment({
              participant_id: user._id,
              batch_id,
            });
            payment
              .save()
              .then(() => {
                console.log("payment successful");
                res.status(201).json({ message: "Enrolled Successfully" });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).send({ message: "Enrollemnet failed" });
          });
      }
    }
  );
});

router.get("/allpayments", (req, res) => {
  Payment.find().then((payments) => {
    res.json({ payments: payments });
  });
});
module.exports = router;
