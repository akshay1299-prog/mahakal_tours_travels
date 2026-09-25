import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, MessageCircle, Phone, Users, Wind, X } from "lucide-react";

const routeCars = [
  { name: "Swift Dzire", category: "Sedan", type: "Comfort Sedan", seats: "5 Seats", price: "₹13", priceNote: "per km", image: "/sedan-vehicle.svg", description: "Comfortable sedan for city travel, airport transfers and one-way journeys." },
  { name: "Hyundai Aura", category: "Sedan", type: "Premium Sedan", seats: "5 Seats", price: "₹13", priceNote: "per km", image: "/Aura.png", description: "Elegant sedan for city travel, airport transfers and outstation rides." },
  { name: "Toyota Etios", category: "Sedan", type: "Comfort Sedan", seats: "5 Seats", price: "₹13", priceNote: "per km", image: "/sedan-vehicle.svg", description: "Reliable sedan for daily travel, family rides and long routes." },
  { name: "Hyundai Xcent", category: "Sedan", type: "Comfort Sedan", seats: "5 Seats", price: "₹13", priceNote: "per km", image: "/sedan-vehicle.svg", description: "Practical and comfortable sedan for safe everyday travel." },
  { name: "Maruti Suzuki Ertiga", category: "SUV", type: "Family Car", seats: "7 Seats", price: "₹15", priceNote: "per km", image: "/Ertiga.png", description: "Spacious and comfortable for family trips and outstation journeys." },
  { name: "Kia Carens", category: "SUV", type: "Family SUV", seats: "7 Seats", price: "₹15", priceNote: "per km", image: "/suv-vehicle.svg", description: "Spacious family vehicle for group travel and memorable road trips." },
  { name: "Toyota Innova", category: "Large SUV", type: "Large SUV", seats: "7 Seats", price: "₹20", priceNote: "per km", image: "/large-suv-vehicle.svg", description: "Premium comfort for family tours, business travel and long journeys." },
  { name: "Toyota Innova Crysta", category: "Large SUV", type: "Premium Large SUV", seats: "7 Seats", price: "₹20", priceNote: "per km", image: "/large-suv-vehicle.svg", description: "Luxury and extra comfort for important journeys and outstation travel." },
  { name: "Force Urbania", category: "Traveller", type: "Premium Traveller", seats: "17 Seats", price: "On request", priceNote: "final quote", image: "/Urbania1.png", description: "Premium group travel with generous space for long journeys." },
  { name: "Premium SUV", category: "SUV", type: "Premium SUV", seats: "7 Seats", price: "₹15", priceNote: "per km", image: "/suv-vehicle.svg", description: "A refined SUV for family travel, tours and comfortable road trips." },
];

