const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
  user: 'myuser',
  host: 'postgres-service',
  database: 'mydatabase',
  password: 'mypassword',
  port: 5432,
});

app.use(bodyParser.json());
app.use(cors());

app.get('/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    const users = result.rows;
    res.send(`
      <html>
        <body>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Date of Birth</th>
                <th>Phone Number</th>
                <th>Hobby</th>
              </tr>
            </thead>
            <tbody>
              ${users.map(user => `
                <tr>
                  <td>${user.id}</td>
                  <td>${user.first_name}</td>
                  <td>${user.last_name}</td>
                  <td>${user.email}</td>
                  <td>${user.date_of_birth}</td>
                  <td>${user.phone_number}</td>
                  <td>${user.hobby}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});


app.post('/data', (req, res) => {
  const { firstName, lastName, email, dob, phone, hobby } = req.body;

  const query = {
    text: 'INSERT INTO users (first_name, last_name, email, dob, phone, hobby) VALUES ($1, $2, $3, $4, $5, $6)',
    values: [firstName, lastName, email, dob, phone, hobby],
  };

  pool.query(query, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error inserting data into database');
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(3000, () => {
  console.log('Express microservice listening on port 3000');
});
