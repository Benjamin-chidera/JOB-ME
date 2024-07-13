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


import mysql from "mysql2/promise";

export async function connect() {
  const connection = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  return connection;
}
