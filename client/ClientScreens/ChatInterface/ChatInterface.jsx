import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import "./ChatInterface.css";
import { Avatar, IconButton, TextField, Tooltip } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { Button, InputAdornment } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import axios from "axios";
import { Link } from "react-router-dom";
import RaiseATicket from "./RaiseATicket";

const ChatInterface = () => {
  let cpy = "";
  let flag = false;
  const [differentIcon, setDifferentIcon] = useState(false);
  const [inputPrompt, setInputPrompt] = useState("");
  const convoArray = [];
  const [convoFlow, setConvoFlow] = useState(convoArray);
  const [questionList, setQuestionList] = useState(convoArray);
  const [broadcastMsgPresent, setBroadcastMsgPresent] = useState(true);
  let textFromServer = [];
  let teamDetails = [];
  async function handleConvoFlow(e) {
    setBroadcastMsgPresent(false);
    e.preventDefault();
    setInputPrompt("");
    setConvoFlow((prevConvoFlow) => [
      ...prevConvoFlow,
      {
        textData: inputPrompt,
        isUser: true,
        badgeInitial: "B",
      },
    ]);

    //Make a API call to backend and get the data from there...
    try {
      if (inputPrompt === "raise a ticket") {
        setConvoFlow((prevConvoFlow) => [
          ...prevConvoFlow,
          {
            textData: [
              <RaiseATicket convo={convoFlow} setConvo={setConvoFlow} />,
            ],
            isUser: false,
          },
        ]);
      } else if (inputPrompt === "/links") {
        setConvoFlow((prevConvoFlow) => [
          ...prevConvoFlow,
          {
            textData: [
              <div>
                IT service Portal :{" "}
                <a
                  style={{
                    color: "gray",
                    fontWeight: "700",
                    fontFamily: "poppins",
                  }}
                  href="https://service-management.bosch.tech/sp"
                >
                  Link
                </a>
              </div>,
              <div>
                Employee Service Portal :{" "}
                <a
                  style={{
                    color: "gray",
                    fontWeight: "700",
                    fontFamily: "poppins",
                  }}
                  href="https://banvm034.apac.bosch.com/landingpage/"
                >
                  Link
                </a>
              </div>,
              <div>
                Docupedia :{" "}
                <a
                  style={{
                    color: "gray",
                    fontWeight: "700",
                    fontFamily: "poppins",
                  }}
                  href="https://inside-docupedia.bosch.com/confluence/display/NGW/Digital+Workplace"
                >
                  Link
                </a>
              </div>,
              <div>
                Apply leave :{" "}
                <a
                  style={{
                    color: "gray",
                    fontWeight: "700",
                    fontFamily: "poppins",
                  }}
                  href="https://inside.bosch.com/irj/portal/fiori#HR_CORE_MyLeaveReqExt-manage"
                >
                  Link
                </a>
              </div>,
              <div>
                Bosch Tube :{" "}
                <a
                  style={{
                    color: "gray",
                    fontWeight: "700",
                    fontFamily: "poppins",
                  }}
                  href="https://tube.video.bosch.com/"
                >
                  Link
                </a>
              </div>,
              <div>
                Add/Remove Software :{" "}
                <a
                  style={{
                    color: "gray",
                    fontWeight: "700",
                    fontFamily: "poppins",
                  }}
                  href="https://service-management.bosch.tech/sp?id=ui_sc_cat_item&sys_id=b08ed16c1b83c91078087403dd4bcbb1&service_id=29&lang_code=en"
                >
                  Link
                </a>
              </div>,
            ],
            isUser: false,
          },
        ]);
      } else if (inputPrompt === "/tech") {
        setConvoFlow((prevConvoFlow) => [
          ...prevConvoFlow,
          {
            textData: [
              <p>
                <span style={{ fontWeight: "700", fontSize: "18px" }}>
                  Frontend :
                </span>
                <br />
                &nbsp;&nbsp;&nbsp;- React.js
                <br />
                <br />
              </p>,
              <p>
                <span style={{ fontWeight: "700", fontSize: "18px" }}>
                  Backend :
                </span>
                <br />
                &nbsp;&nbsp;&nbsp;- Node.js
                <br />
                &nbsp;&nbsp;&nbsp;- Express.js
                <br />
                <br />
              </p>,
              <p>
                <span style={{ fontWeight: "700", fontSize: "18px" }}>
                  Database :
                </span>
                <br />
                &nbsp;&nbsp;&nbsp;- SQL
                <br />
                <br />
              </p>,
              <p>
                <span style={{ fontWeight: "700", fontSize: "18px" }}>
                  Packages required :
                </span>
                <br />
                &nbsp;&nbsp;&nbsp;- Axios (api connection) <br />
                &nbsp;&nbsp;&nbsp;- Natural (NLP processing)
                <br />
                &nbsp;&nbsp;&nbsp;- mssql(connection to sql server)
                <br />
                &nbsp;&nbsp;&nbsp;- xlsx(To deal with excel files)
                <br />
                &nbsp;&nbsp;&nbsp;- Multer (File uploading)
                <br />
                <br />
              </p>,
            ],
            isUser: false,
          },
        ]);
      } else if (inputPrompt === "/admin") {
        setConvoFlow((prevConvoFlow) => [
          ...prevConvoFlow,
          {
            textData: [
              <p>The incharge for maintaining the chatbot : <br /><br /></p>,
              <p>Devanira Kaushik Kariappa Vijaya - KAU1KOR</p>,
              <p> Nair Lakshmi P - LPA2KOR</p>,
            ],
            isUser: false,
          },
        ]);
      } else if (inputPrompt === "/commands") {
        setConvoFlow((prevConvoFlow) => [
          ...prevConvoFlow,
          {
            textData: [
              <p>Try the commands which are provided below : <br /><br /></p>,
              <p>/team - Gives the information about your team<br /><br /></p>,
              <p>/links - Returns you all the necessary links<br /><br /></p>,
              <p>/admin - Gives you the admin name who is managing the chatbot<br /><br /></p>,
              <p>/tech - Gives you the information about the technologies which are used for developing this chatbot<br /><br /></p>,
            ],
            isUser: false,
          },
        ]);
      } else {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "http://localhost:5000/chat",
          { prompt: inputPrompt.toLowerCase() },
          config
        );
        if (data.isTeamData === true) {
          teamDetails = data.teamDetails;

          setConvoFlow((prevConvoFlow) => [
            ...prevConvoFlow,
            {
              isUser: !data.isBot,
              teamDet: teamDetails,
              isTeamDet: data.isTeamData,
            },
          ]);
        } else if (data.isBot && !data.containsMultipleAns) {
          let yo = data.msg;
          flag = true;
          textFromServer = yo.split("\n");
          setConvoFlow((prevConvoFlow) => [
            ...prevConvoFlow,
            {
              textData: textFromServer,
              isUser: !data.isBot,
              docupediaLink: data.docuLink,
              localHostLinks: data.localHostLink,
              imgLinks: data.imgLink,
            },
          ]);
        } else if (data.containsMultipleAns) {
          flag = false;
          const ansList = data.ansObj;
          setQuestionList(ansList);
          setConvoFlow((prevConvoFlow) => [
            ...prevConvoFlow,
            {
              qList: ansList,
              isUser: !data.isBot,
              multiQuestion: true,
            },
          ]);
        }
      }
    } catch (e) {
      if (e) {
        setConvoFlow((prevConvoFlow) => [
          ...prevConvoFlow,
          {
            textData: [
              "Connection with the server lost 😥, Please contact your network administrator...",
            ],
            isUser: false,
          },
        ]);
      } else if (e.toJSON().message === "Network Error") {
        setConvoFlow((prevConvoFlow) => [
          ...prevConvoFlow,
          {
            textData: [
              "Connection with the server lost 😥, Please contact your network administrator...",
            ],
            isUser: false,
          },
        ]);
      }
      console.log(e);
    }
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }

  return (
    <React.Fragment>
      <Navbar colorProp="rgb(0,0,0)" />
      <section id="bgStyle1">
        <div className="chatSection">
          {broadcastMsgPresent && (
            <div className="broadcastSection">
              <h1>Announcement : </h1>
              <p>
                <b>From :</b> Bhuvan S<br />
                <b>Timings :</b> 4 onwards...
              </p>
              <br />
              <p>
                Good evening !!! <br /> We invite you to join us today for an
                enlightening presentation on Citibot and Buddybot, where we'll
                explore the cutting-edge advancements in conversational AI.{" "}
                <br />
                <br />
                <b>Presentation Highlights:</b>
                <br />
                <br />
                Introduction to Citibot.
                <br />
                Introduction to Buddybot
                <br />
                Real-World Applications
                <br />
                Interactive Demonstrations
                <br />
                Q&A Session
              </p>
            </div>
          )}
          {convoFlow.map((card, index) => (
            <div key={index}>
              {card.isUser && (
                <div className="convoCard">
                  <Avatar sx={{ bgcolor: "orange" }}>
                    {card.badgeInitial}
                  </Avatar>
                  <p>{String(card.textData)}</p>
                </div>
              )}

              {!card.isUser && (
                <div className="convoCard answerCard">
                  <Avatar sx={{ bgcolor: "gray" }}>
                    <SmartToyIcon />
                  </Avatar>

                  <p className="typewriter">
                    {card.textData &&
                      card.textData.map((ele) => {
                        return (
                          <p style={{ margin: "0", padding: "0" }}>{ele}</p>
                        );
                      })}

                    {card.docupediaLink && (
                      <Link
                        to={card.docupediaLink}
                        style={{
                          color: "white",
                          fontWeight: "500",
                          fontFamily: "poppins",
                        }}
                        target="__blank"
                      >
                        Link
                        <br />
                      </Link>
                    )}

                    {card.localHostLinks && (
                      <span
                        className="cpyToClpb"
                        onClick={() => {
                          cpy = card.localHostLinks;
                          navigator.clipboard.writeText(cpy);
                        }}
                      >
                        Copy path to clipboard
                      </span>
                    )}

                    {/* {card.textData &&
                      card.textData.map((ele) => {
                        return (
                          <p style={{ margin: "0", padding: "0" }}>{ele}</p>
                        );
                      })} */}

                    {card.isTeamDet &&
                      card.teamDet.map((ele) => {
                        return (
                          <p>
                            {ele.empName} &nbsp;- &nbsp;{ele.empNtid} &nbsp;-
                            &nbsp;{ele.taskName}{" "}
                          </p>
                        );
                      })}

                    {card.multiQuestion &&
                      card.qList.map((ele) => {
                        return (
                          <p className="qList">
                            <Button
                              sx={{
                                color: "#899093",
                                textDecoration: "underline",
                              }}
                              onClick={(e) => {
                                let formattedData = ele.answer;
                                formattedData = formattedData.split("\n");
                                setConvoFlow((prevConvoFlow) => [
                                  ...prevConvoFlow,
                                  {
                                    textData: ele.question,
                                    isUser: true,
                                  },
                                ]);
                                setConvoFlow((prevConvoFlow) => [
                                  ...prevConvoFlow,
                                  {
                                    textData: formattedData,
                                    docupediaLink: ele.docupediaLink,
                                    localHostLinks: ele.localHostLink,
                                    isUser: false,
                                    imgLinks: ele.imageLink,
                                  },
                                ]);
                                window.scrollTo({
                                  left: 0,
                                  top: document.body.scrollHeight,
                                  behavior: "smooth",
                                });
                              }}
                            >
                              {ele.question}
                            </Button>
                          </p>
                        );
                      })}
                    <img
                      style={{ marginTop: "30px", width: "65%" }}
                      src={card.imgLinks}
                      alt=""
                    />
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "start",
                    }}
                  >
                    <Tooltip title="Like">
                      <IconButton
                        sx={{
                          "&:hover": {
                            // scale: "1.08",
                            color: "green",
                            cursor: "pointer",
                            transition: "0.6s all",
                          },
                        }}
                      >
                        <ThumbUpOutlinedIcon
                          sx={{
                            fontSize: "19px",
                            color: "#899093",
                          }}
                        />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Dislike">
                      <IconButton
                        onClick={(e) => {
                          setConvoFlow((prevConvoFlow) => [
                            ...prevConvoFlow,
                            {
                              textData: "Not satisfied with the response... 😓",
                              isUser: true,
                            },
                          ]);
                          setConvoFlow((prevConvoFlow) => [
                            ...prevConvoFlow,
                            {
                              textData: [
                                <RaiseATicket
                                  convo={convoFlow}
                                  setConvo={setConvoFlow}
                                />,
                              ],
                              isUser: false,
                            },
                          ]);
                        }}
                        sx={{
                          "&:hover": {
                            color: "red",
                            cursor: "pointer",
                            transition: "0.6s all",
                          },
                        }}
                      >
                        <ThumbDownOutlinedIcon
                          sx={{
                            fontSize: "19px",
                            color: "#899093",
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleConvoFlow}>
          <div className="placeAtBottom">
            <TextField
              id="outlined-basic"
              label="Enter your prompt"
              variant="outlined"
              onBlur={(e) => {
                if (inputPrompt.length === 0) setDifferentIcon(false);
              }}
              onChange={(e) => {
                setInputPrompt(e.target.value);
                setDifferentIcon(true);
              }}
              fullWidth
              value={inputPrompt}
              sx={{ margin: "0 28rem", borderRadius: "500px" }}
              inputProps={{ minLength: 2 }}
              InputProps={{
                sx: { borderRadius: "10px" },
                endAdornment: (
                  <InputAdornment position="start">
                    <Button
                      type="submit"
                      style={{
                        backgroundColor: "transparent",
                        padding: "0",
                        margin: "0",
                      }}
                    >
                      {!differentIcon ? (
                        <MicIcon
                          sx={{
                            color: "#d4cecd",
                            "&:hover": {
                              scale: "1.08",
                              color: "#c9372c",
                              cursor: "pointer",
                              transition: "0.4s all",
                            },
                          }}
                        />
                      ) : (
                        <EastIcon
                          sx={{
                            color: "#d4cecd",
                            "&:hover": {
                              translate: "7px",
                              color: "white",
                              cursor: "pointer",
                              transition: "0.4s all",
                            },
                          }}
                        />
                      )}
                    </Button>
                  </InputAdornment>
                ),
              }}
              required
            />
          </div>
        </form>
      </section>
      <div className="boBottom"></div>
    </React.Fragment>
  );
};

export default ChatInterface;
