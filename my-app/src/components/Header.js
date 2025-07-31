import React, { useEffect, useState } from "react";

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
      href: "https://github.com/8-chems",
      ariaLabel: "GitHub",
      svgPath: (
        <path d="M50 0C22.4 0 0 22.4 0 50c0 22.1 14.3 40.8 34.2 47.4 2.5.4 3.4-1.1 3.4-2.4v-8.5c-13.9 3-16.8-6.7-16.8-6.7-2.3-5.9-5.6-7.5-5.6-7.5-4.6-3.1.3-3.1.3-3.1 5 .3 7.6 5.1 7.6 5.1 4.5 7.6 11.8 5.4 14.7 4.1.5-3.2 1.8-5.4 3.2-6.6-11.1-1.3-22.8-5.6-22.8-24.7 0-5.5 2-10 5.1-13.6-.5-1.3-2.2-6.4.5-13.4 0 0 4.2-1.3 13.8 5.1 4-1.1 8.2-1.7 12.4-1.7s8.4.6 12.4 1.7c9.6-6.4 13.8-5.1 13.8-5.1 2.7 7 1 12.1.5 13.4 3.2 3.6 5.1 8.1 5.1 13.6 0 19.2-11.7 23.4-22.9 24.7 1.8 1.5 3.4 4.4 3.4 8.9v13.2c0 1.3.9 2.8 3.4 2.4C85.7 90.8 100 72.1 100 50 100 22.4 77.6 0 50 0z" />
      )
    },
    {
      href: "https://chemseddineberbague.substack.com",
      ariaLabel: "Blog",
      svgPath: (
        <path d="M10 20h80v10H10V20zm0 20h80v10H10V40zm0 20h80v10H10V60z" />
      )
    },
    {
      href: "https://linkedin.com/in/chemseddine",
      ariaLabel: "LinkedIn",
      svgPath: (
        <path d="M20 35h10v40H20zM25 25a6 6 0 110-12 6 6 0 010 12zM40 35h10v5.7c1.4-2.3 4.3-5.7 10.3-5.7 7.5 0 11.7 5 11.7 13v27h-10V49.5c0-4-1.4-6.5-5.3-6.5-2.9 0-4.7 2-5.5 4V75H40z" />
      )
    },
    {
      href: "https://scholar.google.com/citations?user=your-google-scholar-id",
      ariaLabel: "Google Scholar",
      svgPath: (
        <path d="M28 88V64l22-36 22 36v24H28zm3-3h38V67L50 34 31 67v18z" />
      )
    },
    {
      href: "https://your-blog.blogspot.com",
      ariaLabel: "Google Blogger",
      svgPath: (
        <path d="M80 20H20v60h60V20zM45 35c5.5 0 10 4.5 10 10s-4.5 10-10 10H35V35h10zm20 30c5.5 0 10 4.5 10 10s-4.5 10-10 10H35V65h30z" />
      )
    }
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
        color: "white"
      }}
    >
      <style>
        {`
          .social-icon-bottom, .social-icon-bottom svg {
            color: white !important;
            fill: white !important;
          }
          .social-icon-bottom:hover svg {
            fill: white !important;
          }
        `}
      </style>
      {/* Profile Info */}
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
              objectFit: "cover"
            }}
          />
        </div>
        <h2 className="responsive-text mt-3">Chemseddine Berbague</h2>
        <h3 className="responsive-text">Data Scientist & Developer</h3>
        <h4 className="responsive-text">{location}</h4>
      </div>

      {/* Social Icons at Bottom Centered */}
      <div className="socials-bottom" style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.ariaLabel}
            className="social-icon-bottom"
            style={{ color: "white" }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              style={{ fill: "white" }}
            >
              {link.svgPath}
            </svg>
          </a>
        ))}
      </div>
    </header>
  );
};

export default Header;