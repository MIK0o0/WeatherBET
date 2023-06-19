import React, { useState } from "react";
import axiosInstance from './axiosInstance';
import './popupLayout.css'

export default function CityComponent({ cityName, cityAPI, yesCourse, noCourse, yesClick, noClick }) {
    const [showPopup, setShowPopup] = useState(false);
    const [popupHeader, setPopupHeader] = useState(null)
    const [popupMessage, setPopupMessage] = useState(null)
    const [value, setValue] = useState(0);

    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue >= 0) {
            setValue(parseInt(inputValue));
        }

        console.log(value)
    };

    const makeBet = (course, amount, bet_type) => {
        const reward = (amount*course).toFixed(2);
        axiosInstance.post(
          "/user/bet",
          {
            bet_type: bet_type,
            city_name: cityAPI,
            amount: amount,
            reward:reward
          }
        ).then(response => {
            setPopupHeader(response.data.header);
          setPopupMessage(response.data.message);
          })
        .catch(error => {
          setPopupHeader(error.response.data.header);
          setPopupMessage(error.response.data.message);
        });
    
    }

    return (
        <div className="city-component">
            <div className="color-container">
            <h3>{cityName}</h3>
            <h3>Czy będzie tam dzisiaj padać?</h3>
            <input type="number" width="5px" step="1" value={value} onChange={handleInputChange} />
            <div className="button-container">
                 <button className="button green" onClick={() => {makeBet(yesCourse, value, true);  openPopup();}}> 
                    TAK <br /> {yesCourse}
                </button>
                <button className="button red" onClick={() => {makeBet(noCourse, value, false);  openPopup();}}>
                    PRZEJDZIE <br /> BOKIEM<br /> {noCourse}
                </button>
            </div>
            </div>
            {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>{popupHeader}</h2>
            <p>{popupMessage}</p>
            <button onClick={() => {yesClick(); closePopup();}}>Zamknij</button>
          </div>
        </div>
      )}
        </div>
    );
}