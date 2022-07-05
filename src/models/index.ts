import mongoose from "mongoose";
import config from "../config/config";

/** Connect to Mongo */
const connect = (): void => {
    mongoose
        .connect(config.mongo.url, {
            ignoreUndefined: true
        })
        .then((result) => {
            console.log('Mongo Connected');
        })
        .catch((err) => {
            console.log(err);
        });
};

mongoose.connection.on("error", (err): void => {
    console.log("mongoDB connection error", err);
});

export { connect };



