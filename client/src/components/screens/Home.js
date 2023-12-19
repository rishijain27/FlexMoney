import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import M from "materialize-css";

const batches = [
  {
    value: 1,
    label: "6-7AM",
  },
  {
    value: 2,
    label: "7-8AM",
  },
  {
    value: 3,
    label: "8-9AM",
  },
  {
    value: 4,
    label: "5-6PM",
  },
];

const URL = "http://localhost:5000/makePayment";

const Home = () => {
  const navigate = useNavigate();
  const [batch, setBatch] = React.useState();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [validAge, setValidAge] = useState();
  const [mobile_no, setmobile_no] = useState();
  const [helperText, setHelperText] = useState("");
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleBatchChange = (event) => {
    setBatch(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleMobileNoChange = (event) => {
    setmobile_no(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name, age, batch);
    if (age < 18) {
      setFormErrorMessage(
        "You should be atleast 18 years old to join yoga class"
      );
    } else if (age > 65) {
      setFormErrorMessage(
        "You should be less than 65 years old to join yoga class"
      );
    } else {
      fetch("/makePayment", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          age,
          batch_id: batch,
          mobile_no,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          M.toast({ html: response.message });
          navigate("/participants");
        });
    }
  };

  useEffect(() => {
    if (age < 18 || age > 65) {
      setValidAge(false);
      setHelperText(
        "Sorry, You should be atleast 18 and atmost 65 to join the Yoga Class"
      );
    } else {
      setValidAge(true);
      setHelperText("");
    }
    console.log(validAge, helperText);
  }, [age, validAge, helperText]);

  return (
    <div className="Form">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 0.5, width: "25ch" },
        }}
        autoComplete="off"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="heading">Yoga Class Admission Form</h1>
        <hr className="hline" />

        <TextField
          id="name"
          label="Name"
          variant="outlined"
          className="element"
          onChange={handleNameChange}
          required
        />
        <br />
        <TextField
          id="age"
          label="Age"
          type="number"
          className="element"
          onChange={handleAgeChange}
          error={!validAge}
          helperText={helperText}
          required
        />
        <br />
        <TextField
          id="batch"
          select
          label="Batch"
          className="element"
          value={batch}
          onChange={handleBatchChange}
          helperText="Please select a batch"
        >
          {batches.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br />
        <br />
        <TextField
          id="mobile_no"
          label="Mobile No."
          type="text"
          className="element"
          onChange={handleMobileNoChange}
          required
        />
        <br />
        <TextField
          id="fee"
          label="Fee"
          type="number"
          value="500"
          className="element"
          disabled
        />
        <br />
        {formErrorMessage && <Alert severity="error">{formErrorMessage}</Alert>}
        <div className="Submit">
          <Button className="button" type="submit" variant="contained">
            Enroll
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Home;
