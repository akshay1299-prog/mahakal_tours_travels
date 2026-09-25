import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  ArrowDownUp,
  CalendarDays,
  CarFront,
  CheckCircle2,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
  Plane,
  Search,
  ShieldCheck,
  Star,
  Users,
  Wind,
  X,
} from "lucide-react";

const cars = [
  { name: "Swift Dzire", type: "Comfort Sedan", seats: "5 Seats", image: "/sedan-vehicle.svg", description: "Comfortable sedan for city travel, airport transfers and one-way journeys." },
  { name: "Hyundai Aura", type: "Premium Sedan", seats: "5 Seats", image: "/Aura.png", description: "Elegant and comfortable sedan for city travel and outstation trips." },
  { name: "Toyota Etios", type: "Comfort Sedan", seats: "5 Seats", image: "/sedan-vehicle.svg", description: "Reliable sedan for daily travel, family rides and long routes." },
  { name: "Hyundai Xcent", type: "Comfort Sedan", seats: "5 Seats", image: "/sedan-vehicle.svg", description: "Practical and comfortable sedan for safe everyday travel." },
  { name: "Maruti Suzuki Ertiga", type: "Family Car", seats: "7 Seats", image: "/Ertiga.png", description: "Perfect for family trips, city travel and comfortable outstation journeys." },
  { name: "Kia Carens", type: "Family SUV", seats: "7 Seats", image: "/suv-vehicle.svg", description: "Spacious family vehicle for group travel and memorable road trips." },
  { name: "Toyota Innova", type: "Large SUV", seats: "7 Seats", image: "/large-suv-vehicle.svg", description: "Premium comfort for family tours, business travel and long journeys." },
  { name: "Toyota Innova Crysta", type: "Premium Large SUV", seats: "7 Seats", image: "/large-suv-vehicle.svg", description: "Luxury and extra comfort for important journeys and outstation travel." },
  { name: "Force Urbania", type: "Premium Traveller", seats: "17 Seats", image: "/Urbania1.png", description: "Spacious premium traveller for group tours, family functions and long trips." },
  { name: "Premium SUV", type: "Premium SUV", seats: "7 Seats", image: "/suv-vehicle.svg", description: "Comfortable and spacious SUV for family trips, outstation journeys and group travel." },
];

const services = [
  { title: "Local Travel", text: "Comfortable vehicles for everyday city travel.", icon: MapPin },
  { title: "Outstation Trips", text: "Reliable rides for long-distance journeys.", icon: CarFront },
  { title: "Family Tours", text: "Spacious vehicles for memorable vacations.", icon: Users },
  { title: "Airport Transfers", text: "Smooth pickup and drop service for airports.", icon: Wind },
];

/* ================= WHATSAPP ================= */

