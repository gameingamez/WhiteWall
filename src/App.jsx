import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function GoogleSignIn({ onConnect, onError, onClearError }) {
  const login = useGoogleLogin({
    scope:
      "openid email profile https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.coursework.me.readonly",
    onSuccess: onConnect,
    onError,
  });

  return (
    <button
      className="button button-primary"
      onClick={() => {
        onClearError();
        login();
      }}
    >
      <GoogleMark />
      Connect Google Classroom
      <span className="button-arrow" aria-hidden="true">
        ↗
      </span>
    </button>
  );
}

function GoogleMark() {
  return (
    <svg
      className="google-mark"
      viewBox="0 0 48 48"
      role="img"
      aria-label="Google"
    >
      <path
        fill="#4285F4"
        d="M43.6 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.7c3.9-3.6 6-8.8 6-15.3Z"
      />
      <path
        fill="#34A853"
        d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.7-5.1c-1.8 1.2-4 1.9-6.8 1.9-5.2 0-9.6-3.5-11.2-8.2H5.9v5.3A20 20 0 0 0 24 44Z"
      />
      <path
        fill="#FBBC05"
        d="M12.8 27.8a12 12 0 0 1 0-7.6v-5.3H5.9a20 20 0 0 0 0 18.2l6.9-5.3Z"
      />
      <path
        fill="#EA4335"
        d="M24 12c3 0 5.7 1 7.8 3.1l5.9-5.9C34.1 5.8 29.5 4 24 4A20 20 0 0 0 5.9 14.9l6.9 5.3C14.4 15.5 18.8 12 24 12Z"
      />
    </svg>
  );
}

function App() {
  const [connected, setConnected] = useState(false);
  const [loginError, setLoginError] = useState("");

  function connectGoogle() {
    if (!clientId) return null;

    return (
      <GoogleSignIn
        onConnect={() => {
          setConnected(true);
          setLoginError("");
        }}
        onError={() => setLoginError("Google sign-in didn’t complete. Please try again.")}
        onClearError={() => setLoginError("")}
      />
    );
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="WhiteWall home">
          <img className="brand-logo" src="/whitewall-logo.svg" alt="" />
        </a>
        <span className="topbar-note">
          <span className="status-dot" />
          Your student space
        </span>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="eyebrow-line" />
            A little more room to breathe
          </span>
          <h1 id="hero-title">
            Clear your mind.
            <br />
            <span>Clear your wall.</span>
          </h1>
          <p className="hero-description">
            Every assignment, in one calm place. Connect Google Classroom and
            see what needs your attention—without the overwhelm.
          </p>
          <div className="connect-area">
            {connected ? (
              <div className="connected-message" role="status">
                <span className="connected-check">✓</span>
                Google Classroom connected
              </div>
            ) : clientId ? (
              connectGoogle()
            ) : (
              <button
                className="button button-primary"
                onClick={() =>
                  document
                    .getElementById("setup-note")
                    ?.scrollIntoView({ behavior: "smooth", block: "center" })
                }
              >
                <GoogleMark />
                Connect Google Classroom
                <span className="button-arrow" aria-hidden="true">
                  ↗
                </span>
              </button>
            )}
            {loginError && (
              <p className="login-error" role="alert">
                {loginError}
              </p>
            )}
            <p className="connect-caption">
              {connected
                ? "You’re all set to make room for what’s next."
                : "Your classes stay yours. We’ll only read your assignments."}
            </p>
          </div>
        </div>

        <div className="wall-card" aria-label="A preview of your assignment wall">
          <div className="wall-card-top">
            <div>
              <span className="wall-label">YOUR WALL</span>
              <p className="wall-heading">
                {connected ? "A fresh start." : "Looking pretty clear."}
              </p>
            </div>
            <span className="wall-count">0 due</span>
          </div>
          <div className="wall-canvas">
            <div className="wall-glow" />
            <div className="wall-sun" />
            <div className="wall-plant">
              <span />
              <span />
              <span />
              <span />
              <i />
            </div>
            <div className="wall-note">
              <span className="wall-note-spark">✳</span>
              <span>Your next big thing<br />starts with a clear wall.</span>
            </div>
            <div className="wall-floor" />
          </div>
          <div className="wall-card-bottom">
            <span className="wall-bottom-dot" />
            {connected ? "Ready when you are" : "Your assignments will live here"}
          </div>
        </div>
      </section>

      <section className="steps" aria-label="How WhiteWall works">
        <div className="step">
          <span className="step-number">01</span>
          <div>
            <h2>Bring your classes</h2>
            <p>Connect your Google Classroom in a moment.</p>
          </div>
        </div>
        <span className="step-divider" aria-hidden="true" />
        <div className="step">
          <span className="step-number">02</span>
          <div>
            <h2>See what’s due</h2>
            <p>Keep upcoming work where you can see it.</p>
          </div>
        </div>
        <span className="step-divider" aria-hidden="true" />
        <div className="step">
          <span className="step-number">03</span>
          <div>
            <h2>Make it all white</h2>
            <p>One finished task at a time. You’ve got this.</p>
          </div>
        </div>
      </section>

      {!clientId && (
        <p className="setup-note" id="setup-note">
          Google sign-in is ready to set up. Copy <code>.env.example</code> to{" "}
          <code>.env</code> and add your <code>VITE_GOOGLE_CLIENT_ID</code>.
        </p>
      )}

      <footer className="footer">
        <span>Made for the days you have a lot on your mind.</span>
        <span>One thing at a time <span className="footer-heart">♥</span></span>
      </footer>
    </main>
  );
}

export default App;
