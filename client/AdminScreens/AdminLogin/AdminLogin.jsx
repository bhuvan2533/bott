import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import "./AdminLogin.css";
import { Alert, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [adminNtid, setAdminNtid] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [invalidPass, setInvalidPass] = useState(false);
  async function authenticateAdmin(e) {
    e.preventDefault();
    if (
      (adminNtid.toUpperCase() == "BHS1HYD" && adminPass == "Admin@123456") ||
      (adminNtid.toUpperCase() == "KAU1KOR" && adminPass == "Admin@123456") ||
      (adminNtid.toUpperCase() == "LPA2KOR" && adminPass == "Admin@123456")
    )
      navigate("/admin/home");
    else setInvalidPass(true);
  }

  return (
    <React.Fragment>
      <Navbar />
      <section className="signInPage">
        <div className="leftSection"></div>
        <div className="rightSection">
          <p>Admin Login</p>
          <form onSubmit={authenticateAdmin}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "500px",
              }}
            >
              <TextField
                id="outlined-basic"
                value={adminNtid}
                required
                onChange={(e) => {
                  setAdminNtid(e.target.value);
                }}
                label="Enter your NTID"
                sx={{ margin: "10px 0" }}
                fullWidth
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="Enter password"
                sx={{ margin: "0px 0 20px 0" }}
                fullWidth
                variant="outlined"
                required
                type="password"
                value={adminPass}
                onChange={(e) => {
                  setAdminPass(e.target.value);
                }}
              />
              <div style={{ width: "100%" }}>
                <Button
                  variant="contained"
                  type="submit"
                  style={{ width: "100%" }}
                >
                  Submit
                </Button>
                {invalidPass && (
                  <Alert sx={{ paddingTop: "20px" }} severity="error">
                    Invalid NTID or password, Please contact your admin
                  </Alert>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </React.Fragment>
  );
};

export default AdminLogin;
