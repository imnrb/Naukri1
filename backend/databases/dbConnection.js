import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "MERN_STACK_JOB_SEEKING", // Corrected the property name to dbName
    }).then(() => {
        console.log("Connected to database");
    }).catch((err) => {
        console.error("Some error occurred while connecting to db", err); // Changed console.log to console.error for errors
    });
};
