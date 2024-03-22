import React from "react";
import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { HiMail } from "react-icons/hi";
import "./Footer.scss";
import creditCardImg from "../../assets/creditcardicons.png";

function Footer() {
  return (
    <footer className="Footer">
      <div className="container">
        <div className="content">
          <div className="footer-left">
            <h3 className="title">Follow us</h3>
            <ul className="follow">
              <li className="hover-link center">
                <a href="https://www.linkedin.com/in/dukesoni/">
                  <AiFillLinkedin />
                </a>
              </li>
              <li className="hover-link center">
                <a href="https://www.instagram.com/duke_s0nii/">
                  <AiFillInstagram />
                </a>
              </li>
              <li className="hover-link center">
                <a href="https://wa.me/7378167164">
                  <IoLogoWhatsapp />
                </a>
              </li>
              <li className="hover-link center">
                <a href="mailto:dukesoni05@gmail.com">
                  <HiMail />
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-right">
            <h3 className="title">Company</h3>
            <ul className="company">
              <li className="hover-link">Contact Us</li>
              <li className="hover-link">Privacy Policy</li>
              <li className="hover-link">Returns And Exchange Policy</li>
              <li className="hover-link">Shipping Policy</li>
              <li className="hover-link">Terms & Conditions</li>
            </ul>
          </div>
        </div>
        <div className="subfooter center">
          <div className="credit-card-img">
            <img src={creditCardImg} alt="credit card img" />
          </div>
          {/*when website loads after a year, the year gets updated using getfullYear function  */}
          <p>
            Copyright {new Date().getFullYear()} © <strong>Posterz.</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
