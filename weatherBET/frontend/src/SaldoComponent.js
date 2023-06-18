import React from "react";

export default function CityComponent({ saldo, handleClick }) {  
  
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <h3 style={{ color: '#f00606' }} >Twoje saldo : {saldo}</h3>
      <h3>  "  "  </h3>
      <button className="button green" style={{ marginLeft: "auto" }} onClick={handleClick}>Wyloguj</button>
    </div>
  );
  }