const Routes = () => {
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState("All");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedCar, setSelectedCar] = useState("");
  const [booking, setBooking] = useState({ name: "", phone: "", passengers: "", service: "", note: "" });
  const pickup = searchParams.get("pickup");
  const destination = searchParams.get("destination");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const trip = searchParams.get("trip") || "One Way";

  const visibleCars = useMemo(
    () => activeFilter === "All" ? routeCars : routeCars.filter((car) => car.category === activeFilter),
    [activeFilter]
  );

  const bookRoute = (route = "your preferred route") => {
    const message = encodeURIComponent(
      `Hello Mahakal Tours and Travels,\n\nI would like to book ${route}. Please share the final fare and vehicle availability.`
    );

    window.open(`https://wa.me/917620611548?text=${message}`, "_blank");
  };

  const bookCar = (car) => {
    setSelectedCar(car.name);
    setShowBookingForm(true);
  };

  const updateBooking = (event) => {
    const { name, value } = event.target;
    setBooking((prev) => ({ ...prev, [name]: value }));
  };

  const submitBooking = (event) => {
    event.preventDefault();

    const message = `🚖 *NEW LEAD RECEIVED — MAHAKAL TOURS & TRAVELS*

👤 Name: ${booking.name}
📞 Phone: ${booking.phone}
📍 Pickup Location: ${pickup || "To be confirmed"}
🏁 Drop / Destination: ${destination || "To be confirmed"}
📅 Date: ${date || "To be confirmed"}
⏰ Time: ${time || "To be confirmed"}
🚘 Vehicle: ${selectedCar}
👥 Passengers: ${booking.passengers}
🏷️ Service / Request: ${booking.service}
${booking.note ? `📝 Additional Requirement: ${booking.note}\n` : ""}
🌐 Source: mahakaltours website

✅ Please contact the customer to confirm availability and final fare.`;

    window.open(`https://wa.me/917620611548?text=${encodeURIComponent(message)}`, "_blank");
    setShowBookingForm(false);
    setBooking({ name: "", phone: "", passengers: "", service: "", note: "" });
  };

  return (
    <main className="routes-page">
      <section className="routes-hero">
        <div className="container routes-hero-inner">
          <div>
            <div className="kicker">Mahakal Routes & Fares</div>
            <h1>Clear fares for<br /><span>every journey.</span></h1>
            <p>Compare one-way routes, round-trip packages and Pune drops before you book.</p>
          </div>
          <div className="routes-hero-card">
            <CheckCircle2 size={20} />
            <strong>Transparent pricing</strong>
            <span>Final fare confirmed before every booking</span>
          </div>
        </div>
      </section>

      <section className="cab-fares-section routes-fares-section">
        <div className="container">
          <section className="priority-packages" aria-labelledby="priority-packages-title">
            <div className="priority-packages-heading">
              <div>
                <div className="kicker">Most Popular Packages</div>
                <h2 id="priority-packages-title">Start with a package that <span>fits your trip.</span></h2>
                <p>Choose a clear round-trip or local package first, then select the vehicle that suits your group.</p>
              </div>
              <div className="priority-badge"><CheckCircle2 size={16} /> Best value for planned trips</div>
            </div>
            <div className="package-grid priority-package-grid">
              <PackageCard label="SEDAN" title="Comfort Sedan" models="Swift Dzire • Hyundai Aura • Toyota Etios • Hyundai Xcent" price="₹13" details={["Toll / Parking extra", "₹500 per night halt", "₹300 driver allowance / day"]} onBook={bookRoute} />
              <PackageCard featured label="SUV" title="Family SUV" models="Ertiga • Kia Carens" price="₹15" details={["Toll / Parking extra", "₹700 per night halt", "₹300 driver allowance / day"]} onBook={bookRoute} />
              <PackageCard label="LARGE SUV" title="Premium Large SUV" models="Toyota Innova • Toyota Innova Crysta" price="₹20" details={["Toll / Parking extra", "₹1,000 per night halt", "₹300 driver allowance / day"]} onBook={bookRoute} />
            </div>
          </section>

          <section className="priority-route-fares" aria-labelledby="priority-route-fares-title">
            <div className="priority-route-heading">
              <div>
                <div className="kicker">Popular One-Way Routes</div>
                <h2 id="priority-route-fares-title">Your route. <span>Your fare.</span></h2>
                <p>Popular one-way fares from Ahilyanagar, shown upfront before you choose a cab.</p>
              </div>
              <span className="fare-heading-note">Toll / parking extra</span>
            </div>
            <div className="priority-route-groups">
              <RouteGroup title="Comfort Sedan" category="SEDAN · ₹13/km" models="Swift Dzire • Aura • Etios • Xcent" fares={[["Ahilyanagar → Pune", "₹2,200"], ["Ahilyanagar → Mumbai", "₹5,000"], ["Ahilyanagar → Nashik", "₹3,000"], ["Ahilyanagar → Sambhajinagar", "₹2,200"], ["Ahilyanagar → Shirdi", "₹2,200"]]} onBook={bookRoute} />
              <RouteGroup title="Family SUV" category="SUV · ₹15/km" models="Ertiga • Kia Carens" fares={[["Ahilyanagar → Pune", "₹3,000"], ["Ahilyanagar → Mumbai", "₹6,000"], ["Ahilyanagar → Nashik", "₹4,000"], ["Ahilyanagar → Sambhajinagar", "₹3,000"], ["Ahilyanagar → Shirdi", "₹3,000"]]} onBook={bookRoute} />
              <RouteGroup title="Premium Large SUV" category="LARGE SUV · ₹20/km" models="Innova • Innova Crysta" fares={[["Ahilyanagar → Pune", "₹6,000"], ["Ahilyanagar → Mumbai", "₹1,10,000"], ["Ahilyanagar → Nashik", "₹7,000"], ["Ahilyanagar → Sambhajinagar", "₹6,000"], ["Ahilyanagar → Shirdi", "₹6,000"]]} onBook={bookRoute} />
            </div>
          </section>

          <section className="cab-results-section" aria-labelledby="available-cabs-title">
            <div className="cab-results-heading">
              <div>
                <div className="kicker">Available Cabs</div>
                <h2 id="available-cabs-title">Choose your <span>perfect ride.</span></h2>
                <p>{pickup && destination ? `${pickup} → ${destination}` : "Comfortable rides for every kind of journey"}</p>
              </div>
              <div className="cab-results-summary"><strong>{trip}</strong><span>{date ? `${date}${time ? ` · ${time}` : ""}` : "Flexible travel plans"}</span></div>
            </div>

            <div className="cab-filters" role="tablist" aria-label="Filter available cabs">
              {["All", "Sedan", "SUV", "Large SUV", "Traveller"].map((filter) => (
                <button key={filter} type="button" className={activeFilter === filter ? "active" : ""} onClick={() => setActiveFilter(filter)} role="tab" aria-selected={activeFilter === filter}>
                  {filter === "All" ? "All vehicles" : filter}
                </button>
              ))}
            </div>

            <div className="cab-results-grid">
              {visibleCars.map((car) => (
                <article className="cab-result-card" key={car.name}>
                  <div className="cab-result-image"><img src={car.image} alt={car.name} /><span>{car.type}</span></div>
                  <div className="cab-result-body"><div className="cab-result-title"><div><h3>{car.name}</h3><p>{car.description}</p></div><span><Users size={13} />{car.seats}</span></div><div className="cab-result-price"><strong>{car.price}</strong><small>{car.priceNote}</small></div><div className="cab-result-features"><span><Wind size={13} />AC available</span><span>Clean vehicle</span><span>Verified driver</span></div><button className="cab-result-book" onClick={() => bookCar(car)}>Book this cab <ArrowRight size={15} /></button></div>
                </article>
              ))}
            </div>
          </section>

          <div className="cab-fares-head">
            <div>
              <div className="kicker">Cab Fares & Packages</div>
              <h2>Simple Rates. <span>Clear Pricing.</span></h2>
              <p>Choose your cab category and check our one-way and round-trip travel rates.</p>
            </div>
            <div className="fare-note"><CheckCircle2 size={17} /><span>Transparent pricing</span></div>
          </div>

          <div className="fare-category-grid">
            <div className="fare-category-card"><span className="fare-category-label">SEDAN</span><h3>Comfort Sedan</h3><p>Swift Dzire • Hyundai Aura • Toyota Etios • Hyundai Xcent</p></div>
            <div className="fare-category-card featured"><span className="fare-category-label">SUV</span><h3>Family SUV</h3><p>Ertiga • Kia Carens</p></div>
            <div className="fare-category-card"><span className="fare-category-label">LARGE SUV</span><h3>Premium Large SUV</h3><p>Toyota Innova • Toyota Innova Crysta</p></div>
          </div>

          <div className="fare-block-heading secondary-oneway-heading"><div><span>01</span><div><h3>One Way Cab Fares</h3><p>Popular routes from Ahilyanagar</p></div></div><span className="fare-heading-note">One-way drop</span></div>

          <div className="fare-route-groups secondary-oneway-groups">
            <RouteGroup title="Comfort Sedan" category="SEDAN" models="Swift Dzire • Aura • Etios • Xcent" fares={[["Ahilyanagar → Pune", "₹2,200"], ["Ahilyanagar → Mumbai", "₹5,000"], ["Ahilyanagar → Nashik", "₹3,000"], ["Ahilyanagar → Sambhajinagar", "₹2,200"], ["Ahilyanagar → Shirdi", "₹2,200"]]} onBook={bookRoute} />
            <RouteGroup title="Family SUV" category="SUV" models="Ertiga • Kia Carens" fares={[["Ahilyanagar → Pune", "₹3,000"], ["Ahilyanagar → Mumbai", "₹6,000"], ["Ahilyanagar → Nashik", "₹4,000"], ["Ahilyanagar → Sambhajinagar", "₹3,000"], ["Ahilyanagar → Shirdi", "₹3,000"]]} onBook={bookRoute} />
            <RouteGroup title="Premium Large SUV" category="LARGE SUV" models="Innova • Innova Crysta" fares={[["Ahilyanagar → Pune", "₹6,000"], ["Ahilyanagar → Mumbai", "₹1,10,000"], ["Ahilyanagar → Nashik", "₹7,000"], ["Ahilyanagar → Sambhajinagar", "₹6,000"], ["Ahilyanagar → Shirdi", "₹6,000"]]} onBook={bookRoute} />
          </div>

          <div className="fare-return-note secondary-oneway-return"><ArrowRight size={17} /><div><strong>Return trips available</strong><span>Same route rates are applicable for return travel.</span></div></div>

          <div className="fare-block-heading round-trip-heading"><div><span>02</span><div><h3>Round Trip & Local Packages</h3><p>Ideal for sightseeing, family trips and multi-day travel.</p></div></div></div>
          <div className="package-grid secondary-package-grid">
            <PackageCard label="SEDAN" title="Comfort Sedan" models="Swift Dzire • Hyundai Aura • Toyota Etios • Hyundai Xcent" price="₹13" details={["Toll / Parking extra", "₹500 per night halt", "₹300 driver allowance / day"]} onBook={bookRoute} />
            <PackageCard featured label="SUV" title="Family SUV" models="Ertiga • Kia Carens" price="₹15" details={["Toll / Parking extra", "₹700 per night halt", "₹300 driver allowance / day"]} onBook={bookRoute} />
            <PackageCard label="LARGE SUV" title="Premium Large SUV" models="Toyota Innova • Toyota Innova Crysta" price="₹20" details={["Toll / Parking extra", "₹1,000 per night halt", "₹300 driver allowance / day"]} onBook={bookRoute} />
          </div>

          <div className="pune-fares-box">
            <div className="pune-fares-head"><div><div className="kicker">Additional Routes</div><h3>Pune One Way Fares</h3><p>Direct drop rates from Pune to popular destinations.</p></div><div className="pune-route-badge">Pune <ArrowRight size={14} /> Maharashtra</div></div>
            <div className="pune-fare-table-wrap"><table className="pune-fare-table"><thead><tr><th>Route</th><th>Sedan</th><th>SUV</th><th>Large SUV</th><th>Action</th></tr></thead><tbody>
              <FareRow route="Pune → Ahilyanagar" prices={["₹2,200", "₹3,000", "₹6,000"]} onBook={bookRoute} />
              <FareRow route="Pune → Shirdi" prices={["₹3,000", "₹4,000", "₹6,000"]} onBook={bookRoute} />
              <FareRow route="Pune → Sambhajinagar" prices={["₹3,300", "₹4,000", "₹7,000"]} onBook={bookRoute} />
              <FareRow route="Pune → Nashik" prices={["₹3,000", "₹4,000", "₹7,000"]} onBook={bookRoute} />
            </tbody></table></div>
          </div>
          <div className="fare-important-note"><strong>Important:</strong> Toll, parking and other applicable charges are extra as mentioned above. Please confirm the final fare at the time of booking.</div>
        </div>
      </section>

      {showBookingForm && (
        <div className="booking-overlay">
          <div className="booking-modal routes-booking-modal">
            <div className="booking-header">
              <div>
                <div className="kicker">Mahakal Tours and Travels</div>
                <h2>Complete Your Booking</h2>
                <p>Your trip details are already selected. Add your contact details to continue on WhatsApp.</p>
              </div>
              <button type="button" className="booking-close" onClick={() => setShowBookingForm(false)} aria-label="Close booking form"><X size={22} /></button>
            </div>

            <form className="booking-form" onSubmit={submitBooking}>
              <div className="selected-car-notice"><CarIcon /><div><small>Selected vehicle</small><strong>{selectedCar}</strong></div></div>

              <div className="booking-section-title"><span>01</span> Customer Details</div>
              <div className="booking-grid">
                <div className="booking-field"><label htmlFor="route-name">Full Name <span>*</span></label><input id="route-name" name="name" value={booking.name} onChange={updateBooking} placeholder="Enter your full name" required /></div>
                <div className="booking-field"><label htmlFor="route-phone">Mobile Number <span>*</span></label><input id="route-phone" name="phone" type="tel" inputMode="numeric" maxLength="10" pattern="[0-9]{10}" value={booking.phone} onChange={updateBooking} placeholder="10-digit mobile number" required /></div>
              </div>

              <div className="booking-section-title"><span>02</span> Selected Trip</div>
              <div className="route-booking-summary"><div><small>Route</small><strong>{pickup || "To be confirmed"} → {destination || "To be confirmed"}</strong></div><div><small>Schedule</small><strong>{date || "Date pending"}{time ? ` · ${time}` : ""}</strong></div></div>

              <div className="booking-section-title"><span>03</span> Travel Details</div>
              <div className="booking-grid">
                <div className="booking-field"><label htmlFor="route-passengers">Passengers <span>*</span></label><select id="route-passengers" name="passengers" value={booking.passengers} onChange={updateBooking} required><option value="">Select passengers</option>{[1, 2, 3, 4, 5, 6, 7, "8-17"].map((count) => <option key={count} value={count}>{count} {count === 1 ? "Passenger" : "Passengers"}</option>)}</select></div>
                <div className="booking-field"><label htmlFor="route-service">Service <span>*</span></label><select id="route-service" name="service" value={booking.service} onChange={updateBooking} required><option value="">Select service</option><option>One Way Trip</option><option>Round Trip</option><option>Local Travel</option><option>Airport Transfer</option><option>Family Tour</option></select></div>
              </div>
              <div className="booking-field booking-full"><label htmlFor="route-note">Additional Requirement</label><textarea id="route-note" name="note" value={booking.note} onChange={updateBooking} placeholder="Any special requirement or pickup information..." rows="3" /></div>

              <div className="booking-submit-area"><p><MessageCircle size={16} /> Your details will be sent securely to WhatsApp.</p><button type="submit" className="booking-submit"><MessageCircle size={19} /> Send Booking on WhatsApp <ArrowRight size={17} /></button></div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

const CarIcon = () => <span aria-hidden="true" className="booking-car-icon"><Phone size={16} /></span>;

const RouteGroup = ({ category, title, models, fares, onBook }) => (
  <div className="fare-route-group"><div className="fare-group-title"><small>{category}</small><strong>{title}</strong><span>{models}</span></div><div className="fare-route-list">{fares.map(([route, price]) => <div key={route}><span>{route}</span><strong>{price}</strong><button onClick={() => onBook(route)}>Book</button></div>)}</div></div>
);

const PackageCard = ({ featured, label, title, models, price, details, onBook }) => (
  <article className={`package-card${featured ? " featured" : ""}`}>{featured && <div className="package-popular">Popular Choice</div>}<div className="package-top"><div><span className="package-label">{label}</span><h3>{title}</h3><p>{models}</p></div><div className="package-price"><strong>{price}</strong><span>/ km</span></div></div><div className="package-divider" /><ul className="package-list">{details.map((detail) => <li key={detail}><CheckCircle2 size={16} />{detail}</li>)}</ul><button className="package-book" onClick={() => onBook(title)}>Book {title} <ArrowRight size={16} /></button></article>
);

const FareRow = ({ route, prices, onBook }) => <tr><td>{route}</td>{prices.map((price) => <td key={price}>{price}</td>)}<td><button onClick={() => onBook(route)}>Book</button></td></tr>;

export default Routes;
