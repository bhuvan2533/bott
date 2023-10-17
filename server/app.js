//ogn Jai shri ram
require("dotenv").config();
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const matchGeneralQuestions = require("./helper/answerGeneralQuestions");
const {performNLP} = require("./helper/extractKeywordNdSearch");
const {fillDb} = require("./helper/extractKeywordNdSearch");
// const teamData = require("./helper/queryTeamDetailsDb");
const xlsx = require("xlsx");
const multer = require("multer");
const upload = multer({ dest: "./" });
const cors = require("cors");
const performQuery = require("./config/dbConnect");
const app = express();
const sql = require("mssql");
const path = require("path");
const PORT = 5000;

let config = {
  server: "BAND-C-0003G\\SQLEXPRESS",
  // server: "KOR-C-008GF\\SQLEXPRESS",
  authentication: {
    type: "default",
    options: {
      userName: "admin", // update me
      password: "Admin@123456", // update me
    },
  },
  options: {
    database: "testDb",
    validateBulkLoadParameters: false,
    trustServerCertificate: true,
    encrypt: false,
  },
};

let config1 = {
  server: "tcp:buddybotserver.database.windows.net",
  // server: "KOR-C-008GF\\SQLEXPRESS",
  authentication: {
    type: "default",
    options: {
      userName: process.env.DATABASE_ADMINNAME, // update me
      // userName : "buddybotAdmin",
      password: process.env.DATABASE_ADMINPASSWORD, // update me
    },
  },
  options: {
    database: "buddybotdb",
    validateBulkLoadParameters: false,
    trustServerCertificate: true,
    encrypt: false,
  },
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Enabling CORS :
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type, Accept"
  );
  next();
});
// ________________________________________jlijl________________________________
// app.get("/yoyo1", async (req, res) => {
//   try {
//     const queryResult = await performQuery(
//       "INSERT INTO dbo.EmpDetails ([Sl no.], EmpNtid, EmpName, TeamName) VALUES (5, 'LKD4GDK', 'Mahesh', 'EFV2')"
//     );
//     console.log("Query Result:", queryResult);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// });
// ________________________________________jlijl________________________________

app.get("/test", async (req, res) => {
  console.log(await performQuery("Select * from dbo.questionDb"));
});

app.post("/chat", async (req, res) => {
  const queryPrompt = req.body.prompt;
  const teamData = await performQuery("select * from dbo.empDetail");
  teamData.sort((a, b) => a.empName.localeCompare(b.empName));
  if (queryPrompt === "/team" || queryPrompt === "/teamdetails") {
    const lvlTeamDetails = teamData;
    res.json({ isTeamData: true, teamDetails: lvlTeamDetails, isBot: true });
  } else {
    const lvl1 = matchGeneralQuestions(queryPrompt);
    if (lvl1) {
      res.json({ msg: lvl1, isBot: true });
    } else {
      const lvl2 = performNLP(queryPrompt);
      //If only 1 answer is found...
      if (lvl2.length == 1) {
        let response = lvl2[0].answer;
        res.json({
          msg: response,
          docuLink: lvl2[0].docupediaLink,
          localHostLink: lvl2[0].localHostLinks,
          imgLink: lvl2[0].imageLink,
          isBot: true,
        });
      }
      //If more than 1 response is found
      else if (!lvl2.length == 0) {
        res.json({ ansObj: lvl2, isBot: true, containsMultipleAns: true });
      } else {
        res.json({
          msg: "Sorry I am not yet trained to answer this question.. 🙂",
          isBot: true,
        });
      }
    }
  }
});

