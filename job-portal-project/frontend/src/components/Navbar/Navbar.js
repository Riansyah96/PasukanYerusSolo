import React from "react";
import { Link } from "react-router-dom"; // WAJIB: Ganti <a> tag dengan <Link> sesuai arahan dosen

function Navbar() {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', background: '#110a05', borderBottom: '1px solid #291a0e' }}>
      <div style={{ color: '#ea580c', fontWeight: '800', fontSize: '20px' }}>PasukanYerusSolo</div>
      <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', margin: 0, padding: 0 }}>
        <li><Link to="/" style={{ color: '#fef3c7', textDecoration: 'none' }}>Home</Link></li>
        <li><Link to="/login" style={{ color: '#fef3c7', textDecoration: 'none' }}>Masuk</Link></li>
        <li><Link to="/register" style={{ color: '#fef3c7', textDecoration: 'none' }}>Daftar</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;