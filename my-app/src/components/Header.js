import React, { useEffect, useState } from "react";

const Header = () => {
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/8-chems/myportfolio-src/main/data/info.json")
      .then((res) => res.json())
      .then((data) => {
        setLocation(data.city || "Location unavailable");
      })
      .catch((err) => {
        console.error("Error loading footer.json:", err);
        setLocation("Location unavailable");
      });
  }, []);

  const socialLinks = [/* ... your existing social links ... */];

  return (
    <header
      className="header"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${
          process.env.PUBLIC_URL + "/images/annaba.jpg"
        })`,
      }}
    >
      <div className="intro">
        <div className="logo-container">
          <a href="https://www.google.com/">
            <img
              src={process.env.PUBLIC_URL + "/images/meme.jpeg"}
              alt="Logo"
              className="rounded-logo"
            />
          </a>
        </div>
        <h2 className="responsive-text">Chemseddine Berbague</h2>
        <h3 className="responsive-text">Data Scientist & Developer</h3>
        <h3 className="responsive-text">{location}</h3> {/* ← From JSON */}
      </div>

      <div className="socials">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="social-link"
            aria-label={link.ariaLabel}
          >
            <div className="icon">
              <svg
                width="40px"
                height="40px"
                viewBox="0 0 115 115"
                xmlns="http://www.w3.org/2000/svg"
                className="social-icon"
              >
                {link.svgPath}
              </svg>
            </div>
          </a>
        ))}
      </div>
    </header>
  );
};

export default Header;
