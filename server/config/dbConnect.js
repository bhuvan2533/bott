const sql = require("mssql");
let config = {
  server: "BAND-C-0003G\\SQLEXPRESS",
  // server: "KOR-C-008GF\\SQLEXPRESS",
  authentication: {
    type: "default",
    options: {
      userName: "admin", // update me
      // userName : "buddybotAdmin",
      password: "Admin@123456", // update me
    },
  },
  options: {
    database: "testDb",
    validateBulkLoadParameters: false,
    trustServerCertificate : true,
    encrypt: false,
  },
};

// let config1 = {
//   server: "buddybotserver.database.windows.net",
//   // server: "KOR-C-008GF\\SQLEXPRESS",
//   authentication: {
//     type: "default",
//     options: {
//       userName: process.env.DATABASE_ADMINNAME, // update me
//       // userName : "buddybotAdmin",
//       password: process.env.DATABASE_ADMINPASSWORD, // update me
//     },
//   },
//   options: {
//     database: "buddybotdb",
//     validateBulkLoadParameters: false,
//     trustServerCertificate : true,
//     encrypt: false,
//   },
// };

// const config3 = {
//   server: 'buddybotserver.database.windows.net',
//   database: 'buddybotdb',
//   user: 'buddybotadmin',
//   password: 'Admin@123456',
//   options: {
//     encrypt: false, // Use encryption (recommended)
//     trustServerCertificate: true, // Change to true for local development
//   },
// };

async function queryDb(userQuery) {
  try {
    await sql.connect(config);
    // const query = userQuery;
    const result = await sql.query(userQuery);

    await sql.close();
    console.log('Connected to Azure SQL Database');
    return result.recordset;
  } catch (err) {
    console.error('Error connecting to Azure SQL Database:', err);
  }
}

module.exports = queryDb;









// nslookup your-server-name.database.windows.net
// Test-NetConnection -computer myserver.database.windows.net -port 1433
// let resFromDb =""
// const queryResponse = function (sqlQuery) {
//   const pool = new sql.ConnectionPool(config);
//   pool.connect().then(() => {
//     console.log("Connected to the server");
//     return pool
//       .query(sqlQuery)
//       .then((result) => {
//         resFromDb = JSON.stringify(result.recordset);
        
//       })
//       .catch((err) => {
//         console.log("Error" + err);
//       });
//   });
// };

// queryResponse("select * from dbo.EmpDetails")
// module.exports = resFromDb;

// async function performQuery(userQuery) {
//   try {
//     await sql.connect(config);

//     // const query = 'delete from dbo.EmpDetails where [Sl no.]= 2';
//    const query = userQuery;
//     const result = await sql.query(query);

//     await sql.close();

//     return result.recordset;
//   } catch (error) {
//     console.error('Error executing query:', error);
//     throw error;
//   }
// }

// module.exports = performQuery;
// console.log(performQuery("Select * from dbo.EmpDetails"))

//Reference : https://www.youtube.com/watch?v=9JrnEO3W2Ys

