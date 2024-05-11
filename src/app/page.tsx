import "./login.css";
import Image from "next/image";
import logo from "./logo.png";
import Link from "next/link";

export default function Login() {
  return (
    <main>
      <section className="section-login">
        <Image className="login-logo" alt="Logo" src={logo} />
        <h2 className="login-slogan">Join our hive!</h2>
        <div className="card">
          <Link className="login-link" href="/api/auth/login">
            <button className="loginlogoutbtn">Login or Sign up</button>
          </Link>
        </div>
      </section>
    </main>
  );
}
