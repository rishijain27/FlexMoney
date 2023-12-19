import axios from "axios";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const URL = "http://localhost:5000/participants";
const batchs = ["", "6-7AM", "7-8AM", "8-9AM", "5-6PM"];

const Participants = () => {
  const [participants, setParticipants] = React.useState(null);

  React.useEffect(() => {
    // axios.get(URL).then((response) => {
    //     setParticipants(response.data)
    //     console.log(response.data)
    // })
    fetch("/participants", {
      method: "get",
    })
      .then((res) => res.json())
      .then((response) => {
        setParticipants(response.participants);
      });
  }, []);

  return (
    <div>
      <h2
        style={{
          marginTop: "100px",
          marginLeft: "2%",
          marginRight: "2%",
          color: "Purple",
        }}
      >
        Participants
      </h2>
      <TableContainer
        component={Paper}
        style={{ marginLeft: "2%", marginRight: "2%" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Batch</TableCell>
              <TableCell>Mobile No.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participants &&
              participants.map((p) => (
                <TableRow
                  key={p._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.age}</TableCell>
                  <TableCell>{batchs[p.batch_id]}</TableCell>
                  <TableCell>{p.mobile_no}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {(participants === null || participants.length === 0) && (
        <center>
          <p>Empty</p>
        </center>
      )}
    </div>
  );
};

export default Participants;
