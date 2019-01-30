import * as mongoose from "mongoose";
import *  as config from  "config";

mongoose.connect(config.get('MONGO.URI'), { useNewUrlParser: true})

export {  mongoose }
