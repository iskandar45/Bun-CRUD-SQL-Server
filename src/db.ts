import sql from "mssql";

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER || "localhost",
  database: process.env.DB_NAME,
  options: {
    trustServerCertificate: true,
  },
};

const connectWithRetry = async (retries = 10, delay = 5000): Promise<sql.ConnectionPool> => {
  for (let i = 1; i <= retries; i++) {
    try {
      const pool = await new sql.ConnectionPool(dbConfig).connect();
      console.log("✅ Connected to SQL Server");
      return pool;
    } catch (err) {
      console.log(`⚠️  Attempt ${i}/${retries} - Database not ready yet, retrying in ${delay / 1000}s...`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error("❌ Could not connect to SQL Server after several attempts");
};

export const pool = connectWithRetry();
