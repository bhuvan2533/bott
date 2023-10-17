import React, { useEffect, useState } from "react";
import AdminNavbar from "../../Navbar/AdminNavbar";
import CreateTable from "./CreateTable";
import "./ManageUsers.css"
import { Link } from "react-router-dom";
import axios from "axios"
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";


const ManageUsers = () => {
  const [empData,setEmpData] = useState([])

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

  


  return (
    <React.Fragment>
      <AdminNavbar />
      <section className="manageUsers">
        <h3 style={{ textAlign: "center",fontSize:"1.9rem", marginBottom:"30px" }}>Manage Users</h3>
        <div style={{ display: "flex", alignItems: "center",padding:"50px" }}>
        <div style={{width:"100%"}}>
            
          <FormControl style={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-label">Team Name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Team Name"
            >
              <MenuItem value={"EFV22"}>EFV22</MenuItem>
              <MenuItem value={"EPV24"}>EPV24</MenuItem>
              <MenuItem value={"EMT23"}>EMT23</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div style={{ width: "40%", textAlign: "center" }}>
          <Link to="add-user">
          <Button variant="contained" sx={{ width: "40%" }}>
            Add User
          </Button>
          </Link>
        </div>
      </div>
        <CreateTable empTableData={empData} style={{paddingBottom:"100px"}} />
      </section>
    </React.Fragment>
  );
};

export default ManageUsers;
