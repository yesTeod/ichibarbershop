import React from "react";
import { Link } from "react-router-dom";

const NAVIGATION_ITEMS = [
  { path: "", label: "НАЧАЛО" },
  { path: "about", label: "ЗА МЕН" },
  { path: "services", label: "УСЛУГИ" },
  { path: "contacts", label: "КОНТАКТИ" }
];

const Header = () => {
  return (
    <header className="headergrid">
      <Link to="" className="brand">
        <div>
          <h1>ICHI</h1>
          <h4>BARBERSHOP</h4>
        </div>
      </Link>
      
      <nav>
        {NAVIGATION_ITEMS.map(({ path, label }) => (
          <Link 
            key={path} 
            to={path} 
            className="adivh3"
          >
            <div className="divheader3">{label}</div>
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;