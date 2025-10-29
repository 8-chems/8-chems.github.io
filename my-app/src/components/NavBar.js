import React, { useState } from "react";
import LOGO from "./sections/logo";

function NavBar({ onNavClick }) {
  const [activePage, setActivePage] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { page: 1, label: "Biography" },
    { page: 2, label: "Education" },
    { page: 3, label: "Research Interest" },
    { page: 4, label: "Experiences" },
    { page: 5, label: "Research Work" },
    { page: 6, label: "Skills" },
    { page: 7, label: "Projects" },
    { page: 8, label: "News" },
    { page: 9, label: "Tools", disabled: true },
    { page: 10, label: "Lectures", link: "https://8-chems.github.io/lectures/" },
    { page: 11, label: "CV" },
    { page: 12, label: "Contact" },
  ];

  const handleClick = (item) => {
    setActivePage(item.page);
    setIsCollapsed(false);

    if (item.link) {
      // Redirect to external Quarto page
      window.location.href = item.link;
    } else {
      // Notify parent for normal internal navigation
      onNavClick(item.label);
    }
  };

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top shadow-sm">
      <div className="container-fluid">
        {/* Brand Logo */}
        <a className="navbar-brand" href="#">
          <LOGO />
        </a>

        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
          aria-controls="navbarToggler"
          aria-expanded={isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Menu */}
        <div
          className={`collapse navbar-collapse ${isCollapsed ? "show" : ""}`}
          id="navbarToggler"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {menuItems.map((item) => (
              <li className="nav-item" key={item.page}>
                <a
                  href={item.link || "#"}
                  className={`nav-link ${activePage === item.page ? "active" : ""} ${
                    item.disabled ? "disabled" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!item.disabled) handleClick(item);
                  }}
                  aria-disabled={item.disabled}
                  tabIndex={item.disabled ? -1 : 0}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
