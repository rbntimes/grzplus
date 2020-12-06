import db from "../../../db.js";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    console.log("session", session);
  }
  try {
    const user = await db.one(
      `SELECT * FROM users WHERE email = $1 ORDER BY id DESC LIMIT 1`,
      [session.user?.email]
    );

    console.log(user);

    res.status(200).json(user);
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
