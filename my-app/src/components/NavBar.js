import React, { useState } from "react";
import LOGO from './sections/logo';

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
    { page: 10, label: "Teaching Material" },
    { page: 11, label: "CV" },
    { page: 12, label: "Contact" },
  ];

  const handleClick = (page) => {
    setActivePage(page);
    setIsCollapsed(false); // Collapse the menu after clicking a link
    onNavClick(menuItems.find((item) => item.page === page).label); // Notify parent component
  };

  const toggleCollapse = () => {
    setIsCollapsed((prevState) => !prevState); // Toggle the collapsed state
  };

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
        <div className={`collapse navbar-collapse ${isCollapsed ? "show" : ""}`} id="navbarToggler">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {menuItems.map((item) => (
              <li className="nav-item" key={item.page}>
                <a
                  href="#"
                  className={`nav-link ${activePage === item.page ? "active" : ""} ${item.disabled ? "disabled" : ""}`}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default anchor behavior
                    if (!item.disabled) {
                      handleClick(item.page); // Handle click and notify parent
                    }
                  }}
                  aria-disabled={item.disabled}
                  tabIndex={item.disabled ? -1 : 0} // Prevent focus on disabled items
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