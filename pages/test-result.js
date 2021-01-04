import cookie from "cookie";

export function getServerSideProps({ req, res }) {
  const { testcookie } = cookie.parse(req.headers.cookie || "");

  // Reset cookie for further testing
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("testcookie", "", {
      sameSite: "lax",
      httpOnly: true,
      secure: false,
      path: "/",
      maxAge: -1
    })
  );

  return {
    props: {
      success: Boolean(testcookie)
    }
  };
}

const Result = ({ success }) => (
  <div className="container">
    <h2>{success ? "Succes!" : "Error: geen cookie gezet!"}</h2>
    <span>
      Cookie is weer verwijderd.{" "}
      <a className="link" href="/test-cookie">
        Nogmaals testen
      </a>
    </span>

    <style jsx>{`
      .container {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      .link {
        color: blue;
        text-decoration: underline;
      }
    `}</style>
  </div>
);

export default Result;
