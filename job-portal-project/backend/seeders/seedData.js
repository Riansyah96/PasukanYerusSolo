const db = require('../config/db');
const bcrypt = require('bcryptjs');

async function runSeed() {
    try {
        console.log("Memulai seeding...");

        await db.query('DELETE FROM favorit'); // Hapus relasi dulu agar tidak error constraint
        await db.query('DELETE FROM lowongan');
        await db.query('DELETE FROM users');
        console.log("Data lama berhasil dihapus.");

        const password = await bcrypt.hash('password123', 10);
        await db.query('INSERT INTO users (nama, email, password, role) VALUES (?, ?, ?, ?)', 
            ['Admin Utama', 'admin@portal.com', password, 'Admin']);
        await db.query('INSERT INTO users (nama, email, password, role) VALUES (?, ?, ?, ?)', 
            ['HRD PasukanYerus', 'hrd@pasukanyerussolo.com', password, 'Perusahaan']);
        await db.query('INSERT INTO users (nama, email, password, role) VALUES (?, ?, ?, ?)', 
            ['Budi Pelamar', 'budi@gmail.com', password, 'Pelamar']);
        console.log("Data users berhasil dimasukkan.");

        const jobs = [
            ['Fullstack Developer', 'IT', 'Full-time', 'Rp 10.000.000', 'Membangun arsitektur web modern.'],
            ['Frontend Engineer', 'IT', 'Remote', 'Rp 12.000.000', 'Fokus pada UI interaktif.'],
            ['Backend Developer', 'IT', 'Full-time', 'Rp 9.000.000', 'Mengelola API dan database.'],
            ['DevOps Engineer', 'IT', 'Full-time', 'Rp 15.000.000', 'Manajemen server dan CI/CD.'],
            ['Marketing Specialist', 'Marketing', 'Full-time', 'Rp 6.500.000', 'Strategi konten digital.'],
            ['Social Media Manager', 'Marketing', 'Contract', 'Rp 5.500.000', 'Mengelola akun media sosial.'],
            ['Admin Operasional', 'Administrasi', 'Contract', 'Rp 4.500.000', 'Dukungan administratif.'],
            ['Finance Admin', 'Administrasi', 'Full-time', 'Rp 6.000.000', 'Input data keuangan.']
        ];

        for (const job of jobs) {
            await db.query(
                'INSERT INTO lowongan (judul_posisi, kategori, tipe_pekerjaan, gaji, deskripsi_pekerjaan) VALUES (?, ?, ?, ?, ?)', 
                job
            );
        }
        console.log("Data lowongan berhasil dimasukkan.");

        await db.query('DROP TABLE IF EXISTS testimonials');
        await db.query(
            `CREATE TABLE testimonials (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nama VARCHAR(255) NOT NULL,
                role VARCHAR(255) DEFAULT '',
                perusahaan VARCHAR(255) DEFAULT '',
                teks TEXT NOT NULL,
                rating INT DEFAULT 5,
                status ENUM('pending','approved','rejected') DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`
        );
        const testimonials = [
            ['Budi Pelamar', 'Fullstack Developer', 'PT Teknologi Maju', 'Platform ini sangat membantu saya mendapatkan pekerjaan impian! Proses lamaran cepat dan mudah.', 5, 'approved'],
            ['Siti Rahayu', 'UI/UX Designer', 'Creative Agency', 'Sangat merekomendasikan! Banyak lowongan berkualitas dan sesuai dengan keahlian saya.', 5, 'approved'],
            ['Ahmad Fauzi', 'Backend Engineer', 'Startup Digital', 'Pengalaman melamar kerja jadi lebih efisien. Fitur notifikasinya sangat membantu.', 4, 'approved']
        ];
        for (const t of testimonials) {
            await db.query(
                'INSERT INTO testimonials (nama, role, perusahaan, teks, rating, status) VALUES (?, ?, ?, ?, ?, ?)',
                t
            );
        }
        console.log("Data testimonials berhasil dimasukkan.");

        console.log("Seeding selesai dengan sukses! ✅");
        process.exit();
    } catch (err) {
        console.error("Gagal seeding:", err);
        process.exit(1);
    }
}

runSeed();