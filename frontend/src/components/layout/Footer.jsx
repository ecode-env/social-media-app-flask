import React from 'react';
import '../../styles/footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© {year} SocialApp. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
