// IMPORTS
import "./HomePage.css";
import { useState } from "react";
import { useNavigate } from "react-router";

// IMAGES
import logo from "../../assets/images/logo.png";

// APIs
import * as usersAPI from "../../utilities/users-api";


export default function HomePage({ user, setUser }) {
    const initialState = { username: "", password: "" }
    const [formData, setFormData] = useState(initialState)
    const navigate = useNavigate()

    function handleChange(evt) {
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }


    async function handleLogin(evt) {
        try {
            evt.preventDefault();
            const loggedInUser = await usersAPI.login(formData);
            setUser(loggedInUser);
            navigate("/doctors");
        } catch (err) {
            setUser(null);
        }
    }

    return (<>
        <section className="logo-container">
            <div className="home-page-container">
                <header className="home-header">
                    <img src={logo} alt="HealthConsulting Logo" className="home-logo" />
                    <h1>Welcome to DocLink</h1>
                </header>
                <p>Your trusted partner for health advice, consultations, and medical guidance.</p>
            </div>
        </section>
        {!user &&
            <section className="login-wrapper">
                <form onSubmit={handleLogin} className="form-container-login">
                    <h1>Login</h1>
                    <p>
                        <label htmlFor="id_username">Username:</label>
                        <input value={formData.username} type="text" name="username" maxLength="150" required id="id_username" onChange={handleChange} />
                    </p>
                    <p>
                        <label htmlFor="id_password">Password:</label>
                        <input value={formData.password} type="password" name="password" required id="id_password" onChange={handleChange} />
                    </p>
                    <button type="submit" className="btn submit">Login</button>
                </form>
            </section>
        }
    </>)
}