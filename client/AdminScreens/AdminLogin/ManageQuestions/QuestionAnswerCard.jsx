import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import axios from "axios"
const QuestionAnswerCard = (props) => {
  const strippedAnswer = String(props.answer).substring(0, 200) + "  .....";

  async function deleteQuestion(qNo) {
      const apiUrl = `http://localhost:5000/api/delete-question/${qNo}`
      try {
        const {data} = await axios.get(apiUrl);
        if(data.success){
          alert("Successfully deleted the question !!!");
          window.location.reload();
        }
        else alert("There was some problem in deleting the user !");
      } catch (err) {
        console.error('Error fetching data:', err);
      }
  }
  return (
    <React.Fragment>
      <div>
        <Card sx={{ maxWidth: "100%", marginBottom: "30px" }}>
          <CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                {!props.stripIt && (
                  <p style={{ fontSize: "12px", color: "gray" }}>
                    User NTID - {props.questionRaiser}
                  </p>
                )}
              </div>
              <div style={{ textAlign: "right" }}>
                <Link
                  to={
                    `/admin/questions/update-question/` +
                    Number(
                      props.stripIt ? props.questionNumber : props.ticketNumber
                    )
                  }
                >
                  <IconButton sx={{ marginLeft: "20px" }}>
                    <EditIcon
                      sx={{
                        "&:hover": {
                          // scale: "1.08",
                          color: "gray",
                          cursor: "pointer",
                          transition: "0.6s all",
                        },
                      }}
                    />
                  </IconButton>
                </Link>
                <IconButton sx={{ marginLeft: "0px" }}>
                  <DeleteIcon
                    onClick={(event) => {
                      deleteQuestion(props.questionNumber);
                    }}
                    sx={{
                      "&:hover": {
                        // scale: "1.08",
                        color: "#FF5C5C",
                        cursor: "pointer",
                        transition: "0.6s all",
                      },
                    }}
                  />
                </IconButton>
              </div>
            </div>
            <Typography gutterBottom variant="h6" component="div">
              {props.questionNumber}) {props.question}{" "}
            </Typography>
            <Typography variant="body2" color="#888888">
              {props.stripIt === true ? strippedAnswer : props.answer}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default QuestionAnswerCard;
