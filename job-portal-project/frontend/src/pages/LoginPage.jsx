import React from "react";
import Login from "../features/auth/Login";

function LoginPage({ onLoginSuccess }) {
  // Meneruskan fungsi sukses login ke dalam komponen utama form
  return <Login onLoginSuccess={onLoginSuccess} />;
}

export default LoginPage;