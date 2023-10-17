import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const RaiseATicket = (props) => {
  const [ratQuestion, setRatQuestion] = useState("");
  const [ratAnswer, setRatAnswer] = useState("");
  
  async function handleRaiseATicket(e) {
    e.preventDefault();
    const temp = [...props.convo];
    props.setConvo(temp);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/raise-a-ticket",
        { ratQ:ratQuestion,ratA:ratAnswer },
        config
        );
        if(data.success){
          alert("We have successfully created a ticket !!, our team experts will look into it and solve your issue ...")
        }
    } catch (e) {
      alert("Connection with the server lost 😓, Please contact your administrator...")
    }
  }

  return (
    <React.Fragment>
      <form
        onSubmit={handleRaiseATicket}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >Please tell us where we went wrong ...
        <TextField
          sx={{ width: "70%", marginTop: "20px" }}
          variant="outlined"
          value={ratQuestion}
          onChange={(e) => {
            setRatQuestion(e.target.value);
          }}
          required
          label="Enter the question for which you did'nt find proper answer"
        />
        <TextField
          sx={{
            width: "70%",
            marginTop: "10px",
            marginBottom: "20px",
          }}
          value={ratAnswer}
          onChange={(e) => {
            setRatAnswer(e.target.value);
          }}
          variant="outlined"
          label="Enter the answer if you know (optional)"
        />
        <Button style={{ width: "70%" }} type="submit" variant="contained">
          Raise a ticket...
        </Button>
      </form>
    </React.Fragment>
  );
};

export default RaiseATicket;
