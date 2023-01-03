import fs from "fs";
import path from "path";

import { connectDatabase, insertDocument } from "../../helpers/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    let client;

    try {
      const client = await connectDatabase();
      try {
        await insertDocument(client, "newsletter", { email: email });
        client.close();
      } catch (error) {
        res.status(500).json({ message: "Connecting to the Database failed!" });
        return;
      }
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
    }

    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
