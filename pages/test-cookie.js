import cookie from "cookie";

export function getServerSideProps({ res }) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("testcookie", "random-value", {
      sameSite: "lax",
      httpOnly: true,
      secure: false,
      path: "/",
      maxAge: 24 * 60 * 60
    })
  );

  return {
    redirect: {
      destination: "/test-result",
      permanent: false
    },
    props: {}
  };
}

const Redirect = () => (
  <div className="container">
    <span>redirecting...</span>
    <style jsx>{`
      .container {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `}</style>
  </div>
);

export default Redirect;
