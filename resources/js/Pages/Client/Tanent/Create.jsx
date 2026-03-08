import { useState } from "react";
import { usePage, router } from "@inertiajs/react";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
    <path fill="#FBBC05" d="M3.964 10.706c-.18-.54-.282-1.117-.282-1.706s.102-1.166.282-1.706V4.962H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.038l3.007-2.332z"/>
    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.962L3.964 6.294C4.672 4.169 6.656 3.58 9 3.58z"/>
  </svg>
);

const COUNTRIES = ["Morocco", "United States", "United Kingdom", "France", "Germany", "UAE", "Saudi Arabia", "Canada", "Australia"];
const CURRENCIES = ["MAD - Moroccan Dirham", "USD - US Dollar", "EUR - Euro", "GBP - British Pound", "AED - UAE Dirham", "SAR - Saudi Riyal"];
const LANGUAGES = ["Arabic", "English", "French", "Spanish", "German", "Portuguese"];

export default function CreateStore() {
  const { auth } = usePage().props;
  const [step, setStep] = useState(1);
  const [animClass, setAnimClass] = useState("slide-in");
  const [showModal, setShowModal] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    country: "", currency: "", language: "",
  });

  const update = (key, val) => setForm({ ...form, [key]: val });

  const goNext = () => {
    setAnimClass("slide-in");
    setStep(2);
  };

  const goBack = () => {
    setAnimClass("slide-back");
    setStep(1);
  };

  const step1Ready = form.name && form.email && form.phone;
  const step2Ready = form.country && form.currency && form.language;

  const handleSubmit = () => {
    if (!auth?.user) { setShowModal(true); return; }
    router.post("/stores", form);
  };

  return (
      <div className="page">
        <div className="bg-grid" />
        <div className="bg-glow" />

        <nav>
          <div className="logo">UniStore</div>
          {!auth?.user
            ? <button className="nav-login" onClick={() => setShowModal(true)}>Sign in</button>
            : <button className="nav-login">Dashboard</button>
          }
        </nav>

        <div className="content">
          <div className="form-wrapper">

            {/* STEP INDICATOR */}
            <div className="steps">
              <div className="step-item">
                <div className={`step-circle ${step === 1 ? "active" : "done"}`}>
                  {step > 1 ? "✓" : "1"}
                </div>
                <div className={`step-label ${step === 1 ? "active" : ""}`}>Store Info</div>
              </div>
              <div className={`step-line ${step > 1 ? "done" : ""}`} />
              <div className="step-item">
                <div className={`step-circle ${step === 2 ? "active" : ""}`}>2</div>
                <div className={`step-label ${step === 2 ? "active" : ""}`}>Location</div>
              </div>
            </div>

            <div className={`form-card ${animClass}`}>

              {step === 1 && (
                <>
                  <div className="step-heading">
                    <h2>Tell us about your <em>store</em></h2>
                    <p>Basic info to get you started</p>
                  </div>

                  {/* LOGO */}
                  <div className="logo-upload">
                    <div className="logo-preview">
                      {logoPreview ? <img src={logoPreview} alt="logo" /> : "🏪"}
                    </div>
                    <div className="logo-upload-info">
                      <h4>Store Logo</h4>
                      <p>PNG or JPG · max 2MB</p>
                      <label className="upload-btn" style={{ cursor: "pointer" }}>
                        Upload Logo
                        <input type="file" accept="image/*" style={{ display: "none" }}
                          onChange={(e) => {
                            const f = e.target.files[0];
                            if (f) setLogoPreview(URL.createObjectURL(f));
                          }} />
                      </label>
                    </div>
                  </div>

                  <div className="fields">
                    <div className="field">
                      <label>Store Name</label>
                      <input placeholder="e.g. Nike Morocco" value={form.name}
                        onChange={(e) => update("name", e.target.value)} />
                    </div>
                    <div className="field">
                      <label>Store Email</label>
                      <input type="email" placeholder="store@example.com" value={form.email}
                        onChange={(e) => update("email", e.target.value)} />
                    </div>
                    <div className="field">
                      <label>Phone Number</label>
                      <input placeholder="+212 6xx xxx xxx" value={form.phone}
                        onChange={(e) => update("phone", e.target.value)} />
                    </div>
                  </div>

                  <div className="btn-row">
                    <button className="btn-next" onClick={goNext} disabled={!step1Ready}>
                      Next →
                    </button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="step-heading">
                    <h2>Where are you <em>based?</em></h2>
                    <p>Set your store's region and currency</p>
                  </div>

                  <div className="fields">
                    <div className="field">
                      <label>Country</label>
                      <select value={form.country} onChange={(e) => update("country", e.target.value)}>
                        <option value="">Select country</option>
                        {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="field">
                      <label>Currency</label>
                      <select value={form.currency} onChange={(e) => update("currency", e.target.value)}>
                        <option value="">Select currency</option>
                        {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="field">
                      <label>Language</label>
                      <select value={form.language} onChange={(e) => update("language", e.target.value)}>
                        <option value="">Select language</option>
                        {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="btn-row">
                    <button className="btn-back" onClick={goBack}>← Back</button>
                    <button className="btn-next" onClick={handleSubmit} disabled={!step2Ready}>
                      Create Store 🚀
                    </button>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>

        {/* LOGIN MODAL */}
        {showModal && (
          <div className="overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
            <div className="modal">
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
              <div className="modal-icon">🏪</div>
              <h2>Almost there!</h2>
              <p className="modal-sub">Sign in to create your store. It only takes a second.</p>
              <button className="google-btn"><GoogleIcon /> Continue with Google</button>
              <div className="divider">or</div>
              <button className="other-btn" onClick={() => router.visit("/login")}>
                Continue with other method
              </button>
              <div className="modal-footer">
                By continuing you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}