import React from "react";

const Breadcrumb = () => {
  const breadcrumbItems = [
    { label: "HOME", href: "?" },
    { label: "Biography", isActive: true },
  ];

  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      {breadcrumbItems.map((item, index) => (
        <span key={index} className={item.isActive ? "breadcrumb-item active" : "breadcrumb-item"}>
          <a href={item.href} aria-current={item.isActive ? "page" : undefined}>
            {item.label}
          </a>
          {index < breadcrumbItems.length - 1 && <span className="separator"> / </span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
