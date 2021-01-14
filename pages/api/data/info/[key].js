const db = require("../../../../db").instance;
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const { key, user } = req.query;
  const { goal, user_id, changed_by } = req.body;
  console.log(key, user, "--------");

  if (req.method === "POST") {
    const insert = await db.one(
      `INSERT INTO info(goal, changed_by, user_id, key) VALUES($1, $2, $3, $4) RETURNING *`,
      [goal, changed_by, user_id, key]
    );

    res.status(201).send({ goal });
  } else {
    try {
      const goals = await db.oneOrNone(
        `SELECT * FROM info WHERE user_id = $1 AND key = $2 ORDER BY id DESC LIMIT 1`,
        [user, key]
      );

      res.status(200).json(goals);
    } catch (error) {
      res
        .status(500)
        .send({ message: ["Error creating on the server"], error: error });
    }
  }
};

export const config = {
  api: {
    bodyParser: true
  }
};
