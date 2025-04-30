// IMPORTS
import "./MedicineIndexPage.css";
import { useState, useEffect } from "react"

// APIs
import * as medicineAPI from "../../utilities/medicine-api";

export default function MedicineIndexPage() {
    const [allMedicines, setAllMedicines] = useState([])

    useEffect(() => {
        async function getAllMedicines() {
            try {
                const medicines = await medicineAPI.index();
                setAllMedicines(medicines);
            } catch (err) {
                console.log(err);
                setAllMedicines([]);
            }
        }
        getAllMedicines();
    }, [])

    return (<>
            <h1>Medicines</h1>
        <section className="medicine-index-card-container">
            {allMedicines.map(medicines => (
                <div key={medicines.id} className="medicines-index-card">
                    <div className="medicines-index-card-content">
                        <img src={medicines.photo} alt={`A photo of ${medicines.name}`} className="usr-img" />
                        <h2>{medicines.name}</h2>
                        <p><span>description:</span> {medicines.description}</p>
                        <p><span>price:</span> {medicines.price} <span>SAR</span></p>
                    </div>
                </div>
            ))}
        </section>
    </>)
}