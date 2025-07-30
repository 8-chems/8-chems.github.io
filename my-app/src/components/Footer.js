import React, { useEffect, useState } from 'react';

const Footer = ({ isFullWidth }) => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/8-chems/myportfolio-src/main/data/info.json')
      .then((res) => res.json())
      .then((data) => setFooterData(data))
      .catch((err) => console.error("Failed to load footer data:", err));
  }, []);

  if (!footerData) return null;

  return (
    <footer className={isFullWidth ? 'footer-full-width' : 'footer'}>
      <div className="footer-wrapper">
        <p className="fs-5">
          <i className="fa fa-user"></i> {footerData.name}@{footerData.year}
        </p>
        <p>
          <i className="fa fa-phone"></i> {footerData.phone}
        </p>
        <p>
          <i className="fa fa-envelope-square"></i>{' '}
          <a href={`mailto:${footerData.email}`}>{footerData.email}</a>
        </p>
        <p>
          <i className="fa fa-map-marker"></i>{' '}
          <a href={footerData.labUrl}>
            {footerData.labName}, {footerData.institution}, {footerData.city}
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
