import db from "../../../db.js";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  if (req.method === "POST") {
    const { key } = req.query;
    const { goal, user_id, changed_by } = req.body;

    if (!goal || !user_id || !changed_by) {
      return res.status(422).send({ error: ["Missing one or more fields"] });
    }

    const insert = await db.one(
      `INSERT INTO ${key}(goal, changed_by, user_id) VALUES($1, $2, $3) RETURNING *`,
      [goal, changed_by, user_id]
    );

    res.status(201).send({ goal });
  } else {
    const { key, user } = req.query;

    try {
      const goals = await db.oneOrNone(
        `SELECT * FROM ${key} WHERE user_id = $1 ORDER BY id DESC LIMIT 1`,
        [user]
      );
      const info = await db.oneOrNone(
        `SELECT * FROM info WHERE user_id = $1 AND key = $2 ORDER BY id DESC LIMIT 1`,
        [user, key]
      );
      res.status(200).json({ ...goals, info });
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
