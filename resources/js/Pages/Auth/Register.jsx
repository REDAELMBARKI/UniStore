import { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";

const BG_URL = "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&q=80";

export default function Register() {
    const [showPwd, setShowPwd] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Head title="Register" />

            <div className="amu-root">
                <div className="amu-card">

                    {/* LEFT PANEL */}
                    <div className="panel-left">
                        <img className="bg-image" src={BG_URL} />
                        <div className="bg-overlay" />
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="panel-right">
                        <h1 className="form-title">Register</h1>

                        <p className="form-sub">
                            Already have an account?{" "}
                            <Link href={route("login")}>Login</Link>
                        </p>

                        <form onSubmit={submit}>

                            {/* NAME */}
                            <div className="field">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                />
                                {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                            </div>

                            {/* EMAIL */}
                            <div className="field">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                />
                                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                            </div>

                            {/* PASSWORD */}
                            <div className="field">
                                <input
                                    type={showPwd ? "text" : "password"}
                                    placeholder="Password"
                                    value={data.password}
                                    onChange={(e) => setData("password", e.target.value)}
                                />
                            </div>

                            {/* CONFIRM PASSWORD */}
                            <div className="field">
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData("password_confirmation", e.target.value)
                                    }
                                />
                                {errors.password && (
                                    <p style={{ color: "red" }}>{errors.password}</p>
                                )}
                            </div>

                            <button className="btn-main" disabled={processing}>
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            
        </>
    );
}