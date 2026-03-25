import { useState } from "react";
import { Head, Link, useForm } from '@inertiajs/react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .amu-root {
    font-family: 'DM Sans', sans-serif;
    background: #0a0a0f;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .amu-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    max-width: 980px;
    min-height: 620px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 50px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06);
  }

  .panel-left {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.6rem;
    overflow: hidden;
    min-height: 500px;
    background: #0d1117;
  }

  .left-top {
    position: relative;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .amu-logo {
    font-family: 'Syne', sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.08em;
  }

  .back-link {
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.73rem;
    padding: 0.42rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
  }

  .back-link:hover { background: rgba(255,255,255,0.15); }

  .left-illustration {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .left-bottom {
    position: relative;
    z-index: 5;
  }

  .left-tagline {
    font-family: 'Syne', sans-serif;
    font-size: 1.45rem;
    font-weight: 600;
    color: #fff;
    line-height: 1.35;
    margin-bottom: 0.5rem;
  }

  .left-sub {
    font-size: 0.78rem;
    color: rgba(255,255,255,0.45);
    line-height: 1.6;
  }

  .panel-right {
    background: #0f1520;
    padding: 2.5rem 2.8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .form-title {
    font-family: 'Syne', sans-serif;
    font-size: 2rem;
    font-weight: 600;
    color: #f0e6c8;
    margin-bottom: 0.4rem;
    letter-spacing: -0.02em;
  }

  .form-sub {
    font-size: 0.8rem;
    color: #5a6478;
    margin-bottom: 1.8rem;
  }

  .form-sub a { color: #a78bfa; text-decoration: none; transition: color 0.2s; }
  .form-sub a:hover { color: #c4b5fd; }

  .field {
    position: relative;
    margin-bottom: 0.7rem;
  }

  .field input {
    width: 100%;
    background: #161e2e;
    border: 1px solid #1e2d45;
    border-radius: 9px;
    padding: 0.76rem 1rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.84rem;
    color: #e8eaf0;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }

  .field input::placeholder { color: #3d4f68; }

  .field input:focus {
    border-color: #7c3aed;
    background: #1a2438;
    box-shadow: 0 0 0 3px rgba(124,58,237,0.12);
  }

  .field input.input-error {
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239,68,68,0.12);
  }

  .field-error {
    font-size: 0.72rem;
    color: #f87171;
    margin-top: 0.3rem;
    padding-left: 0.2rem;
  }

  .eye-btn {
    position: absolute;
    right: 0.9rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #3d4f68;
    background: none;
    border: none;
    display: flex;
    align-items: center;
    padding: 0;
    transition: color 0.2s;
  }

  .eye-btn:hover { color: #7c3aed; }

  .btn-main {
    width: 100%;
    background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
    color: #fff;
    border: none;
    border-radius: 9px;
    padding: 0.85rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
    margin-top: 0.6rem;
    margin-bottom: 1.25rem;
    letter-spacing: 0.02em;
    box-shadow: 0 4px 20px rgba(124,58,237,0.3);
  }

  .btn-main:hover:not(:disabled) { opacity: 0.92; box-shadow: 0 6px 28px rgba(124,58,237,0.45); }
  .btn-main:active:not(:disabled) { transform: scale(0.99); }
  .btn-main:disabled { opacity: 0.55; cursor: not-allowed; }

  .divider { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.1rem; }
  .divider-line { flex: 1; height: 1px; background: #1e2d45; }
  .divider-text { font-size: 0.7rem; color: #3d4f68; white-space: nowrap; letter-spacing: 0.05em; }

  .social-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.7rem; }

  .social-btn {
    background: #161e2e;
    border: 1px solid #1e2d45;
    border-radius: 9px;
    padding: 0.72rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    color: #8899b0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.55rem;
    transition: background 0.2s, border-color 0.2s, color 0.2s;
  }

  .social-btn:hover { background: #1a2438; border-color: #2a3a55; color: #c8d5e8; }

  @media (max-width: 680px) {
    .amu-card { grid-template-columns: 1fr; }
    .panel-left { min-height: 260px; }
    .panel-right { padding: 2rem 1.5rem; }
  }
`;

/* ─── Same E-commerce SVG Illustration as Login ─── */
const EcommerceIllustration = () => (
    <svg
        className="left-illustration"
        viewBox="0 0 490 620"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
    >
        {/* Background */}
        <rect width="490" height="620" fill="#0d1117"/>

        {/* Grid dots */}
        {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 6 }).map((_, col) => (
                <circle
                    key={`dot-${row}-${col}`}
                    cx={40 + col * 70}
                    cy={40 + row * 78}
                    r="1.5"
                    fill="#1e2d45"
                />
            ))
        )}

        {/* Glow orb top-right */}
        <circle cx="400" cy="80" r="120" fill="#3b1d6e" opacity="0.35"/>
        <circle cx="400" cy="80" r="70" fill="#5b21b6" opacity="0.2"/>

        {/* Glow orb bottom-left */}
        <circle cx="60" cy="520" r="100" fill="#1d3a6e" opacity="0.3"/>

        {/* ── Shopping bag ── */}
        <g transform="translate(145, 130)">
            <rect x="0" y="40" width="120" height="110" rx="10" fill="#1e2d45" stroke="#2a3a55" strokeWidth="1"/>
            <path d="M35 40 Q35 10 60 10 Q85 10 85 40" fill="none" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round"/>
            <rect x="10" y="50" width="30" height="4" rx="2" fill="#2a3a55"/>
            <circle cx="95" cy="55" r="14" fill="#7c3aed"/>
            <text x="95" y="60" textAnchor="middle" fill="#fff" fontSize="13" fontFamily="sans-serif">★</text>
            <rect x="18" y="90" width="84" height="28" rx="6" fill="#161e2e" stroke="#2a3a55" strokeWidth="1"/>
            <text x="60" y="109" textAnchor="middle" fill="#a78bfa" fontSize="13" fontFamily="sans-serif" fontWeight="600">$49.99</text>
        </g>

        {/* ── Product card 1 ── */}
        <g transform="translate(30, 300)">
            <rect width="130" height="160" rx="12" fill="#161e2e" stroke="#1e2d45" strokeWidth="1"/>
            <rect x="10" y="10" width="110" height="85" rx="8" fill="#1a2438"/>
            <circle cx="55" cy="52" r="28" fill="#2a3a55"/>
            <circle cx="55" cy="52" r="18" fill="#3d4f68"/>
            <circle cx="55" cy="52" r="9" fill="#7c3aed" opacity="0.8"/>
            <rect x="78" y="14" width="36" height="16" rx="4" fill="#7c3aed"/>
            <text x="96" y="26" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="sans-serif">NEW</text>
            <rect x="10" y="105" width="70" height="7" rx="3" fill="#2a3a55"/>
            <rect x="10" y="118" width="50" height="7" rx="3" fill="#1e2d45"/>
            <text x="12" y="148" fill="#a78bfa" fontSize="13" fontFamily="sans-serif" fontWeight="600">$24.00</text>
            <rect x="88" y="134" width="30" height="22" rx="6" fill="#7c3aed"/>
            <text x="103" y="149" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="sans-serif">+</text>
        </g>

        {/* ── Product card 2 ── */}
        <g transform="translate(180, 300)">
            <rect width="130" height="160" rx="12" fill="#161e2e" stroke="#1e2d45" strokeWidth="1"/>
            <rect x="10" y="10" width="110" height="85" rx="8" fill="#1a2438"/>
            <rect x="25" y="25" width="60" height="55" rx="8" fill="#2a3a55"/>
            <rect x="35" y="35" width="40" height="35" rx="5" fill="#3d4f68"/>
            <rect x="45" y="45" width="20" height="15" rx="3" fill="#5b21b6"/>
            <rect x="10" y="14" width="38" height="16" rx="4" fill="#ef4444"/>
            <text x="29" y="26" textAnchor="middle" fill="#fff" fontSize="9" fontFamily="sans-serif">−20%</text>
            <rect x="10" y="105" width="80" height="7" rx="3" fill="#2a3a55"/>
            <rect x="10" y="118" width="55" height="7" rx="3" fill="#1e2d45"/>
            <text x="12" y="148" fill="#a78bfa" fontSize="13" fontFamily="sans-serif" fontWeight="600">$19.20</text>
            <rect x="88" y="134" width="30" height="22" rx="6" fill="#7c3aed"/>
            <text x="103" y="149" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="sans-serif">+</text>
        </g>

        {/* ── Cart notification pill ── */}
        <g transform="translate(310, 170)">
            <rect width="140" height="48" rx="24" fill="#161e2e" stroke="#2a3a55" strokeWidth="1"/>
            <circle cx="28" cy="24" r="14" fill="#7c3aed" opacity="0.2"/>
            <text x="28" y="29" textAnchor="middle" fill="#a78bfa" fontSize="16" fontFamily="sans-serif">🛒</text>
            <rect x="48" y="14" width="60" height="7" rx="3" fill="#2a3a55"/>
            <rect x="48" y="27" width="40" height="6" rx="3" fill="#1e2d45"/>
            <circle cx="122" cy="18" r="8" fill="#7c3aed"/>
            <text x="122" y="22" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="sans-serif">3</text>
        </g>

        {/* ── Rating stars row ── */}
        <g transform="translate(310, 240)">
            <rect width="140" height="40" rx="10" fill="#161e2e" stroke="#1e2d45" strokeWidth="1"/>
            <text x="16" y="26" fill="#f59e0b" fontSize="13" fontFamily="sans-serif">★★★★★</text>
            <text x="100" y="26" fill="#3d4f68" fontSize="11" fontFamily="sans-serif">(248)</text>
        </g>

        {/* ── Delivery badge ── */}
        <g transform="translate(310, 300)">
            <rect width="140" height="54" rx="10" fill="#0d2218" stroke="#1a4a30" strokeWidth="1"/>
            <text x="16" y="24" fill="#4ade80" fontSize="11" fontFamily="sans-serif">Free delivery</text>
            <rect x="16" y="30" width="90" height="5" rx="2" fill="#1a4a30"/>
            <rect x="16" y="30" width="65" height="5" rx="2" fill="#22c55e" opacity="0.6"/>
            <text x="113" y="38" fill="#4ade80" fontSize="10" fontFamily="sans-serif">72%</text>
        </g>

        {/* ── Connecting lines (decorative) ── */}
        <line x1="205" y1="250" x2="310" y2="192" stroke="#2a3a55" strokeWidth="1" strokeDasharray="4 4"/>
        <line x1="280" y1="380" x2="310" y2="320" stroke="#2a3a55" strokeWidth="1" strokeDasharray="4 4"/>

        {/* ── Bottom tagline ── */}
        <text x="245" y="510" textAnchor="middle" fill="#ffffff" fontSize="18" fontFamily="Syne, sans-serif" fontWeight="600">Shop smarter.</text>
        <text x="245" y="534" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="12" fontFamily="sans-serif">Thousands of products, one account.</text>
    </svg>
);

/* ─── Icons ─── */
const EyeOpen = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
);

const EyeOff = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
);

const GoogleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
);

const AppleIcon = () => (
    <svg width="14" height="16" viewBox="0 0 814 1000" fill="#8899b0">
        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105-57.9-155.5-127.4C46 790.8 0 663.4 0 541.3 0 341.8 131.7 235.5 261.1 235.5c67.9 0 124.9 44.5 167.3 44.5 40.8 0 106.2-47.4 186.8-47.4 30.1 0 108.2 2.6 168.6 79.1zm-56.1-184.7c-25.6 30.8-69.3 54.5-112.1 54.5-1.3 0-2.6 0-3.9-.1 0-1.5-.1-3-.1-4.6 0-33.3 14.8-68.5 41-93.4 26.3-25 68.8-43.6 109.6-46.4 1.3 1.5 1.3 3 1.3 4.5 0 32.2-12.9 67.5-35.8 85.5z"/>
    </svg>
);

export default function Register() {
    const [showPwd, setShowPwd] = useState(false);
    const [showConfirmPwd, setShowConfirmPwd] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <style>{styles}</style>
            <Head title="Register" />

            <div className="amu-root">
                <div className="amu-card">

                    {/* ── LEFT PANEL ── */}
                    <div className="panel-left">
                        <EcommerceIllustration />

                        <div className="left-top">
                            <div className="amu-logo">UniStore</div>
                            <a href="/" className="back-link">Back to Website →</a>
                        </div>

                        <div className="left-bottom">
                            <div className="left-tagline">Join us today,<br/>shop smarter.</div>
                            <p className="left-sub">Thousands of products.<br/>One seamless experience.</p>
                        </div>
                    </div>

                    {/* ── RIGHT PANEL ── */}
                    <div className="panel-right">
                        <h1 className="form-title">Create account</h1>
                        <p className="form-sub">
                            Already have an account? <Link href={route('login')}>Log in</Link>
                        </p>

                        <form onSubmit={submit}>
                            {/* Name */}
                            <div className="field">
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Full name"
                                    value={data.name}
                                    autoComplete="name"
                                    autoFocus
                                    className={errors.name ? 'input-error' : ''}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <p className="field-error">{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div className="field">
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="E-mail"
                                    value={data.email}
                                    autoComplete="username"
                                    className={errors.email ? 'input-error' : ''}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                {errors.email && <p className="field-error">{errors.email}</p>}
                            </div>

                            {/* Password */}
                            <div className="field">
                                <input
                                    id="password"
                                    type={showPwd ? "text" : "password"}
                                    placeholder="Password"
                                    value={data.password}
                                    autoComplete="new-password"
                                    className={errors.password ? 'input-error' : ''}
                                    style={{ paddingRight: "2.8rem" }}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <button type="button" className="eye-btn" onClick={() => setShowPwd(!showPwd)}>
                                    {showPwd ? <EyeOff /> : <EyeOpen />}
                                </button>
                                {errors.password && <p className="field-error">{errors.password}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div className="field">
                                <input
                                    id="password_confirmation"
                                    type={showConfirmPwd ? "text" : "password"}
                                    placeholder="Confirm password"
                                    value={data.password_confirmation}
                                    autoComplete="new-password"
                                    className={errors.password_confirmation ? 'input-error' : ''}
                                    style={{ paddingRight: "2.8rem" }}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                                <button type="button" className="eye-btn" onClick={() => setShowConfirmPwd(!showConfirmPwd)}>
                                    {showConfirmPwd ? <EyeOff /> : <EyeOpen />}
                                </button>
                                {errors.password_confirmation && <p className="field-error">{errors.password_confirmation}</p>}
                            </div>

                            <button type="submit" className="btn-main" disabled={processing}>
                                {processing ? 'Creating account…' : 'Create account'}
                            </button>

                            <div className="divider">
                                <div className="divider-line" />
                                <span className="divider-text">Or register with</span>
                                <div className="divider-line" />
                            </div>

                            <div className="social-row">
                                <button type="button" className="social-btn"><GoogleIcon /> Google</button>
                                <button type="button" className="social-btn"><AppleIcon /> Apple</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
}
