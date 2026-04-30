import { useEffect, useMemo, useState } from "react";

function Admin() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://https://eleven-backend-d53u.onrender.com/api/orders")
            .then((res) => res.json())
            .then((data) => {
                setOrders(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // 📊 STATS
    const totalRevenue = useMemo(
        () => orders.reduce((sum, o) => sum + (o.total || 0), 0),
        [orders]
    );

    const totalOrders = orders.length;

    const uniqueCustomers = useMemo(() => {
        const set = new Set(orders.map((o) => o.email));
        return set.size;
    }, [orders]);

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "radial-gradient(circle at top,#1a0f1f,#0a0a12)",
                color: "#fff",
                padding: "30px",
            }}
        >
            {/* 🔥 HEADER */}
            <div style={{ marginBottom: "30px" }}>
                <h1 style={{ fontSize: "32px", fontWeight: "900" }}>
                    ADMIN PANEL ⚡
                </h1>
                <p style={{ color: "#94a3b8" }}>
                    Eleven Store Operations Dashboard
                </p>
            </div>

            {/* 📊 STATS */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                    gap: "20px",
                    marginBottom: "30px",
                }}
            >
                <Stat title="Total Orders" value={totalOrders} />
                <Stat title="Revenue" value={`₹${totalRevenue}`} />
                <Stat title="Customers" value={uniqueCustomers} />
            </div>

            {/* 🧾 ORDERS LIST */}
            <div
                style={{
                    background: "rgba(30,30,47,0.6)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "15px",
                    padding: "20px",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                }}
            >
                <h2 style={{ marginBottom: "15px" }}>Recent Orders</h2>

                {loading ? (
                    <p>Loading...</p>
                ) : orders.length === 0 ? (
                    <p>No orders yet</p>
                ) : (
                    <div style={{ maxHeight: "500px", overflowY: "auto" }}>
                        {orders.map((order, index) => (
                            <div
                                key={index}
                                style={{
                                    borderBottom: "1px solid #333",
                                    padding: "15px 0",
                                }}
                            >
                                {/* CUSTOMER */}
                                <p style={{ fontWeight: "700", color: "#eab308" }}>
                                    {order.email}
                                </p>

                                {/* TOTAL */}
                                <p style={{ marginBottom: "8px" }}>
                                    Total: ₹{order.total}
                                </p>

                                {/* ITEMS */}
                                {order.items.map((item, i) => (
                                    <p key={i} style={{ color: "#94a3b8" }}>
                                        {item.name} × {item.quantity}
                                    </p>
                                ))}

                                {/* DATE */}
                                <small style={{ color: "#666" }}>
                                    {new Date(order.createdAt).toLocaleString()}
                                </small>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

/* 🔥 STAT CARD */
function Stat({ title, value }) {
    return (
        <div
            style={{
                background: "rgba(30,30,47,0.6)",
                backdropFilter: "blur(8px)",
                padding: "20px",
                borderRadius: "15px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                transition: "0.3s",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                    "0 10px 40px rgba(147,51,234,0.4)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                    "0 8px 30px rgba(0,0,0,0.5)";
            }}
        >
            <p style={{ color: "#94a3b8", marginBottom: "5px" }}>
                {title}
            </p>
            <h2 style={{ fontSize: "24px", fontWeight: "800" }}>
                {value}
            </h2>
        </div>
    );
}

export default Admin;