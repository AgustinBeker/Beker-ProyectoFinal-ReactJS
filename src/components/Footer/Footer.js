import './Footer.css'
import React from 'react'
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

export const Footer = () => {
    return (
    <div className="footer">
        <ul className="container-footer">
            <li>
                <a href="https://www.facebook.com/Agustin.Beker19">
                <FaFacebook className='icon'/>   </a>
            </li>
            <li>
                <a href="https://www.instagram.com/agustin.beker">
                <FaInstagram className='icon'/></a>
            </li>
            <li>
                <a href="https://api.whatsapp.com/send?phone=%2B5492325686594&text=Hola%21%0AMe+gustaria+pedirte+una+hamburguesa%21">
                <FaWhatsapp className='icon'/></a></li>
        </ul>
        <p>Designed & Developed by Agustin Beker - 2023</p>
    </div>
    );
};  