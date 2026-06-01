import React from 'react';

function Footer() {
  return (
    <footer style={{ 
      textAlign: 'center', 
      padding: '20px', 
      background: '#110a05', 
      color: '#9ca3af',
      borderTop: '1px solid #291a0e',
      fontSize: '14px',
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    }}>
      &copy; {new Date().getFullYear()} PasukanYerusSolo. All Rights Reserved.
    </footer>
  );
}

export default Footer;