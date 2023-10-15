const app = require("./index")
const connectDB = require("./src/database/database")
require("dotenv").config()
const port = process.env.PORT

app.listen(port,async ()=>{
    console.log(`Server run successfully at http://localhost:${port}`);
    await connectDB()
})