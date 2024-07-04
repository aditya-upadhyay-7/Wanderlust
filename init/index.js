const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

main().then(() => {
    console.log("Connected to MongoDB");
    initDB().then(() => {
        console.log("Data was initialized");
    }).catch((err) => {
        console.error("Error initializing data:", err);
    });
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

async function main() {
    try {
        await mongoose.connect(MONGO_URL);
    } catch (err) {
        throw new Error("Failed to connect to MongoDB");
    }
}

async function initDB() {
    try {
        await Listing.deleteMany({});
        initData.data = initData.data.map((obj) => ({...obj, owner: "66740cfb374d86068c093305" }));
        await Listing.insertMany(initData.data);
        console.log("LOL!")
    } catch (err) {
        throw new Error("Failed to initialize data in the database");
    }
}
