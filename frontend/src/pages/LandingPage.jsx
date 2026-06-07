import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Menu, 
  X, 
  Phone, 
  Users, 
  ChevronRight,
  Flame,
  Truck,
  ShieldCheck,
  ShoppingBag
} from "lucide-react";
import { useCart } from "../context/CartContext";
import "./LandingPage.css";

// Import visual assets
import stadiumBg from "../assets/stadium_bg.png";
import tshirt1 from "../assets/tshirt1.jpg";
import tshirt2 from "../assets/tshirt2.jpg";
import tshirt3 from "../assets/tshirt3.jpg";

function LandingPage() {
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [addedMap, setAddedMap] = useState({});
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position to change Navbar styling and parallax scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll helper for anchors
  const handleAnchorClick = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 📦 Reuse exact product details and images from Products.jsx
  const featuredJerseys = [
    { id: 1, name: "Oversized Black Tee", price: 799, image: tshirt1, category: "Streetwear Kit", badge: "Best Seller" },
    { id: 2, name: "Streetwear White Tee", price: 899, image: tshirt2, category: "Streetwear Kit", badge: "Limited Drop" },
    { id: 3, name: "Premium Brown Tee", price: 999, image: tshirt3, category: "Streetwear Kit", badge: "New Release" }
  ];

  const handleAdd = (product) => {
    addToCart(product);
    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  // Helper to find quantity in cart
  const getCartQty = (productId) => {
    const item = cart.find((i) => i.id === productId);
    return item ? item.quantity : 0;
  };

  // Get total count of items in cart
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="lp-wrapper">
      
      {/* 🧭 NAVBAR */}
      <nav className={`lp-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="lp-nav-container">
          <a href="#home" onClick={(e) => handleAnchorClick(e, "home")} className="lp-logo">
            ELEVEN<span>STORE</span>⚽
          </a>

          {/* Desktop Navigation Links */}
          <div className="lp-nav-links">
            <a href="#home" onClick={(e) => handleAnchorClick(e, "home")} className="lp-nav-link">Home</a>
            <a href="#about" onClick={(e) => handleAnchorClick(e, "about")} className="lp-nav-link">About</a>
            <a href="#products" onClick={(e) => handleAnchorClick(e, "products")} className="lp-nav-link">Products</a>
            <a href="#contact" onClick={(e) => handleAnchorClick(e, "contact")} className="lp-nav-link">Contact</a>
          </div>

          {/* Desktop Action Buttons */}
          <div className="lp-nav-actions">
            {cartCount > 0 && (
              <button className="lp-btn-login" style={{ borderColor: "var(--lp-neon)", color: "var(--lp-neon)", display: "flex", alignItems: "center", gap: "6px" }} onClick={() => navigate("/cart")}>
                <ShoppingBag size={16} /> Cart ({cartCount})
              </button>
            )}
            <button className="lp-btn-login" onClick={() => navigate("/login")}>Login</button>
            <button className="lp-btn-signup" onClick={() => navigate("/signup")}>Sign Up</button>
          </div>

          {/* Mobile Hamburger toggle */}
          <button className="lp-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`lp-nav-links ${mobileMenuOpen ? "active" : ""}`}>
          <a href="#home" onClick={(e) => handleAnchorClick(e, "home")} className="lp-nav-link">Home</a>
          <a href="#about" onClick={(e) => handleAnchorClick(e, "about")} className="lp-nav-link">About</a>
          <a href="#products" onClick={(e) => handleAnchorClick(e, "products")} className="lp-nav-link">Products</a>
          <a href="#contact" onClick={(e) => handleAnchorClick(e, "contact")} className="lp-nav-link">Contact</a>
          
          <div className="lp-mobile-actions">
            {cartCount > 0 && (
              <button className="lp-btn-login" style={{ width: "100%", borderColor: "var(--lp-neon)", color: "var(--lp-neon)" }} onClick={() => { setMobileMenuOpen(false); navigate("/cart"); }}>Cart ({cartCount})</button>
            )}
            <button className="lp-btn-login" style={{ width: "100%" }} onClick={() => { setMobileMenuOpen(false); navigate("/login"); }}>Login</button>
            <button className="lp-btn-signup" style={{ width: "100%" }} onClick={() => { setMobileMenuOpen(false); navigate("/signup"); }}>Sign Up</button>
          </div>
        </div>
      </nav>

      {/* 🏟 HERO SECTION */}
      <section id="home" className="lp-hero">
        <div 
          className="lp-hero-bg" 
          style={{ 
            backgroundImage: `url(${stadiumBg})`,
            transform: `translateY(${scrollY * 0.3}px) scale(1.1)`
          }}
        />
        <div className="lp-hero-content">
          <span className="lp-hero-tag">Season 2026 Collection</span>
          <h1>
            Wear The Game.
            <span>Live The Passion.</span>
          </h1>
          <p className="lp-hero-sub">
            Premium Football Jerseys and Fan Merchandise
          </p>
          <div className="lp-hero-btns">
            <button className="lp-btn-primary" onClick={() => navigate("/products")}>
              Shop Now <ChevronRight size={18} style={{ display: "inline-block", verticalAlign: "middle", marginLeft: "4px" }} />
            </button>
            <button className="lp-btn-outline" onClick={() => navigate("/login")}>
              Login
            </button>
            <button className="lp-btn-outline" style={{ borderColor: "var(--lp-neon)", color: "var(--lp-neon)" }} onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </div>
        </div>
      </section>

      {/* Football pitch divider */}
      <div className="lp-divider">
        <div className="lp-divider-line" />
        <span className="lp-divider-badge">LINE UP 📋</span>
        <div className="lp-divider-line" />
      </div>

      {/* 👥 ABOUT SECTION */}
      <section id="about" className="lp-section">
        <div className="lp-about-grid">
          <div className="lp-about-visual">
            <div className="lp-about-glow-box" />
          </div>
          <div className="lp-about-info">
            <span className="lp-section-tag">Our Mission</span>
            <h3>Bridging Football <span>Passion</span> & Gen Z <span>Streetwear</span></h3>
            <p>
              Eleven Store was born out of a desire to merge raw pitch energy with modern high-fashion streetwear. We design football apparel that fits as perfectly in stadium stands as it does on city streets.
            </p>
            <p>
              We are not just selling merchandise; we are building an active, digital-first football fan community. By prioritizing authentic player details, eco-friendly materials, and premium neon-accent designs, we are redefining what soccer culture looks like.
            </p>
            
            <div className="lp-about-stats">
              <div className="lp-stat-card">
                <span className="lp-stat-num">50K+</span>
                <span className="lp-stat-label">Fans Reached</span>
              </div>
              <div className="lp-stat-card">
                <span className="lp-stat-num">100%</span>
                <span className="lp-stat-label">Authentic</span>
              </div>
              <div className="lp-stat-card">
                <span className="lp-stat-num">24/7</span>
                <span className="lp-stat-label">Pitch Vibe</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Football pitch divider */}
      <div className="lp-divider">
        <div className="lp-divider-line" />
        <span className="lp-divider-badge">KICK OFF ⚽</span>
        <div className="lp-divider-line" />
      </div>

      {/* 👕 FEATURED PRODUCTS SECTION */}
      <section id="products" className="lp-section">
        <div className="lp-section-header">
          <span className="lp-section-tag">Featured Drops</span>
          <h2 className="lp-section-title">The Pitch Collection</h2>
        </div>

        <div className="lp-products-grid">
          {featuredJerseys.map((jersey) => {
            const qtyInCart = getCartQty(jersey.id);
            const isAdded = addedMap[jersey.id];

            return (
              <div key={jersey.id} className="lp-product-card">
                <div className="lp-product-img-container">
                  {jersey.badge && <span className="lp-product-tag">{jersey.badge}</span>}
                  <img src={jersey.image} alt={jersey.name} className="lp-product-img" />
                </div>
                <div className="lp-product-info">
                  <span className="lp-product-cat">{jersey.category}</span>
                  <h3 className="lp-product-name">{jersey.name}</h3>
                  <p className="lp-product-desc">
                    Premium quality fan merchandise engineered from the highest standard cotton blends.
                  </p>
                  
                  {/* Cart qty indicator */}
                  {qtyInCart > 0 && (
                    <span className="lp-product-qty-tag">
                      In Bag: {qtyInCart}
                    </span>
                  )}

                  <div className="lp-product-footer">
                    <span className="lp-product-price">₹{jersey.price}</span>
                    <button 
                      className="lp-product-btn" 
                      onClick={() => handleAdd(jersey)}
                      style={{
                        background: isAdded ? "var(--lp-neon)" : "transparent",
                        color: isAdded ? "#000" : "#fff",
                        borderColor: isAdded ? "var(--lp-neon)" : "var(--lp-border)"
                      }}
                    >
                      {isAdded ? "Added ✓" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <button className="lp-btn-primary" onClick={() => navigate("/products")}>
            View All Drops <ChevronRight size={18} style={{ display: "inline-block", verticalAlign: "middle", marginLeft: "4px" }} />
          </button>
        </div>
      </section>

      {/* Football pitch divider */}
      <div className="lp-divider">
        <div className="lp-divider-line" />
        <span className="lp-divider-badge">TACTICS 🛡️</span>
        <div className="lp-divider-line" />
      </div>

      {/* 🌟 WHY CHOOSE US SECTION */}
      <section className="lp-section">
        <div className="lp-section-header">
          <span className="lp-section-tag">Why Eleven Store</span>
          <h2 className="lp-section-title">Engineered for the Fearless Fan</h2>
        </div>

        <div className="lp-why-grid">
          <div className="lp-why-card">
            <div className="lp-why-icon-container">
              <Flame size={24} />
            </div>
            <h3>Premium Quality</h3>
            <p>Double-knit mesh construction that offers lightweight durability and supreme comfort on and off the turf.</p>
          </div>

          <div className="lp-why-card">
            <div className="lp-why-icon-container">
              <Truck size={24} />
            </div>
            <h3>Fast Delivery</h3>
            <p>Lightning-fast global dispatch with full real-time tracking so you never miss a matchday drip.</p>
          </div>

          <div className="lp-why-card">
            <div className="lp-why-icon-container">
              <ShieldCheck size={24} />
            </div>
            <h3>Authentic Designs</h3>
            <p>Original, custom-built designs crafted in collaboration with street style visionaries and graphic designers.</p>
          </div>

          <div className="lp-why-card">
            <div className="lp-why-icon-container">
              <Users size={24} />
            </div>
            <h3>Football Fan Community</h3>
            <p>Gain access to private watch parties, exclusive drops, and community voting rights for future kits.</p>
          </div>
        </div>
      </section>

      {/* Football pitch divider */}
      <div className="lp-divider">
        <div className="lp-divider-line" />
        <span className="lp-divider-badge">BASECAMP 🏟</span>
        <div className="lp-divider-line" />
      </div>

      {/* 📞 CONTACT SECTION */}
      <section id="contact" className="lp-section">
        <div className="lp-section-header">
          <span className="lp-section-tag">Direct Line</span>
          <h2 className="lp-section-title">Connect with Basecamp</h2>
        </div>

        <div className="lp-contact-grid">
          <div className="lp-contact-info-card">
            <div className="lp-contact-info-header">
              <span className="lp-section-tag">Eleven Store Team</span>
              <h3>THE BENCH ⚽</h3>
              <p>Direct contact details for the founders and team at Eleven Store.</p>
            </div>

            <div className="lp-contact-details">
              
              <div className="lp-contact-team-block">
                <div className="lp-contact-item">
                  <Users className="lp-contact-icon" size={20} />
                  <div className="lp-contact-text">
                    <h4>Founder</h4>
                    <p className="lp-highlight-text">Arfat</p>
                  </div>
                </div>

                <div className="lp-contact-item" style={{ marginTop: "16px" }}>
                  <Users className="lp-contact-icon" size={20} />
                  <div className="lp-contact-text">
                    <h4>Co-Founders</h4>
                    <p className="lp-highlight-text">Charaan, Antony</p>
                  </div>
                </div>
              </div>

              <div className="lp-contact-item">
                <Phone className="lp-contact-icon" size={20} />
                <div className="lp-contact-text">
                  <h4>Contact Numbers</h4>
                  <p>6379988537</p>
                  <p>9008739786</p>
                </div>
              </div>

              <div className="lp-contact-item">
                <svg className="lp-contact-icon lp-social-svg" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: "4px" }}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <div className="lp-contact-text">
                  <h4>Instagram</h4>
                  <a href="https://instagram.com/omarftbll" target="_blank" rel="noopener noreferrer" className="lp-contact-insta-link">
                    @omarftbll
                  </a>
                </div>
              </div>

            </div>

            <div className="lp-socials" style={{ marginTop: "24px" }}>
              <a href="https://instagram.com/omarftbll" target="_blank" rel="noopener noreferrer" className="lp-social-link">
                <svg className="lp-social-svg" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="lp-social-link">
                <svg className="lp-social-svg" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="lp-social-link">
                <svg className="lp-social-svg" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="lp-contact-stadium-card" style={{ backgroundImage: `url(${stadiumBg})` }}>
            <div className="lp-contact-stadium-overlay">
              <span className="lp-contact-stadium-tag">Home Ground</span>
              <h3 className="lp-contact-stadium-title">THE ELEVEN PITCH</h3>
              <p style={{ color: "var(--lp-text-secondary)", fontSize: "14px", marginTop: "4px" }}>
                Where streetwear meets soccer culture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 👣 FOOTER */}
      <footer className="lp-footer">
        <div className="lp-footer-container">
          <div className="lp-footer-brand">
            <h2>ELEVEN<span>STORE</span>⚽</h2>
            <p>Bridging football passion, player style, and contemporary Gen Z streetwear. Designed for the fearless.</p>
          </div>
          
          <div className="lp-footer-links-col">
            <h4>Pitches</h4>
            <ul>
              <li><a href="#home" onClick={(e) => handleAnchorClick(e, "home")}>Home</a></li>
              <li><a href="#about" onClick={(e) => handleAnchorClick(e, "about")}>About Us</a></li>
              <li><a href="#products" onClick={(e) => handleAnchorClick(e, "products")}>Products</a></li>
              <li><a href="#contact" onClick={(e) => handleAnchorClick(e, "contact")}>Contact</a></li>
            </ul>
          </div>

          <div className="lp-footer-links-col">
            <h4>Shop Info</h4>
            <ul>
              <li><a href="/login">Login</a></li>
              <li><a href="/signup">Sign Up</a></li>
              <li><a href="/products">Featured Drops</a></li>
              <li><a href="/cart">Your Bag</a></li>
            </ul>
          </div>

          <div className="lp-footer-links-col">
            <h4>Support</h4>
            <ul>
              <li><a href="#contact" onClick={(e) => handleAnchorClick(e, "contact")}>Size Guides</a></li>
              <li><a href="#contact" onClick={(e) => handleAnchorClick(e, "contact")}>Return Policy</a></li>
              <li><a href="#contact" onClick={(e) => handleAnchorClick(e, "contact")}>Terms & Conditions</a></li>
              <li><a href="#contact" onClick={(e) => handleAnchorClick(e, "contact")}>FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="lp-footer-bottom">
          <p>© 2026 Eleven Store. All rights reserved.</p>
          <div className="lp-footer-bottom-links">
            <a href="#about" onClick={(e) => handleAnchorClick(e, "about")}>Privacy Policy</a>
            <a href="#about" onClick={(e) => handleAnchorClick(e, "about")}>Terms of Use</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default LandingPage;
