const express = require("express");
const cors = require("cors");
const app = express();
const productRoute=require('./routes/productRoute')
const supplierRoute=require('./routes/supplierRoute')
const orderRoute=require('./routes/orderRoute')
//const session=require('express-session')


app.use(cors());
app.use(express.json());

// app.use(session({
//   secret:'the-key',
//   resave:false,
//   saveUninitialized:false
// }))


app.use("/products", productRoute);
app.use("/suppliers", supplierRoute);
app.use("/orders", orderRoute);

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});