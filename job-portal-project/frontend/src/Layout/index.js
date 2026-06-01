import React from "react";
import Navbar from "../components/Navbar/Navbar"; // Pastikan file Navbar.js ada di sini
import Footer from "../components/Footer/Footer"; // Mengarah ke file baru yang dibuat di atas
import Container from "../components/Container";

/**
 * Component Layout Global
 * Menjaga tampilan aplikasi tetap konsisten (Navbar & Footer selalu muncul)
 */
function Layout({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0a0502' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '20px 0' }}>
        <Container>
          {children}
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;