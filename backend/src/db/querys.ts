export const createCreditsTable: string = `CREATE TABLE IF NOT EXISTS credits (
        id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
        name VARCHAR(255) NOT NULL,
        amount INT NOT NULL,
        term VARCHAR(255),
        interest_rate INT NOT NULL,
        monthly_income INT NOT NULL,
        status VARCHAR(10),
        user_id INT,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )`;

export const createUsersTable: string = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
  )`;

export const postCreditQuery = 
  `INSERT INTO credits (name, amount, term, interest_rate, monthly_income, status, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)`

export const getCreditByIdQuery = (creditId: string) => {
  return `SELECT * FROM credits WHERE id = ${creditId}`
} 

export const getCreditsQuery = `SELECT * FROM credits`
