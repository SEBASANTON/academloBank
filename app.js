const express = require('express');
const cors = require('cors');

const {usersRouter} = require('./routes/users.routes');
const {transfersRouter} = require('./routes/transfers.routes');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/transfers', transfersRouter);

module.exports = { app };
