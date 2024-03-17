import dotenv from "dotenv";
import connectDb from "./db/db.js";

dotenv.config({ path: "./env" });


connectDb()

.then(() => {
  app.on("Error", (Error) => {
    console.log(`Error: ${Error} `);
    throw Error;
  });
  app.listen(process.env.PORT || 8000, () => {
    console.log(`serve are running in port ${process.env.PORT || 8000}`);
  });
})
.catch((err) => {
  console.log(`mongo db connection faiiiil ${err}`);
});


