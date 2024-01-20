import { app } from "./app.js";
import { connectDb } from "./database/database.js";

connectDb();

app.listen(process.env.PORT, () => {
  console.log(
    `server is Running at port:${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
