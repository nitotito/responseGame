// HomePage.jsx
import React from "react";
import PrincipalPage from "../PrincipalPage/PrincipalPage";
import PrincipalButton from "../PrincipalButton/PrincipalButton";
import './HomePage.css';

const HomePage = () => (
    <div className="landingcontainer">
        <PrincipalPage />
        <PrincipalButton />
    </div>
);

export default HomePage;