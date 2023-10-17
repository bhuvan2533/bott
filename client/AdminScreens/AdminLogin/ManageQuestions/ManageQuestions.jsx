import React from "react";
import { Button } from "@mui/material";
import AdminNavbar from "../../Navbar/AdminNavbar";
import { Link } from "react-router-dom";

const ManageQuestions = () => {
  async function importExcelHandler(e) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("http://localhost:5000/uploadExcel", {
        method: "POST",
        body: formData,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  
  async function exportExcelHandler(e) {
    try {
      // Send a GET request to your Express.js server's route to download the Excel file
      const response = await fetch("http://localhost:5000/api/exportExcel"); 
      if (response.status === 200) {
        const blob = await response.blob();

        // Create a URL for the blob
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "downloaded-file.xlsx";
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error("File download request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }

  return (
    <React.Fragment>
      <AdminNavbar />
      <section className="signInPage">
        <div className="leftSection1"></div>
        <div className="rightSection">
          <p>What you wanna do ?</p>
          <div
            style={{ display: "flex", flexDirection: "column", width: "500px" }}
          >
            <div style={{ margin: "20px 50px 5px 50px" }}>
              <Link to="/admin/questions/add-qa">
                <Button
                  variant="contained"
                  sx={{ padding: "10px", width: "100%" }}
                >
                  Add Q/A
                </Button>
              </Link>
            </div>
            <div style={{ margin: "5px 50px" }}>
              <Link to="/admin/questions/view-qa">
                <Button
                  variant="contained"
                  sx={{ padding: "10px", width: "100%" }}
                >
                  View Q/A
                </Button>
              </Link>
            </div>
            <div style={{ margin: "5px 50px" }}>
              <Link to="/admin/questions/view-tickets">
                <Button
                  variant="contained"
                  sx={{ padding: "10px", width: "100%" }}
                >
                  View Tickets
                </Button>
              </Link>
            </div>
            <div style={{ margin: "5px 50px" }}>
              <Button
                component="label"
                variant="contained"
                sx={{ padding: "10px", width: "100%" }}
              >
                {" "}
                Import Excel
                <input
                  type="file"
                  hidden
                  accept=".xls,.xlsx"
                  onChange={importExcelHandler}
                />
              </Button>
            </div>
            <div style={{ margin: "5px 50px" }}>
              <Button
                component="label"
                onClick={exportExcelHandler}
                href="/api/exportExcel"
                variant="contained"
                sx={{ padding: "10px", width: "100%" }}
              >
                {" "}
                Export Excel
              </Button>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ManageQuestions;
