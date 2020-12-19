import React, { useEffect } from "react";
import QR from "qrcode.react";
import { csrfToken, signIn } from "next-auth/client";
import { useRouter } from "next/router";

export default function SignIn({ csrfToken }) {
  const router = useRouter();
  useEffect(() => {
    signIn("credentials", {
      id: router.query.userId,
      callbackUrl: `/`
    });
  }, []);

  return <span>loading</span>;
}

// export default function SignIn({ csrfToken }) {
//   return (
//     <form method="post" action="/api/auth/callback/credentials">
//       <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
//       <QR value="http://facebook.github.io/react/" />
//       <input name="qr" type="hidden" defaultValue={csrfToken} />
//
//       <label>
//         Username
//         <input name="username" type="text" />
//       </label>
//       <label>
//         Password
//         <input name="password" type="text" />
//       </label>
//       <button type="submit">Sign in</button>
//     </form>
//   );
// }
