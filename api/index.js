
const express = require("express")
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

dotenv.config();

/* Creating a REST API (Some Endpoints) */
// app.get("/api/test", ()=> {
//     console.log("test is successful");
// }); 

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);   // whenever we go to "/api/users" our application will use userRoute 
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("Connection Successful")).catch((err)=> {console.log(err)});

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend Server listening on port 5000");
});