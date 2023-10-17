const xlsx = require("xlsx");
const fs = require('fs');

//Converting json to excel
// const jsonData = require("./qaDetailsDb.js")
// const ws = xlsx.utils.json_to_sheet(jsonData);

// const wb = xlsx.utils.book_new();
// xlsx.utils.book_append_sheet(wb,ws,"Sheet1")

// xlsx.writeFile(wb,"output.xlsx")


//Converting the excel sheet to json data
const workbook = xlsx.readFile("./output.xlsx")
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const jsonData = xlsx.utils.sheet_to_json(worksheet);


const jsonString = JSON.stringify(jsonData,null,2);
const file_path = "./yoyo1.json"
fs.writeFile(file_path,jsonString,function(err){
    console.log(err)
})


