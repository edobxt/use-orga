import mysql from "mysql2/promise";

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT || "8889"),
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	waitForConnections: true,
	connectionLimit: 10,
	maxIdle: 10,
	idleTimeout: 60000,
	queueLimit: 0,
});

export async function executeQuery<T>({ query, values }: { query: string; values?: unknown[] }): Promise<T> {
	const connection = await pool.getConnection();
	try {
		const [results] = await connection.execute(query, values);
		return results as T;
	} catch (error) {
		throw new Error(`Erreur de base de données : ${error}`);
	} finally {
		connection.release();
	}
}
