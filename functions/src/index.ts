import * as functions from "firebase-functions";
import * as express from "express";
const cors = require("cors");

import { db } from "./init";

const app = express();
app.use(cors({ origin: true }));

app.get("/courses", async (request, response) => {
  const snaps = await db.collection("courses").get();

  const courses: any[] = [];

  snaps.forEach((snap) => courses.push(snap.data()));

  response.status(200).json({ courses });
});

export const getCourses = functions.https.onRequest(app);