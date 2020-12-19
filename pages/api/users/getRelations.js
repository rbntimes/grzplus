import db from "../../../db.js";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });

  try {
    const user = await db.one(
      `SELECT * FROM users WHERE email = $1 ORDER BY id DESC LIMIT 1`,
      [session.user?.email]
    );
    const relations = await db.any(`SELECT * FROM users WHERE email != $1`, [
      session.user?.email
    ]);

    const users = await fetch(
      "https://randomuser.me/api/?nat=nl&results=8&seed=grzplus"
    );

    const data = await users.json();
    if (data.results) {
      res.status(200).json({
        user,
        relations: data.results.map((user, index) => ({
          ...relations[index],
          picture: user.picture.large
        }))
      });
    }
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
