import { useState } from "react";
import { CalendarCheck, Menu, Phone, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const bookNow = () => {
    const message = encodeURIComponent(
      `🚘 Hello Mahakal Tours and Travels,

I would like to book a car.

Please share the available vehicle options and booking details.

Thank you.`
    );

    window.open(`https://wa.me/917620611548?text=${message}`, "_blank");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-nav">
        <div className="nav-inner">
          <a href="#home" className="nav-brand" onClick={closeMenu}>
            <img
              src="/mahakallogo1.png"
              alt="Mahakal Tours and Travels"
              className="nav-logo"
            />
          </a>

          <nav className="nav-links">
            <a href="/">Home</a>
            <a href="/#cars">Our Cars</a>
            <a href="/routes">Routes & Fares</a>
            <a href="/#services">Services</a>
            <a href="/#contact">Contact</a>
          </nav>

          <div className="nav-actions">
            <a href="tel:+917620611548" className="call-btn">
              <Phone size={16} />
              Call
            </a>

            <button className="book-btn" onClick={bookNow}>
              <CalendarCheck size={16} />
              Book Now
            </button>
          </div>

          <button
            className="menu-btn"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={29} /> : <Menu size={29} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <nav className="mobile-menu-inner">
            <a href="/" onClick={closeMenu}>Home</a>
            <a href="/#cars" onClick={closeMenu}>Our Cars</a>
            <a href="/routes" onClick={closeMenu}>Routes & Fares</a>
            <a href="/#services" onClick={closeMenu}>Services</a>
            <a href="/#contact" onClick={closeMenu}>Contact</a>

            <div className="mobile-menu-actions">
              <a href="tel:+917620611548" className="call-btn">
                <Phone size={17} />
                Call
              </a>

              <button className="book-btn" onClick={bookNow}>
                <CalendarCheck size={17} />
                Book Now
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
