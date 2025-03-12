const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

const AUTH_ADDRESS = process.env.AUTH_ADDRESS
const PORT_NUMBER = process.env.PORT_NUMBER
const AUTH_SERVICE_SERVICE_HOST = process.env.AUTH_SERVICE_SERVICE_HOST

app.use(bodyParser.json());

app.post('/signup', async (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  if (
    !password ||
    password.trim().length === 0 ||
    !email ||
    email.trim().length === 0
  ) {
    return res
      .status(422)
      .json({ message: 'An email and password needs to be specified!' });
  }

  try {
    const hashedPW = await axios.get(`http://${AUTH_ADDRESS}:${PORT_NUMBER}/hashed-password/${password}`);

    console.log(hashedPW, email);

    return res.status(201).json(
      {
        message: 'User created!',
        host: AUTH_SERVICE_SERVICE_HOST,
        auth: AUTH_ADDRESS,
        port: PORT_NUMBER
      });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'User Creation failed...try later', actualError: err.message });
  }
});

app.post('/login', async (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  if (
    !password ||
    password.trim().length === 0 ||
    !email ||
    email.trim().length === 0
  ) {
    return res
      .status(422)
      .json({ message: 'An email and password needs to be specified!' });
  }

  const hashedPassword = password + '_hash';
  const response = await axios.get(
    `http://${AUTH_ADDRESS}:${PORT_NUMBER}/token/${hashedPassword}/${password}`);
  //const response = { status: 200, data: { token: 'abc' } }
  if (response.status === 200) {
    return res.status(200).json(
      {
        token: response.data.token,
        auth: AUTH_ADDRESS,
        host: AUTH_SERVICE_SERVICE_HOST,
        port: PORT_NUMBER
      });
  }
  return res.status(response.status).json({ message: 'Logging in failed!' });
});

app.listen(3001);
