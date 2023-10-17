import React from 'react'
import AdminNavbar from "../../Navbar/AdminNavbar"
import { Button, TextField } from '@mui/material'
const boxStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "0 30rem",
  };
  
const BroadcastMessage = () => {
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
              Broadcast &nbsp; message
            </h1>
            <TextField
              sx={{ margin: "10px 0" }}
              required
              variant="outlined"
              label="Sender name"
            />

            <textarea
              cols="30"
              style={{
                backgroundColor: "rgba(0,0,0,0)",
                color: "rgba(255,255,255,0.8)",
                padding: "16px",
                fontSize: "1.1rem",
                marginBottom: "40px",
              }}
              rows="9"
              placeholder="Enter the broadcast message *"
              required
            ></textarea>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </section>
    </React.Fragment>
  )
}

export default BroadcastMessage
