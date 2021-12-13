import app from './app';
import database from './database';

database
  .connect()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(() => {
    console.log('Error connecting to database');
    process.exit(1);
  });
