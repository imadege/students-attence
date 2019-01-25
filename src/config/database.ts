import * as mongoose from "mongoose";

require('dotenv').config()

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true})

export {  mongoose }
