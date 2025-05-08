// IMPORTS
import { useState } from "react";
import { useNavigate } from "react-router";
import "./SignupPage.css"

// IMAGES
import logo from "../../assets/images/logo.png";

// APIs
import * as usersAPI from "../../utilities/users-api.js"

export default function SignupPage({ setUser }) {
    const navigate = useNavigate();

    const initialState = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "patient",
        name: "",
        gender: "M",
        specialization: "",
        years_of_experience: "",
        hospital_affiliation: "",
    };

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData({ ...formData, [name]: value });
        checkErrors(evt);
    }

    function checkErrors({ target }) {
        const { name, value } = target;
        const newErrors = { ...errors };

        if (name === "username" && value.length < 3) {
            newErrors.username = "Username must be at least 3 characters.";
        } else {
            delete newErrors.username;
        }

        if (name === "password" && value.length < 3) {
            newErrors.password = "Password must be at least 3 characters.";
        } else {
            delete newErrors.password;
        }

        if (name === "confirmPassword" && value !== formData.password) {
            newErrors.confirmPassword = "Passwords do not match.";
        } else {
            delete newErrors.confirmPassword;
        }

        if (name === "email" && !value.includes("@")) {
            newErrors.email = "Invalid email.";
        } else {
            delete newErrors.email;
        }

        setErrors(newErrors);
    }

    async function handleSubmit(evt) {
        evt.preventDefault();

        try {
            const submitData = { ...formData };
            delete submitData.confirmPassword;

            const newUser = await usersAPI.signup(submitData);
            setUser(newUser);
            setFormData(initialState);
            navigate("/doctors");
        } catch (err) {
            console.error(err);
            setUser(null);
        }
    }

    const isDoctor = formData.role === "doctor";

    return (
        <div className="signup-page">
            <div className="page-header">
                <img src={logo} alt="logo" />
            </div>

            <form onSubmit={handleSubmit} className="form-container signup">
                <h1>Sign Up</h1>

                <label>
                    Role:
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                    </select>
                </label>

                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>

                <label>
                    Gender:
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </label>

                {isDoctor && (
                    <>
                        <label>
                            Specialization:
                            <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} />
                        </label>

                        <label>
                            Years of Experience:
                            <input type="number" name="years_of_experience" value={formData.years_of_experience} onChange={handleChange} />
                        </label>

                        <label>
                            Hospital Affiliation:
                            <input type="text" name="hospital_affiliation" value={formData.hospital_affiliation} onChange={handleChange} />
                        </label>
                    </>
                )}

                <label>
                    Username:
                    <input type="text" name="username" value={formData.username} onChange={handleChange} />
                    {errors.username && <p className="error">{errors.username}</p>}
                </label>

                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <p className="error">{errors.email}</p>}
                </label>

                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    {errors.password && <p className="error">{errors.password}</p>}
                </label>

                <label>
                    Confirm Password:
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                </label>

                <button type="submit" disabled={Object.keys(errors).length > 0}>
                    Submit
                </button>
            </form>
        </div>
    );
}
