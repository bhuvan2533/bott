import React, { useState } from "react";
import AdminNavbar from "../../Navbar/AdminNavbar";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
const boxStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "0 30rem",
};
const Addusers = () => {
  const navigate = useNavigate();
  async function addUserTodb(e) {
    e.preventDefault();
    const obj = {
      userNtid: userNtid.toUpperCase(),
      userName: userName,
      taskName: taskName,
      teamName: teamName,
    };
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/add-user",
        obj,
        config
      );
      if (data.success) {
        alert("Successfully added the user !!!.");
        navigate("/admin/manage-users");
      } else alert("Unable to add the user !!");
    } catch (e) {
      alert(
        "Connection with the server lost 😓, Please contact your administrator..."
      );
    }
  }
  const [userNtid, setUserNtid] = useState("");
  const [userName, setUsername] = useState("");
  const [taskName, settaskName] = useState("");
  const [teamName, setTeamName] = useState("");
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
        <form onSubmit={addUserTodb} style={{ width: "100%" }}>
          <div style={boxStyle}>
            <h1
              style={{
                textAlign: "center",
                fontFamily: "poppins",
                marginBottom: "10px",
              }}
            >
              Add user
            </h1>
            <TextField
              sx={{ margin: "5px 0" }}
              variant="outlined"
              label="Enter user's NTID"
              value={userNtid}
              required
              onChange={(e) => {
                setUserNtid(e.target.value);
              }}
            />
            <TextField
              sx={{ margin: "5px 0" }}
              variant="outlined"
              label="Enter user name"
              value={userName}
              required
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <TextField
              sx={{ margin: "5px 0" }}
              variant="outlined"
              label="Enter task the user is working on"
              value={taskName}
              required
              onChange={(e) => {
                settaskName(e.target.value);
              }}
            />
            <TextField
              sx={{ margin: "5px 0 20px 0" }}
              variant="outlined"
              label="Enter team name"
              value={teamName}
              onChange={(e) => {
                setTeamName(e.target.value);
              }}
              required
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

export default Addusers;
