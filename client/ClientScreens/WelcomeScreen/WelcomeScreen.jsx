import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import "./WelcomeScreen.css";
import TextField from "@mui/material/TextField";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import EastIcon from "@mui/icons-material/East";
import { Alert, Button, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const WelcomeScreen = () => {
  const [empData, setEmpData] = useState([]);
  async function loadData() {
    const apiUrl = "http://localhost:5000/api/getAllEmpData";
    try {
      const {data} = await axios.get(apiUrl);
      setEmpData(data.allEmpData);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  }
  useEffect(() => {
    loadData();
  }, []);



  const navigate = useNavigate();
  const [inputNtid, setInputNtid] = useState("");
  const [isvalidNtid, setIsValidNtid] = useState(false);

  //Makes a check in the db whether the inputted NTID exists or not...
  async function validNtidHandler(e) {
    e.preventDefault();
    try {
      // const config={
      //   headers:{
      //     "Content-type":"application/json",
      //   }
      // };
      //  const {data}=await axios.post("path",inputNtid,config);

      empData.forEach(user => {
        if (inputNtid.toLowerCase() === user.empNtid.toLowerCase()) {
          navigate("/chat");
        } else {
          setIsValidNtid(true);
          setInputNtid("");
        }
      });
      
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <React.Fragment>
      <Navbar colorProp="rgb(0,4,36)" />
      <section className="bgStyle">
        <div className="centerThis">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 className="welcomeScreen_h1">Welcome to BuddyBot</h1>
            {/* <p style={{textAlign:"center",fontFamily:"poppins",color:"gray"}}>Your Onboarding Companion</p> */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <KeyboardDoubleArrowDownIcon
                sx={{
                  fontSize: "35px",
                  margin: "60px",
                  borderRadius: "50%",
                  boxShadow: "0px 0px 45px 20px #747DE8",
                  animation: "glow 2s linear infinite alternate",
                  "@keyframes glow": {
                    "100%": {
                      boxShadow: "0px 0px 10px 7px #747DE8",
                    },
                  },
                }}
              />
            </div>
            <form onSubmit={validNtidHandler}>
              <TextField
                id="outlined-basic"
                style={{ width: "100%" }}
                label="Enter your NTID"
                value={inputNtid}
                onChange={(e) => {
                  setInputNtid(e.target.value);
                }}
                variant="outlined"
                inputProps={{ minLength: 7, maxLength: 10 }}
                InputProps={{
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
                        <EastIcon
                          sx={{
                            color: "white",
                            "&:hover": {
                              translate: "7px",
                              cursor: "pointer",
                              transition: "0.5s all",
                            },
                          }}
                        />
                      </Button>
                    </InputAdornment>
                  ),
                }}
                required
              />
            </form>
            {isvalidNtid && (
              <Alert sx={{ paddingTop: "20px" }} severity="error">
                Invalid NTID, Please contact your admin
              </Alert>
            )}
            <div className="copyrightLine"> 
              Designed & Developed by HCP1 ComVeh Team &copy;
            </div>
            <div className="copyrightLine1">
              Todays communication is tomorrows future...{" "}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
export default WelcomeScreen;
