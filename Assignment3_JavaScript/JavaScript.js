const mysql = require('mysql');

const createDatabaseSchema = () => {
  // Create a connection to the MySQL database
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'username',
    password: 'password',
    multipleStatements: true
  });

  // SQL statements to create the database and tables
  const createSchemaSQL = `
    CREATE DATABASE IF NOT EXISTS my_database;
    USE my_database;

    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      email VARCHAR(100) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NOT NULL UNIQUE,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS product_categories (
      product_id INT NOT NULL,
      category_id INT NOT NULL,
      PRIMARY KEY (product_id, category_id),
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
    );
  `;

  // Connect to the database and execute the SQL statements
  connection.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
    connection.query(createSchemaSQL, (err, results) => {
      if (err) throw err;
      console.log('Database schema created successfully');
      connection.end();
    });
  });
};

// Execute the function to create the database schema
createDatabaseSchema();

