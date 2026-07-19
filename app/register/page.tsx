import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";

export const metadata = {
  title: "Register — Zynex Studio",
};

export default function RegisterPage() {
  return (
    <div className="auth-shell">
      {/* Background Elements */}
      <div className="auth-bg-grid" aria-hidden="true" />
      <div className="auth-glow" aria-hidden="true" />

      {/* Logo */}
      <Link href="/" className="auth-logo">
        <span className="brand-mark">
          <span />
          <span />
        </span>
        ZYNEX STUDIO
      </Link>

      {/* Main Card */}
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-eyebrow">— CREATE ACCOUNT</span>
          <h1>Start building<br />your future.</h1>
          <p>Join our community of creators and builders.</p>
        </div>

        <RegisterForm />

        <p className="auth-footer">
          Already have an account?{" "}
          <Link href="/login">Sign in</Link>
        </p>
      </div>

      {/* Footer Info */}
      <div className="auth-bottom">
        <span>© 2025 ZYNEX STUDIO</span>
        <span>SECURE SIGNUP</span>
      </div>
    </div>
  );
}
