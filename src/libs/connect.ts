import mysql from "mysql2/promise";

export async function connect() {
  const connection = mysql.createPool({
    host: "localhost",
    port: 3306, // Default MySQL port, change if yours is different
    user: "root",
    password: "STANDOUT12345",
    database: "jobme",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  return connection;
}
