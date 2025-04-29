import "./HomePage.css";
import logo from "../../assets/images/logo.png"; 

export default function HomePage() {
    return (
        <div className="home-page-container">
            <header className="home-header">
                <img src={logo} alt="HealthConsulting Logo" className="home-logo" />
                <h1>Welcome to DocLink</h1>
            </header>
            <p>Your trusted partner for health advice, consultations, and medical guidance.</p>
        </div>
    );
}
