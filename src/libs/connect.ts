// import mysql from "mysql2/promise";

// export async function connect() {
//   const connection = mysql.createPool({
//     host: "localhost",
//     port: 3306, // Default MySQL port, change if yours is different
//     user: "root",
//     password: "STANDOUT12345",
//     database: "jobme",
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//   });

//   return connection;
// }
// import mysql from "mysql2/promise";

// export async function connect() {
//   const connection = mysql.createPool({
//     host: "localhost",
//     port: 3306, // Default MySQL port, change if yours is different
//     user: "uwclyzmu_benjamin",
//     password: "N6Tam2W[,av",
//     database: "uwclyzmu_jobme",
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//   });

//   return connection;
// }




// import mysql from "mysql2/promise";

// export async function connect() {
//   const connection = mysql.createPool({
//     host: ,
//     port: ,
//     user: ,
//     password: ,
//     database: ,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//   });

//   return connection;
// }
import mongoose from "mongoose";

export const server = async () => {
  try {
    await mongoose.connect(process.env.MONGO!, { dbName: "jobme" });
    console.log(`server listening`);
  } catch (error) {
    console.log(error);
  }
};