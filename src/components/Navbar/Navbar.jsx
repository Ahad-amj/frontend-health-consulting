import { useNavigate, Link } from "react-router";
import "./Navbar.css"
// APIs
import * as usersAPI from "../../utilities/users-api";

export default function Navbar({ user, setUser }) {
    const navigate = useNavigate();

    // will refresh state and set us back to home without a user
    function handleLogout() {
        usersAPI.logout()
        setUser(null);
        navigate("/")
    }

    if (user) {
        return (
            <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/doctors">Doctors</Link></li>
                <li><Link to="/medicines">pharmacy</Link></li>
                <form id="logout-form" onSubmit={handleLogout}>
                    <button type="submit">Log out</button>
                </form>
            </>
        )
    }

    if (!user)
        return (
            <>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/signup">SignUp</Link></li>
            </>
        )

}