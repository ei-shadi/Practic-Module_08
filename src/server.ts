import { initDB } from "./db"
import app from "./app";
import config from "./config";


const main = () => {

  // DB Connection
  initDB();

  // Server Activation
  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
};


main();