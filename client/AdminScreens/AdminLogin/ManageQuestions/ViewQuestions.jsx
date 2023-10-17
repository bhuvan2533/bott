import React, { useEffect, useState } from "react";
import AdminNavbar from "../../Navbar/AdminNavbar";
import QuestionAnswerCard from "./QuestionAnswerCard";
import qaDetails from "../../../qaDetails";
import axios from "axios";
import { Link } from "react-router-dom";
const boxStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "9rem 4rem",
};

const ViewQuestions = () => {
  const [questionData, setQuestionData] = useState([]);
  async function loadData() {
    const apiUrl = "http://localhost:5000/api/getAllQuestions";
    try {
      const {data} = await axios.get(apiUrl);
      setQuestionData(data.allQuestions);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  }
  useEffect(() => {
    loadData();
  }, []);

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
            View &nbsp; Q / A
          </h1>
          {questionData.map((qa) => (
            <QuestionAnswerCard
              key={cnt}
              stripIt={true}
              questionNumber={++cnt}
              qId = {qa.questionNumber}
              question={qa.question}
              answer={qa.answer}
            />
            // </Link>
          ))}
        </div>
      </section>
    </React.Fragment>
  );
};

export default ViewQuestions;
