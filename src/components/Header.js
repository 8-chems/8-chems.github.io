import React, { useEffect, useState } from "react";
import { Github, Linkedin, Pen } from 'lucide-react';

const Header = () => {
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/8-chems/myportfolio-src/main/data/info.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setLocation(data.city || "Location unavailable");
      })
      .catch((err) => {
        console.error("Error loading info.json:", err);
        setLocation("Location unavailable");
      });
  }, []);

  const socialLinks = [
    {
      href: "https://linkedin.com/in/8-chems",
      ariaLabel: "LinkedIn",
      Icon: Linkedin,
    },
    {
      href: "https://github.com/8-chems",
      ariaLabel: "GitHub",
      Icon: Github,
    },
    {
      href: "https://8-chems.blogspot.com",
      ariaLabel: "Blogger",
      Icon: Pen,
    },
    {
      href: "https://www.kaggle.com/bchems",
      ariaLabel: "Kaggle",
      Icon: () => (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          style={{ fill: "none", stroke: "white", strokeWidth: 2 }}
        >
          <path d="M5 3v18M5 3l8 9-8 9" />
          <path d="M13 12h6a2 2 0 0 0 2-2V5" />
        </svg>
      ),
    },
  ];

  return (
    <header
      className="header relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${
          process.env.PUBLIC_URL + "/images/annaba.jpg"
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "2rem 1rem",
        color: "white",
      }}
    >
      <div className="intro text-center">
        <div className="logo-container">
          <img
            src={process.env.PUBLIC_URL + "/images/meme.jpeg"}
            alt="Logo"
            className="rounded-logo"
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              border: "3px solid white",
              objectFit: "cover",
            }}
          />
        </div>
        <h2 className="responsive-text mt-3">Chemseddine Berbague</h2>
        <h3 className="responsive-text">Data Scientist & Developer</h3>
        <h4 className="responsive-text">{location}</h4>
      </div>

      <div className="socials-bottom">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.ariaLabel}
            className="social-icon"
          >
            <link.Icon size={32} className={link.ariaLabel === "Kaggle" ? "kaggle-icon" : ""} />
          </a>
        ))}
      </div>
    </header>
  );
};

export default Header;