//__________Import excel contents______________
app.post("/uploadExcel", upload.single("file"), async (req, res) => {
  try {
    const uploadedFile = req.file;
    const workbook = xlsx.readFile(uploadedFile.path);
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    await sql.connect(config);
    const deleteQuery = `Delete from dbo.questionDb`;
    await sql.query(deleteQuery);
    for (const item of sheetData) {
      const query = `INSERT INTO dbo.questionDb (questionNumber, question, answer, docupediaLink, imageLink, localhostLinks,boschTubeLinks) 
                 VALUES (@questionNumber, @question, @answer, @docupediaLink, @imageLink, @localhostLinks,@boschTubeLinks)`;

      const request = new sql.Request();

      // Bind parameters
      const qn = parseInt(item.questionNumber, 10);
      request.input("questionNumber", sql.Int, qn);
      request.input("question", sql.NVarChar, item.question);
      request.input("answer", sql.NVarChar, item.answer);
      request.input("docupediaLink", sql.NVarChar, item.docupediaLink);
      request.input("imageLink", sql.NVarChar, item.imageLink);
      request.input("localhostLinks", sql.NVarChar, item.localHostLinks);
      request.input("boschTubeLinks", sql.NVarChar, item.boschTubeLinks);

      const result = await request.query(query);
      console.log(result);
    }
    await sql.close();
    fillDb();
    console.log("Data inserted successfully.");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
  res.json({ isSuccess: true });
});
//__________________________________________________________

//__________Export excel contents______________
app.get("/api/exportExcel", async (req, res) => {
  const returnAllQuestions = await performQuery("Select * from dbo.questionDb");
  const ws = xlsx.utils.json_to_sheet(returnAllQuestions);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, "Questions");
  xlsx.writeFile(wb, "file.xlsx");

  const filePath = path.join(__dirname, "file.xlsx"); // Update with the actual file path
  const fileName = "downloaded-file.xlsx"; // Specify the desired filename with .xlsx extension

  // Set headers for the response to indicate the file type and suggest a filename
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

  // Send the file as a response
  res.sendFile(filePath);
});

//____________Raise-A-Ticket_____________
app.post("/raise-a-ticket", (req, res) => {
  res.json({ success: true });
  console.log(req.body.ratQ, req.body.ratA);
});
//__________________________________________________________

//____________Return all the questions_____________
app.get("/api/getAllQuestions", async (req, res) => {
  const returnAllQuestions = await performQuery("Select * from dbo.questionDb");
  res.json({ allQuestions: returnAllQuestions });
});
//__________________________________________________________

//____________Return all the employee details_____________
app.get("/api/getAllEmpData", async (req, res) => {
  const returnAllData = await performQuery("Select * from dbo.empDetail");
  res.json({ allEmpData: returnAllData });
});
//__________________________________________________________

//____________Add a user_____________
app.post("/api/add-user", async (req, res) => {
  try {
    const queryResult = await performQuery(
      `INSERT INTO dbo.empDetail (empNtid, empName, taskName, teamName) VALUES ('${req.body.userNtid}', '${req.body.userName}', '${req.body.taskName}', '${req.body.teamName}')`
    );
    // console.log(req.body)
    res.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.json({ success: false });
  }
});
//__________________________________________________________

//____________Delete a user_____________
app.get("/api/delete-user/:userNtid", async (req, res) => {
  await performQuery(
    `delete from dbo.empDetail where empNtid='${req.params.userNtid}'`
  );
  res.json({ success: true });
});
//__________________________________________________________

//____________Add a question_____________
app.post("/api/add-question", async (req, res) => {
  try {
    const tot = await performQuery(`SELECT TOP 1 * FROM dbo.questionDb ORDER BY questionNumber DESC;`);
    let totalRecords = tot[0].questionNumber;
    const yo = await performQuery(
      `INSERT INTO dbo.questionDb (questionNumber, question, answer, docupediaLink, imageLink, localhostLinks, boschTubeLinks) VALUES ('${++totalRecords}', '${
        req.body.dbQue
      }', '${req.body.dbAns}', '${req.body.dbDocu}', '${req.body.dbImg}', '${
        req.body.dbLh
      }', '${req.body.dbBt}')`
    );
    fillDb();
    res.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.json({ success: false });
  }
});
//__________________________________________________________



//____________Delete a question_____________
app.get("/api/delete-question/:qid", async (req, res) => {
  await performQuery(
    `delete from dbo.questionDb where questionNumber='${req.params.qid}'`
  );
  fillDb();
  res.json({ success: true });
});
//__________________________________________________________




//Setting up a server
app.listen(PORT, (error) => {
  if (!error) console.log("Server is running on port " + PORT);
  else console.log("Error occurred, server can't start", error);
});
//__________________________________________________________
