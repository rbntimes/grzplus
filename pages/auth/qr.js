import React from "react";
import QR from "qrcode.react";
import { withRouter } from "next/router";
import Link from "next/link";
import { csrfToken } from "next-auth/client";

export default function SignIn() {
  return (
    <form method="post" action="/api/auth/signin/email">
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        Email address
        <input type="text" id="email" name="email" />
      </label>
      <QR
        value={`${process.env.NEXT_PUBLIC_URL}/auth/robinvanleeuwen1995@hotmail.com`}
      />
      <button type="submit">Sign in with Email</button>
    </form>
  );
}
