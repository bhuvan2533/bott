import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import AdminNavbar from "../../Navbar/AdminNavbar";
import { useParams } from "react-router-dom";

const boxStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "0 30rem",
};

const UpdateQuestions = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [docupediaLink, setDocupediaLink] = useState("");
  const [lhLink, setLhLink] = useState("");
  const [btLink, setBtLink] = useState("");
    const params = useParams();
    const qId = params.questionId;
    console.log(qId);

  return (
    <React.Fragment>
      <AdminNavbar />
      <section
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form style={{ width: "100%" }}>
        <div style={boxStyle}>
            <h1
              style={{
                textAlign: "center",
                fontFamily: "poppins",
                marginBottom: "10px",
              }}
            >
              Update &nbsp; Q / A
            </h1>
            <TextField
              sx={{ margin: "10px 0" }}
              required
              variant="outlined"
              label="Enter the question"
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
            />

            <textarea
              cols="30"
              style={{
                backgroundColor: "rgba(0,0,0,0)",
                color: "rgba(255,255,255,0.8)",
                padding: "16px",
                fontSize: "1.1rem",
                marginBottom: "5px",
              }}
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              rows="6"
              placeholder="Enter the answer *"
              required
            ></textarea>
            <TextField
              sx={{ margin: "5px 0" }}
              variant="outlined"
              label="Enter the Image link (optional)"
              value={imgLink}
              onChange={(e) => {
                setImgLink(e.target.value);
              }}
            />
            <TextField
              sx={{ margin: "5px 0" }}
              variant="outlined"
              label="Link to Docupedia (optional)"
              value={docupediaLink}
              onChange={(e) => {
                setDocupediaLink(e.target.value);
              }}
            />
            <TextField
              sx={{ margin: "5px 0" }}
              variant="outlined"
              label="Localhost Links (optional)"
              value={lhLink}
              onChange={(e) => {
                setLhLink(e.target.value);
              }}
            />
            <TextField
              sx={{ margin: "5px 0" }}
              variant="outlined"
              label="Link to Bosch Tube (optional)"
              value={btLink}
              onChange={(e) => {
                setBtLink(e.target.value);
              }}
            />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </section>
    </React.Fragment>
  );
};

export default UpdateQuestions;
