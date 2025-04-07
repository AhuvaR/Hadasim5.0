const express = require("express");
const cors = require("cors");
const app = express();
const productRoute=require('./routes/productRoute')
const supplierRoute=require('./routes/supplierRoute')
const orderRoute=require('./routes/orderRoute')

app.use(cors());
app.use(express.json());

// app.get("/message", (req, res) => {
//   res.json({ message: "Hello from server!" });
// });

// app.get("/api", (req, res) => {
//   res.json({ api: "Oh!!! yes" });
// });
app.use("/products", productRoute);
app.use("/login", supplierRoute);
app.use("/orders", orderRoute)

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});