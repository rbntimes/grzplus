const db = require("../../../../db").instance;
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const { key, user } = req.query;

  try {
    const goals = await db.any(`SELECT * FROM ${key} WHERE user_id = $1`, [
      user
    ]);
    res.status(200).json(goals);
  } catch (error) {
    res
      .status(500)
      .send({ message: ["Error creating on the server"], error: error });
  }
};

export const config = {
  api: {
    bodyParser: true
  }
};
