require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./db/dbConnect");

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

const app = express();

// connect to mongodb
dbConnect();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("hello");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}
app.listen(port, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
