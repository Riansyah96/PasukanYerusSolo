import React from "react";
import JobListContainer from "../features/eksplorasi/JobListContainer"; // Sambungkan ke container eksplorasi lama Anda

function Home() {
  return (
    <div>
      <h1 style={{ color: "#fef3c7", margin: "0 0 10px 0", fontWeight: "800" }}>Eksplorasi Lowongan Kerja</h1>
      <JobListContainer appTheme="dark" />
    </div>
  );
}

export default Home;