import React from "react";
import { Button } from "@mui/material";
import AdminNavbar from "../../Navbar/AdminNavbar";
import { Link } from "react-router-dom";
const AdminHomepage = () => {
  return (
    <React.Fragment>
      <AdminNavbar />
      <section className="signInPage">
        <div className="leftSection"></div>
        <div className="rightSection">
          <p>What you wanna do ?</p>
          <div
            style={{ display: "flex", flexDirection: "column", width: "500px" }}
          >
            <div style={{ margin: "15px 50px 5px 50px" }}>
              <Link to="/admin/manage-users">
                <Button
                  variant="contained"
                  sx={{ padding: "10px", width: "100%" }}
                >
                  Manage Users
                </Button>
              </Link>
            </div>
            <div style={{ margin: "5px 50px 5px 50px" }}>
              <Link to="/admin/questions">
                <Button
                  variant="contained"
                  sx={{ padding: "10px", width: "100%" }}
                >
                  Manage Questions
                </Button>
              </Link>
            </div>
            <div style={{ margin: "5px 50px 5px 50px" }}>
              <Link to="/admin/broadcast">
                <Button
                  variant="contained"
                  sx={{ padding: "10px", width: "100%" }}
                >
                  Broadcast Message
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default AdminHomepage;
