import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Signup() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        const res = await fetch("http://localhost:5000/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        alert(data.msg);

        if (res.ok) {
            navigate("/login");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 style={{ marginBottom: "10px", fontSize: "24px", color: "#111" }}>Eleven Store</h1>
                <h2 style={{ marginBottom: "20px", color: "#666" }}>Signup</h2>

                <input
                    type="email"
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={handleSignup}>Signup</button>

                <p style={{ marginTop: "15px", fontSize: "14px", color: "#555", textAlign: "center" }}>
                    Already have an account? <Link to="/login" style={{ color: "#0ea5e9", fontWeight: "600", textDecoration: "none" }}>Login here</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;