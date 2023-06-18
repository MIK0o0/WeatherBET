import React, { useState } from "react";
import './popupLayout.css'

export default function CityComponent({ cityName, yesCourse, noCourse, yesClick, noClick }) {
    const [showPopup, setShowPopup] = useState(false);

    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleButton1Click = () => {
        // Obsługa kliknięcia guzika 1
        console.log("Kliknięto guzik 1");
    };

    const handleButton2Click = () => {
        // Obsługa kliknięcia guzika 2
        console.log("Kliknięto guzik 2");
    };

    const [value, setValue] = useState(0);

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue >= 0) {
            setValue(parseInt(inputValue));
        }

        console.log(value)
    };

    return (
        <div className="city-component">
            <h3>{cityName}</h3>
            <h3>Czy będzie tam dzisiaj padać?</h3>
            <input type="number" width="5px" step="1" value={value} onChange={handleInputChange} />
            <div className="button-container">
                <button className="button green" onClick={() => { yesClick(); openPopup(); }}>
                    TAK <br /> {yesCourse}
                </button>
                <button className="button red" onClick={handleButton2Click}>
                    PRZEJDZIE <br /> BOKIEM<br /> {noCourse}
                </button>
            </div>
            {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>To jest popup</h2>
            <p>Przykładowy tekst w popupie</p>
            <button onClick={closePopup}>Zamknij</button>
          </div>
        </div>
      )}
        </div>
    );
}