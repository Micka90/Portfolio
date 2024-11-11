import "./login.css";

function Login() {
  return (
    <section>
      <form className="logininput">
        <input className="inputlogin" type="email" />
        <input className="inputlogin" type="password" />
        <button type="submit">Login</button>
      </form>
    </section>
  );
}

export default Login;