const sendWhatsApp = (message) => {
  const whatsappNumber = "919011776333";

  window.open(
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
};

const Home = ({ showFares = true }) => {
  const navigate = useNavigate();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [tripType, setTripType] = useState("One Way");
  const [quickSearch, setQuickSearch] = useState({
    pickup: "",
    destination: "",
    date: "",
    time: "",
  });

  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    pickup: "",
    destination: "",
    date: "",
    time: "",
    vehicle: "",
    passengers: "",
    service: "",
    message: "",
  });

  /* ================= BOOK NOW ================= */

  const bookNow = () => {
    setShowBookingForm(true);
  };

  const handleQuickSearchChange = (e) => {
    const { name, value } = e.target;

    setQuickSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuickSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams({
      pickup: quickSearch.pickup,
      destination: quickSearch.destination,
      date: quickSearch.date,
      time: quickSearch.time,
      trip: tripType,
    });

    navigate(`/routes?${params.toString()}`);
  };

  /* ================= FORM CHANGE ================= */

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= CLOSE ================= */

  const closeBookingForm = () => {
    setShowBookingForm(false);
  };

  /* ================= DATE FORMAT ================= */

  const formatDate = (dateValue) => {
    if (!dateValue) return "";

    const date = new Date(`${dateValue}T00:00:00`);

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /* ================= TIME FORMAT ================= */

  const formatTime = (timeValue) => {
    if (!timeValue) return "";

    const [hours, minutes] = timeValue.split(":");

    const date = new Date();

    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  /* ================= BOOKING SUBMIT ================= */

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    const {
      name,
      phone,
      pickup,
      destination,
      date,
      time,
      vehicle,
      passengers,
      service,
      message,
    } = bookingData;

    if (
      !name ||
      !phone ||
      !pickup ||
      !destination ||
      !date ||
      !time ||
      !vehicle ||
      !passengers ||
      !service
    ) {
      alert("Please fill all required booking details.");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    const formattedDate = formatDate(date);
    const formattedTime = formatTime(time);

    /*
      Premium WhatsApp Booking Message
    */

    const whatsappMessage = `🚖 *NEW LEAD RECEIVED — MAHAKAL TOURS & TRAVELS*

  👤 Name: ${name}
  📞 Phone: ${phone}
  📍 Pickup Location: ${pickup}
  🏁 Drop / Destination: ${destination}
  📅 Date: ${formattedDate}
  ⏰ Time: ${formattedTime}
  🚘 Vehicle: ${vehicle}
  👥 Passengers: ${passengers}
  🏷️ Service / Request: ${service}
  ${message ? `📝 Additional Requirement: ${message}\n` : ""}
  🌐 Source: mahakaltours website

  ✅ Please contact the customer to confirm availability and final fare.`;

    sendWhatsApp(whatsappMessage);

    setShowBookingForm(false);

    setBookingData({
      name: "",
      phone: "",
      pickup: "",
      destination: "",
      date: "",
      time: "",
      vehicle: "",
      passengers: "",
      service: "",
      message: "",
    });
  };

  return (
    <main>
      {/* ================= HERO ================= */}

      <section id="home" className="hero">
        <div className="hero-inner hero-inner-simple">
          <div className="hero-content">
            <div className="hero-brand-lockup">
              <div className="hero-brand-image">
                <img src="/mahakallogo1.png" alt="Mahakal Tours and Travels logo" />
              </div>
              <div className="hero-brand-copy">
                <strong>Mahakal Tours</strong>
                <span>AND TRAVELS</span>
                <small>Safe journeys. Happy memories.</small>
              </div>
            </div>

            <div className="eyebrow">
              <Star size={13} fill="currentColor" />
              Premium Travel Service
            </div>

            <h1>
              Your Journey.
              <span>Our Responsibility.</span>
            </h1>

            <p className="hero-copy">
              Comfortable, safe and reliable travel services for family trips,
              outstation journeys, airport transfers and group travel.
            </p>

            <div className="hero-actions">
              <button className="hero-primary" onClick={bookNow}>
                <MessageCircle size={18} />
                Book Your Ride
                <ArrowRight size={17} />
              </button>

              <a href="/routes" className="hero-secondary">
                Explore Our Cars
              </a>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <strong>24/7</strong>
                <span>Booking Support</span>
              </div>

              <div className="hero-stat">
                <strong>100%</strong>
                <span>Customer Focus</span>
              </div>

              <div className="hero-stat">
                <strong>SAFE</strong>
                <span>Travel Experience</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="route-search-section" aria-label="Plan your journey">
        <div className="route-search-card">
          <div className="route-search-heading">
            <div>
              <span className="kicker">Plan Your Journey</span>
              <h2>Where would you like to go?</h2>
              <p>Get a comfortable cab from your doorstep, with clear pricing.</p>
            </div>
            <div className="route-search-trust">
              <ShieldCheck size={17} />
              <span>Trusted local service</span>
            </div>
          </div>

          <div className="route-search-tabs" role="tablist" aria-label="Trip type">
            {["One Way", "Round Trip", "Local", "Airport"].map((type) => (
              <button
                key={type}
                type="button"
                className={tripType === type ? "active" : ""}
                onClick={() => setTripType(type)}
                role="tab"
                aria-selected={tripType === type}
              >
                {type === "Airport" && <Plane size={14} />}
                {type !== "Airport" && <ArrowDownUp size={14} />}
                {type}
              </button>
            ))}
          </div>

          <form className="route-search-form" onSubmit={handleQuickSearch}>
            <label className="route-search-field">
              <span><MapPin size={14} /> From</span>
              <input
                name="pickup"
                value={quickSearch.pickup}
                onChange={handleQuickSearchChange}
                placeholder="Pickup location"
                required
              />
            </label>

            <label className="route-search-field">
              <span><MapPin size={14} /> To</span>
              <input
                name="destination"
                value={quickSearch.destination}
                onChange={handleQuickSearchChange}
                placeholder="Destination"
                required
              />
            </label>

            <label className="route-search-field">
              <span><CalendarDays size={14} /> Date</span>
              <input
                type="date"
                name="date"
                min={new Date().toISOString().split("T")[0]}
                value={quickSearch.date}
                onChange={handleQuickSearchChange}
                required
              />
            </label>

            <label className="route-search-field">
              <span><Clock3 size={14} /> Pickup time</span>
              <input
                type="time"
                name="time"
                value={quickSearch.time}
                onChange={handleQuickSearchChange}
                required
              />
            </label>

            <button className="route-search-button" type="submit">
              <Search size={17} />
              Explore cabs
            </button>
          </form>
        </div>
      </section>

      {/* ================= QUICK BOOKING ================= */}

      <div className="quick-wrap">
        <div className="quick-card">
          <div>
            <small>Quick Booking</small>

            <h2>Need a car? Let's plan your journey.</h2>

            <p>
              Enter your travel details and book your vehicle directly.
            </p>
          </div>

          <button className="whatsapp-btn" onClick={bookNow}>
            <MessageCircle size={18} />
            Book Now
          </button>
        </div>
      </div>

      {/* ================= FLEET ================= */}

      <section id="cars" className="section fleet-teaser-section">
        <div className="container">
          <div className="section-head">
            <div className="kicker">Our Fleet</div>

            <h2>Find the right ride for your journey.</h2>

            <p>
              Explore our complete sedan, SUV, large SUV and traveller collection on the booking page.
            </p>
          </div>

          <div className="fleet-teaser-actions">
            <a className="hero-primary" href="/routes">
              Explore all cars
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <section className="home-fare-teaser">
        <div className="container">
          <div className="home-fare-heading">
            <div>
              <div className="kicker">Travel Options</div>
              <h2>Simple plans. <span>Clear fares.</span></h2>
              <p>Choose the trip style that suits your journey. Full route prices are available on our fares page.</p>
            </div>
            <a className="outline-btn home-fare-link" href="/routes">View all fares <ArrowRight size={16} /></a>
          </div>

          <div className="home-fare-grid">
            <a className="home-fare-card" href="/routes">
              <span className="home-fare-number">01</span>
              <div><small>ONE WAY</small><h3>One Way Cab Fares</h3><p>Comfortable drops from Ahilyanagar to Pune, Mumbai, Nashik, Shirdi and more.</p></div>
              <ArrowRight size={19} />
            </a>
            <a className="home-fare-card featured" href="/routes">
              <span className="home-fare-number">02</span>
              <div><small>ROUND TRIP & LOCAL</small><h3>Round Trip & Local Packages</h3><p>Sedan from ₹13/km, SUV from ₹15/km and Large SUV from ₹20/km.</p></div>
              <ArrowRight size={19} />
            </a>
          </div>
        </div>
      </section>

      {showFares && (
        /* ================= CAB FARES & PACKAGES ================= */

      <section id="fares" className="cab-fares-section">
        <div className="container">
          <div className="cab-fares-head">
            <div>
              <div className="kicker">Cab Fares & Packages</div>
              <h2>Simple Rates. <span>Clear Pricing.</span></h2>
              <p>Choose your cab category and check our one-way and round-trip travel rates.</p>
            </div>
            <div className="fare-note">
              <CheckCircle2 size={17} />
              <span>Transparent pricing</span>
            </div>
          </div>

          <div className="fare-category-grid">
            <div className="fare-category-card">
              <span className="fare-category-label">SEDAN</span>
              <h3>Comfort Sedan</h3>
              <p>Swift Dzire • Hyundai Aura • Toyota Etios • Hyundai Xcent</p>
            </div>
            <div className="fare-category-card featured">
              <span className="fare-category-label">SUV</span>
              <h3>Family SUV</h3>
              <p>Ertiga • Kia Carens</p>
            </div>
            <div className="fare-category-card">
              <span className="fare-category-label">LARGE SUV</span>
              <h3>Premium Large SUV</h3>
              <p>Toyota Innova • Toyota Innova Crysta</p>
            </div>
          </div>

          <div className="fare-block-heading">
            <div>
              <span>01</span>
              <div>
                <h3>One Way Cab Fares</h3>
                <p>Popular routes from Ahilyanagar</p>
              </div>
            </div>
            <span className="fare-heading-note">One-way drop</span>
          </div>

          <div className="fare-route-groups">
            <div className="fare-route-group">
              <div className="fare-group-title">
                <div>
                  <small>SEDAN</small>
                  <strong>Comfort Sedan</strong>
                </div>
                <span>Swift Dzire • Aura • Etios • Xcent</span>
              </div>
              <div className="fare-route-list">
                <div><span>Ahilyanagar → Pune</span><strong>₹2,200</strong><button onClick={bookNow}>Book</button></div>
                <div><span>Ahilyanagar → Mumbai</span><strong>₹5,000</strong><button onClick={bookNow}>Book</button></div>
                <div><span>Ahilyanagar → Nashik</span><strong>₹3,000</strong><button onClick={bookNow}>Book</button></div>
                <div><span>Ahilyanagar → Sambhajinagar</span><strong>₹2,200</strong><button onClick={bookNow}>Book</button></div>
                <div><span>Ahilyanagar → Shirdi</span><strong>₹2,200</strong><button onClick={bookNow}>Book</button></div>
              </div>
            </div>

            <div className="fare-route-group">
              <div className="fare-group-title">
                <div>
                  <small>SUV</small>
                  <strong>Family SUV</strong>
                </div>
                <span>Ertiga • Kia Carens</span>
              </div>
              <div className="fare-route-list">
                <div><span>Ahilyanagar → Pune</span><strong>₹3,000</strong><button onClick={bookNow}>Book</button></div>
                <div><span>Ahilyanagar → Mumbai</span><strong>₹6,000</strong><button onClick={bookNow}>Book</button></div>
                <div><span>Ahilyanagar → Nashik</span><strong>₹4,000</strong><button onClick={bookNow}>Book</button></div>
                <div><span>Ahilyanagar → Sambhajinagar</span><strong>₹3,000</strong><button onClick={bookNow}>Book</button></div>
                <div><span>Ahilyanagar → Shirdi</span><strong>₹3,000</strong><button onClick={bookNow}>Book</button></div>
              </div>
            </div>

            <div className="fare-route-group">
              <div className="fare-group-title">
                <div>
                  <small>LARGE SUV</small>
                  <strong>Premium Large SUV</strong>
                </div>
                <span>Innova • Innova Crysta</span>
              </div>
              <div className="fare-route-list">
                <div><span>Ahilyanagar → Pune</span><strong>₹6,000</strong><button onClick={bookNow}>Book</button></div>
                <div><span>Ahilyanagar → Mumbai</span><strong>₹1,10,000</strong><button onClick={bookNow}>Book</button></div>
                <div><span>Ahilyanagar → Nashik</span><strong>₹7,000</strong><button onClick={bookNow}>Book</button></div>
                <div><span>Ahilyanagar → Sambhajinagar</span><strong>₹6,000</strong><button onClick={bookNow}>Book</button></div>
                <div><span>Ahilyanagar → Shirdi</span><strong>₹6,000</strong><button onClick={bookNow}>Book</button></div>
              </div>
            </div>
          </div>

          <div className="fare-return-note">
            <ArrowRight size={17} />
            <div>
              <strong>Return trips available</strong>
              <span>Same route rates are applicable for return travel.</span>
            </div>
          </div>

          <div className="fare-block-heading round-trip-heading">
            <div>
              <span>02</span>
              <div>
                <h3>Round Trip & Local Packages</h3>
                <p>Ideal for sightseeing, family trips and multi-day travel.</p>
              </div>
            </div>
          </div>

          <div className="package-grid">
            <article className="package-card">
              <div className="package-top">
                <div>
                  <span className="package-label">SEDAN</span>
                  <h3>Comfort Sedan</h3>
                  <p>Swift Dzire • Hyundai Aura • Toyota Etios • Hyundai Xcent</p>
                </div>
                <div className="package-price"><strong>₹13</strong><span>/ km</span></div>
              </div>
              <div className="package-divider" />
              <ul className="package-list">
                <li><CheckCircle2 size={16} />Toll / Parking extra</li>
                <li><CheckCircle2 size={16} />₹500 per night halt</li>
                <li><CheckCircle2 size={16} />₹300 driver allowance / day</li>
              </ul>
              <button className="package-book" onClick={bookNow}>Book Sedan <ArrowRight size={16} /></button>
            </article>

            <article className="package-card featured">
              <div className="package-popular">Popular Choice</div>
              <div className="package-top">
                <div>
                  <span className="package-label">SUV</span>
                  <h3>Family SUV</h3>
                  <p>Ertiga • Kia Carens</p>
                </div>
                <div className="package-price"><strong>₹15</strong><span>/ km</span></div>
              </div>
              <div className="package-divider" />
              <ul className="package-list">
                <li><CheckCircle2 size={16} />Toll / Parking extra</li>
                <li><CheckCircle2 size={16} />₹700 per night halt</li>
                <li><CheckCircle2 size={16} />₹300 driver allowance / day</li>
              </ul>
              <button className="package-book" onClick={bookNow}>Book SUV <ArrowRight size={16} /></button>
            </article>

            <article className="package-card">
              <div className="package-top">
                <div>
                  <span className="package-label">LARGE SUV</span>
                  <h3>Premium Large SUV</h3>
                  <p>Toyota Innova • Toyota Innova Crysta</p>
                </div>
                <div className="package-price"><strong>₹20</strong><span>/ km</span></div>
              </div>
              <div className="package-divider" />
              <ul className="package-list">
                <li><CheckCircle2 size={16} />Toll / Parking extra</li>
                <li><CheckCircle2 size={16} />₹1,000 per night halt</li>
                <li><CheckCircle2 size={16} />₹300 driver allowance / day</li>
              </ul>
              <button className="package-book" onClick={bookNow}>Book Large SUV <ArrowRight size={16} /></button>
            </article>
          </div>

          <div className="pune-fares-box">
            <div className="pune-fares-head">
              <div>
                <div className="kicker">Additional Routes</div>
                <h3>Pune One Way Fares</h3>
                <p>Direct drop rates from Pune to popular destinations.</p>
              </div>
              <div className="pune-route-badge">Pune <ArrowRight size={14} /> Maharashtra</div>
            </div>

            <div className="pune-fare-table-wrap">
              <table className="pune-fare-table">
                <thead>
                  <tr><th>Route</th><th>Sedan</th><th>SUV</th><th>Large SUV</th><th>Action</th></tr>
                </thead>
                <tbody>
                  <tr><td>Pune → Ahilyanagar</td><td>₹2,200</td><td>₹3,000</td><td>₹6,000</td><td><button onClick={bookNow}>Book</button></td></tr>
                  <tr><td>Pune → Shirdi</td><td>₹3,000</td><td>₹4,000</td><td>₹6,000</td><td><button onClick={bookNow}>Book</button></td></tr>
                  <tr><td>Pune → Sambhajinagar</td><td>₹3,300</td><td>₹4,000</td><td>₹7,000</td><td><button onClick={bookNow}>Book</button></td></tr>
                  <tr><td>Pune → Nashik</td><td>₹3,000</td><td>₹4,000</td><td>₹7,000</td><td><button onClick={bookNow}>Book</button></td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="fare-important-note">
            <strong>Important:</strong> Toll, parking and other applicable charges are extra as mentioned above. Please confirm the final fare at the time of booking.
          </div>
        </div>
      </section>
      )}

      {/* ================= SERVICES ================= */}

      <section id="services" className="section services-section">
        <div className="container services-layout">
          <div className="services-copy">
            <div className="kicker">Our Services</div>

            <h2>
              Travel Made Simple.
              <span> Comfortable & Reliable.</span>
            </h2>

            <p>
              Whether you need a local ride, airport transfer, family tour or
              long-distance journey, we provide comfortable travel solutions
              for your needs.
            </p>

            <button className="dark-btn" onClick={bookNow}>
              Book Now
              <ArrowRight size={17} />
            </button>
          </div>

          <div className="service-grid">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div className="service-card" key={service.title}>
                  <div className="service-icon">
                    <Icon size={22} />
                  </div>

                  <h3>{service.title}</h3>

                  <p>{service.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}

      <section className="section">
        <div className="container why-layout">
          <div className="why-copy">
            <div className="kicker">Why Choose Us</div>

            <h2>More Than Just A Ride</h2>

            <p>
              We focus on giving every customer a smooth, comfortable and
              dependable travel experience from booking to destination.
            </p>

            <div className="check-grid">
              {[
                "Clean & well-maintained vehicles",
                "Professional drivers",
                "Comfortable travel",
                "Flexible booking",
                "Reliable service",
                "Customer-first approach",
              ].map((item) => (
                <div className="check-item" key={item}>
                  <CheckCircle2 size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="why-card">
            <div className="shield">
              <ShieldCheck size={29} />
            </div>

            <h3>Safe. Comfortable. Reliable.</h3>

            <p>
              From short city rides to long family tours, we aim to make every
              journey smooth and stress-free.
            </p>

            <div className="signature">
              Mahakal Tours and Travels
              <strong>Your Journey, Our Responsibility.</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}

      <section id="about" className="section about-section">
        <div className="container">
          <div className="kicker">About Mahakal Tours and Travels</div>

          <h2>Your Trusted Travel Partner</h2>

          <p>
            Mahakal Tours and Travels provides comfortable and dependable
            transportation solutions for individuals, families and groups.
            Our goal is to make every journey convenient, safe and memorable.
          </p>

          <div className="about-actions">
            <button className="gold-btn" onClick={bookNow}>
              <MessageCircle size={18} />
              Book Your Ride
            </button>

            <a href="tel:+919011776333" className="outline-btn">
              <Phone size={18} />
              Call Yogesh
            </a>
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}

      <section id="contact" className="section">
        <div className="container">
          <div className="contact-box">
            <div className="contact-info">
              <div className="kicker">Contact Us</div>

              <h2>Let's Plan Your Journey</h2>

              <p>
                Choose your vehicle and book your journey directly with
                Mahakal Tours and Travels.
              </p>

              <div className="contact-list">
                {/* YOGESH */}

                <a href="tel:+919011776333" className="contact-link contact-yogesh">
                  <div className="contact-icon">
                    <Phone size={19} />
                  </div>

                  <div>
                    <small>Trip Coordinator</small>
                    <strong>Yogesh Repale</strong>
                    <span>9011776333</span>
                  </div>
                  <ArrowRight size={16} className="contact-arrow" />
                </a>

                {/* RUTIK */}

                <a href="tel:+917620611548" className="contact-link contact-rutik">
                  <div className="contact-icon">
                    <Phone size={19} />
                  </div>

                  <div>
                    <small>Booking Support</small>
                    <strong>Rutik Kakade</strong>
                    <span>7620611548</span>
                  </div>
                  <ArrowRight size={16} className="contact-arrow" />
                </a>

                {/* AVISHKAR */}

                <a href="tel:+919921823198" className="contact-link contact-avishkar">
                  <div className="contact-icon">
                    <Phone size={19} />
                  </div>

                  <div>
                    <small>Travel Desk</small>
                    <strong>Avishkar Phopase</strong>
                    <span>9921823198</span>
                  </div>
                  <ArrowRight size={16} className="contact-arrow" />
                </a>

                {/* DIRECT BOOKING */}

                <button
                  type="button"
                  onClick={bookNow}
                  className="contact-link whatsapp"
                >
                  <div className="contact-icon">
                    <MessageCircle size={20} />
                  </div>

                  <div>
                    <small>Direct Booking</small>
                    <strong>Book Now on WhatsApp</strong>
                  </div>
                </button>
              </div>
            </div>

            <div className="contact-cta">
              <div>
                <div className="kicker">Ready To Travel?</div>

                <h2>Book Your Ride Today.</h2>

                <p>
                  Select your vehicle, enter your travel details and book
                  directly through WhatsApp.
                </p>

                <button className="gold-btn" onClick={bookNow}>
                  <MessageCircle size={18} />
                  Book Now
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="footer">
        <div className="footer-inner">
          <div>
            <img
              src="/mahakallogo1.png"
              alt="Mahakal Tours and Travels"
              className="footer-logo"
            />

            <p>Your Journey, Our Responsibility.</p>
          </div>

          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#cars">Our Cars</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className="copyright">
          © {new Date().getFullYear()} Mahakal Tours and Travels. All rights
          reserved.
        </div>
      </footer>

      {/* ================= MOBILE BOOKING BAR ================= */}

      <div className="mobile-bar">
        <div className="mobile-bar-inner">
          <a href="tel:+919011776333" className="mobile-call">
            <Phone size={17} />
            Call
          </a>

          <button className="mobile-book" onClick={bookNow}>
            <MessageCircle size={17} />
            Book Now
          </button>
        </div>
      </div>

      {/* ================= BOOKING MODAL ================= */}

      {showBookingForm && (
        <div className="booking-overlay">
          <div className="booking-modal">
            <div className="booking-header">
              <div>
                <div className="kicker">Mahakal Tours and Travels</div>

                <h2>Book Your Ride</h2>

                <p>
                  Enter your travel details and continue directly on WhatsApp.
                </p>
              </div>

              <button
                type="button"
                className="booking-close"
                onClick={closeBookingForm}
                aria-label="Close booking form"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="booking-form">
              {/* CUSTOMER DETAILS */}

              <div className="booking-section-title">
                <span>01</span>
                Customer Details
              </div>

              <div className="booking-grid">
                <div className="booking-field">
                  <label htmlFor="name">
                    Full Name <span>*</span>
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={bookingData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="booking-field">
                  <label htmlFor="phone">
                    Mobile Number <span>*</span>
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="Enter mobile number"
                    value={bookingData.phone}
                    onChange={handleInputChange}
                    maxLength="10"
                    inputMode="numeric"
                    required
                  />
                </div>
              </div>

              {/* JOURNEY DETAILS */}

              <div className="booking-section-title">
                <span>02</span>
                Journey Details
              </div>

              <div className="booking-grid">
                <div className="booking-field">
                  <label htmlFor="pickup">
                    Pickup Location <span>*</span>
                  </label>

                  <input
                    id="pickup"
                    type="text"
                    name="pickup"
                    placeholder="Where should we pick you up?"
                    value={bookingData.pickup}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="booking-field">
                  <label htmlFor="destination">
                    Destination <span>*</span>
                  </label>

                  <input
                    id="destination"
                    type="text"
                    name="destination"
                    placeholder="Where do you want to go?"
                    value={bookingData.destination}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="booking-field">
                  <label htmlFor="date">
                    Pickup Date <span>*</span>
                  </label>

                  <input
                    id="date"
                    type="date"
                    name="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={bookingData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="booking-field">
                  <label htmlFor="time">
                    Pickup Time <span>*</span>
                  </label>

                  <input
                    id="time"
                    type="time"
                    name="time"
                    value={bookingData.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* VEHICLE DETAILS */}

              <div className="booking-section-title">
                <span>03</span>
                Vehicle Details
              </div>

              <div className="booking-grid">
                <div className="booking-field">
                  <label htmlFor="vehicle">
                    Select Vehicle <span>*</span>
                  </label>

                  <select
                    id="vehicle"
                    name="vehicle"
                    value={bookingData.vehicle}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select vehicle</option>

                    {cars.map((car) => (
                      <option key={car.name} value={car.name}>
                        {car.name} — {car.seats}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="booking-field">
                  <label htmlFor="passengers">
                    Number of Passengers <span>*</span>
                  </label>

                  <select
                    id="passengers"
                    name="passengers"
                    value={bookingData.passengers}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select passengers</option>
                    <option value="1">1 Passenger</option>
                    <option value="2">2 Passengers</option>
                    <option value="3">3 Passengers</option>
                    <option value="4">4 Passengers</option>
                    <option value="5">5 Passengers</option>
                    <option value="6">6 Passengers</option>
                    <option value="7">7 Passengers</option>
                    <option value="8">8 Passengers</option>
                    <option value="9">9 Passengers</option>
                    <option value="10">10 Passengers</option>
                    <option value="11-17">11–17 Passengers</option>
                  </select>
                </div>

                <div className="booking-field booking-full">
                  <label htmlFor="service">
                    Service Required <span>*</span>
                  </label>

                  <select
                    id="service"
                    name="service"
                    value={bookingData.service}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select service</option>
                    <option value="Local Travel">Local Travel</option>
                    <option value="Outstation Trip">
                      Outstation Trip
                    </option>
                    <option value="Family Tour">Family Tour</option>
                    <option value="Airport Transfer">
                      Airport Transfer
                    </option>
                    <option value="Wedding / Function">
                      Wedding / Function
                    </option>
                    <option value="Corporate Travel">
                      Corporate Travel
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* ADDITIONAL INFORMATION */}

              <div className="booking-section-title">
                <span>04</span>
                Additional Information
              </div>

              <div className="booking-field">
                <label htmlFor="message">Additional Requirement</label>

                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Any special requirement or additional information..."
                  value={bookingData.message}
                  onChange={handleInputChange}
                />
              </div>

              {/* SUBMIT */}

              <div className="booking-submit-area">
                <p>
                  <MessageCircle size={16} />
                  Your booking details will open directly in WhatsApp.
                </p>

                <button type="submit" className="booking-submit">
                  <MessageCircle size={19} />
                  Book Now on WhatsApp
                  <ArrowRight size={17} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;