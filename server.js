const { app } = require('./app');

const { db } = require('./utils/database');

db.authenticate()
  .then(() => console.log('Database succeful'))
  .catch(err => console.log(err));

db.sync(/* { force: true } */)
  .then(() => console.log('Database synced'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Express app runing on port: ${PORT} `);
});
