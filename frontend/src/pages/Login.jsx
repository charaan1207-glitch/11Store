import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please enter email & password");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch("https://elevenstore-backens.onrender.com/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.msg || "Login failed ❌");
                return;
            }

            // ✅ STORE LOGIN STATUS
            localStorage.setItem("isLoggedIn", "true");

            // ✅ STORE USER INFO
            localStorage.setItem(
                "user",
                JSON.stringify({
                    email: email,
                })
            );

            alert("Login successful ✅");

            // 🔥 REDIRECT TO PRODUCTS (IMPORTANT FIX)
            navigate("/products");

        } catch (error) {
            console.error("Login error:", error);
            alert("Server not responding ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">

                <h1 style={{ marginBottom: "10px", fontSize: "24px", color: "#111" }}>
                    Eleven Store
                </h1>

                <h2 style={{ marginBottom: "20px", color: "#666" }}>
                    Login
                </h2>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={handleLogin} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p style={{
                    marginTop: "15px",
                    fontSize: "14px",
                    color: "#555",
                    textAlign: "center"
                }}>
                    Don’t have an account?{" "}
                    <Link
                        to="/signup"
                        style={{
                            color: "#0ea5e9",
                            fontWeight: "600",
                            textDecoration: "none"
                        }}
                    >
                        Signup here
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Login;