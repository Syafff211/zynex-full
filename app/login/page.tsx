import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export const metadata = {
  title: "Login — Zynex Studio",
};

export default function LoginPage() {
  return (
    <div className="auth-shell">
      <div className="auth-bg-grid" aria-hidden="true" />
      <div className="auth-glow" aria-hidden="true" />

      <Link href="/" className="auth-logo">
        <span className="brand-mark">
          <span />
          <span />
        </span>
        ZYNEX STUDIO
      </Link>

      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-eyebrow">— WELCOME BACK</span>
          <h1>
            Sign in to
            <br />
            your account
          </h1>
          <p>Access your dashboard, projects, and analytics.</p>
        </div>

        <LoginForm />

        <p className="auth-footer">
          Need access?{" "}
          <a href="mailto:hello@zynex.studio">Contact studio</a>
        </p>
      </div>

      <div className="auth-bottom">
        <span>© 2025 ZYNEX STUDIO</span>
        <span>SECURE LOGIN</span>
      </div>
    </div>
  );
}