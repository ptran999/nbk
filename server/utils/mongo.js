/**
 * Title: mongo.js
 * Author: Phuong Tran
 * Date: 6/3/2024
 * Description: Mongo utilities to connect to the database.
 */

"use strict";

// Imports
const { MongoClient } = require("mongodb");

const MONGO_URL =  "mongodb+srv://nodebucket_user:s3cret@bellevueuniversity.bj68fz9.mongodb.net/?retryWrites=true&w=majority&appName=BellevueUniversity";
// Connecting to the database
const mongo = async (operations, next) => {
  try {
    console.log("Connecting to database");
    const client = await MongoClient.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const db = client.db("nodebucket323");
    console.log("Connected to database");

    await operations(db);
    console.log("Operations completed");

    client.close();
    console.log("Database connection closed");

  } catch (err) {
    const error = new Error("Database connection failed", err);
    error.status = 500;
    console.error("Database connection failed", err);
    next(error);
  }
}

module.exports = { mongo };