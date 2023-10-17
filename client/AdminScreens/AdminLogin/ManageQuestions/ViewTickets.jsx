import React from "react";
import AdminNavbar from "../../Navbar/AdminNavbar";
import QuestionAnswerCard from "./QuestionAnswerCard";
import ticketDetails from "./ticketDetails";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

const boxStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "9rem 4rem",
};

const ViewTickets = () => {
  let cnt = 0;
  return (
    <React.Fragment>
      <AdminNavbar />
      <section
        style={{
          width: "100%",
        }}
      >
        <div style={boxStyle}>
          <h1
            style={{
              textAlign: "center",
              fontFamily: "poppins",
              marginBottom: "70px",
            }}
          >
            View &nbsp; Tickets
          </h1>
          <Grid container spacing={2}>
            {ticketDetails.map((qa) => (
              <Grid item xs={4}>
                <QuestionAnswerCard
                  key={cnt}
                  stripIt={false}
                  questionRaiser = {qa.userNTID}
                  questionNumber={++cnt}
                  ticketNumber={qa.ticketNumber}
                  question={qa.question}
                  answer={qa.answer}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ViewTickets;
