const mysql = require('mysql2/promise');

exports.handler = async (event, context) => {
  try {
    const { id, title, author, isbn, published_year, genre } = JSON.parse(event.body);

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    const sql = 'UPDATE safkc SET title = ?, author = ?, isbn = ?, published_year = ?, genre = ? WHERE id = ?';
    await connection.execute(sql, [title, author, isbn, published_year, genre, id]);
    await connection.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Book updated successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to update book." }),
    };
  }
};
