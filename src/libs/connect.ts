import mysql from "mysql2/promise";

export async function connect() {
  const connection = mysql.createPool({
    port: "localhost",
    user: "root",
    password: "STANDOUT12345",
    database: "jobme",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  return connection;
}