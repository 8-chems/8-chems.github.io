import React, { useState } from 'react';

const ContactSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Submit the form via Formspree or any backend service
    const form = e.target;

    fetch(form.action, {
      method: form.method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    })
      .then((response) => {
        if (response.ok) {
          setIsSubmitted(true); // Set the state to submitted
        } else {
          alert('Failed to send message. Please try again later.');
        }
      })
      .catch(() => {
        alert('Failed to send message. Please try again later.');
      });
  };

  return (
    <div className="contact-section">
      {/* Contact Info Section */}
      <div className="contact-info">
        <h2>Contact Information</h2>
        <ul className="contact-info-list">
          <li>
            <strong>Email:</strong>{' '}
            <a href="mailto:8.chems@gmail.com" className="contact-link">
              8.chems@gmail.com
            </a>
          </li>
          <li>
            <strong>LinkedIn:</strong>{' '}
            <a
              href="https://www.linkedin.com/in/8-chems"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <strong>Portfolio:</strong>{' '}
            <a
              href="https://www.kaggle.com/bchems"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              Kaggle
            </a>
          </li>
          <li>
            <strong>School Website:</strong>{' '}
            <a
              href="https://talents.estin.dz/scolar/enseignant_detail/141/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              ESTIN
            </a>
          </li>
        </ul>
      </div>

      {/* Contact Form Section */}
      <div className="contact-form">
        <h2>Get in Touch</h2>
        {isSubmitted ? (
          <div className="thank-you-message">
            <h3>Thank you!</h3>
            <p>Your message has been successfully sent. I'll get back to you soon!</p>
          </div>
        ) : (
          <form
            action="https://formspree.io/f/mjkvaayv"
            method="POST"
            className="form-container"
            aria-labelledby="contact-form-title"
            onSubmit={handleFormSubmit}
          >
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Write your message here"
                required
                className="form-textarea"
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactSection;
