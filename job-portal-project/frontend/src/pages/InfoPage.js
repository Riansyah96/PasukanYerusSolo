import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { BuildingOfficeIcon, LockClosedIcon, DocumentTextIcon, RocketLaunchIcon, QuestionMarkCircleIcon, UserGroupIcon, PhoneIcon } from '@heroicons/react/24/outline';

const founders = [
    {
        name: 'Arief Rachman Apriansyah',
        jabatan: 'CEO & Founder',
        wa: '6281234567890',
        info: 'Berpengalaman dalam pengembangan platform digital dan manajemen tim. Memiliki visi untuk menciptakan ekosistem rekrutmen yang inklusif di Indonesia.',
        photo: '/images/founders/founder-1.jpg',
    },
    {
        name: 'Aby Sofyan Hanafi',
        jabatan: 'CTO & Co-Founder',
        wa: '6281234567891',
        info: 'Ahli dalam teknologi web dan arsitektur sistem. Bertanggung jawab atas pengembangan dan pemeliharaan infrastruktur teknis platform.',
        photo: '/images/founders/founder-2.jpg',
    },
    {
        name: 'Iqbal Dwi Kurniawan',
        jabatan: 'COO & Co-Founder',
        wa: '6281234567892',
        info: 'Memiliki pengalaman luas dalam operasional bisnis dan strategi pertumbuhan. Mengawasi kegiatan operasional sehari-hari perusahaan.',
        photo: '/images/founders/founder-3.jpg',
    },
    {
        name: 'Muhammad Anfasa Umar',
        jabatan: 'CMO & Co-Founder',
        wa: '6281234567893',
        info: 'Pakar dalam strategi pemasaran digital dan branding. Bertanggung jawab mengembangkan brand awareness dan strategi akuisisi pengguna.',
        photo: '/images/founders/founder-4.jpg',
    },
    {
        name: 'Syahid Thoriq Abdul Aziz',
        jabatan: 'CFO & Co-Founder',
        wa: '6281234567894',
        info: 'Berpengalaman dalam manajemen keuangan dan investasi. Mengelola aspek keuangan perusahaan dan memastikan pertumbuhan bisnis yang berkelanjutan.',
        photo: '/images/founders/founder-5.jpg',
    },
];

const pages = {
    'tentang-kami': {
        title: 'Tentang Kami',
        icon: <BuildingOfficeIcon style={{width: '1em', height: '1em'}} />,
        type: 'tentang-kami',
        sections: [
            {
                heading: 'Siapa Kami?',
                content: 'PasukanYerusSolo adalah portal lowongan kerja terkemuka di Solo Raya yang didirikan oleh sekelompok talenta muda berbakat. Kami berkomitmen untuk menghubungkan pencari kerja dengan perusahaan-perusahaan terbaik di wilayah Solo dan sekitarnya.'
            },
        ]
    },
    'kebijakan-privasi': {
        title: 'Kebijakan Privasi',
        icon: <LockClosedIcon style={{width: '1em', height: '1em'}} />,
        sections: [
            {
                heading: 'Informasi yang Kami Kumpulkan',
                content: 'Kami mengumpulkan informasi pribadi seperti nama, alamat email, nomor telepon, dan data profesional lainnya yang Anda berikan saat mendaftar atau menggunakan layanan kami.'
            },
            {
                heading: 'Penggunaan Informasi',
                content: 'Informasi Anda digunakan untuk memfasilitasi proses rekrutmen, mengirimkan notifikasi lowongan kerja yang relevan, meningkatkan layanan kami, dan berkomunikasi dengan Anda terkait penggunaan platform.'
            },
            {
                heading: 'Perlindungan Data',
                content: 'Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi data pribadi Anda dari akses tidak sah, perubahan, pengungkapan, atau penghancuran.'
            },
            {
                heading: 'Cookie',
                content: 'Kami menggunakan cookie dan teknologi pelacakan lainnya untuk meningkatkan pengalaman pengguna, menganalisis tren, dan mengelola platform. Anda dapat mengontrol penggunaan cookie melalui pengaturan browser Anda.'
            }
        ]
    },
    'syarat-ketentuan': {
        title: 'Syarat & Ketentuan',
        icon: <DocumentTextIcon style={{width: '1em', height: '1em'}} />,
        sections: [
            {
                heading: 'Ketentuan Umum',
                content: 'Dengan mengakses dan menggunakan platform PasukanYerusSolo, Anda menyetujui untuk terikat oleh syarat dan ketentuan yang tercantum di halaman ini. Jika Anda tidak setuju, harap tidak menggunakan layanan kami.'
            },
            {
                heading: 'Akun Pengguna',
                content: 'Anda bertanggung jawab untuk menjaga kerahasiaan informasi akun Anda, termasuk kata sandi. Segala aktivitas yang terjadi dalam akun Anda sepenuhnya menjadi tanggung jawab Anda.'
            },
            {
                heading: 'Layanan Pencari Kerja',
                content: 'Pencari kerja dapat membuat profil, mengunggah CV, melamar lowongan, dan menggunakan fitur-fitur lain yang tersedia secara gratis. Kami tidak menjamin bahwa lamaran Anda akan ditanggapi oleh perusahaan.'
            },
            {
                heading: 'Layanan Perusahaan',
                content: 'Perusahaan dapat mempublikasikan lowongan pekerjaan, mencari kandidat, dan mengelola proses rekrutmen. Perusahaan bertanggung jawab atas keakuratan informasi yang dimasukkan ke dalam platform.'
            }
        ]
    },
    'karier': {
        title: 'Karier',
        icon: <RocketLaunchIcon style={{width: '1em', height: '1em'}} />,
        sections: [
            {
                heading: 'Bergabung dengan Tim Kami',
                content: 'Tertarik untuk menjadi bagian dari PasukanYerusSolo? Kami selalu mencari individu berbakat dan bersemangat untuk bergabung dengan tim kami yang terus berkembang.'
            },
            {
                heading: 'Posisi yang Tersedia',
                content: 'Saat ini kami memiliki beberapa posisi terbuka di berbagai departemen termasuk Teknologi, Pemasaran, Operasional, dan Layanan Pelanggan. Silakan kirim CV dan portofolio Anda ke karir@pasukanyerussolo.com.'
            },
            {
                heading: 'Budaya Kerja',
                content: 'Kami percaya pada lingkungan kerja yang kolaboratif, inklusif, dan inovatif. Kami mendukung pertumbuhan profesional setiap anggota tim melalui pelatihan dan pengembangan berkelanjutan.'
            },
            {
                heading: 'Benefits',
                content: 'Kami menawarkan gaji kompetitif, asuransi kesehatan, tunjangan hari raya, cuti tahunan, dan kesempatan pengembangan karier yang jelas bagi seluruh karyawan.'
            }
        ]
    },
    'faq': {
        title: 'FAQ',
        icon: <QuestionMarkCircleIcon style={{width: '1em', height: '1em'}} />,
        sections: [
            {
                heading: 'Bagaimana cara mendaftar akun?',
                content: 'Klik tombol "Daftar" di pojok kanan atas, isi formulir pendaftaran dengan data diri Anda, verifikasi email, dan akun Anda siap digunakan. Prosesnya hanya memakan waktu kurang dari 2 menit.'
            },
            {
                heading: 'Apakah membuat akun dikenakan biaya?',
                content: 'Tidak, pendaftaran akun untuk pencari kerja 100% gratis. Anda dapat membuat profil, mengunggah CV, dan melamar lowongan tanpa biaya sepeser pun.'
            },
            {
                heading: 'Bagaimana cara melamar lowongan?',
                content: 'Cari lowongan yang sesuai dengan kriteria Anda, klik "Lamar Sekarang", unggah CV Anda, dan lamaran akan langsung terkirim ke perusahaan terkait. Anda juga bisa memantau status lamaran di halaman "Status Lamaran".'
            },
            {
                heading: 'Bagaimana cara perusahaan memasang lowongan?',
                content: 'Daftar sebagai akun Perusahaan, lengkapi profil perusahaan, lalu klik "Publikasikan Lowongan" untuk memasang iklan lowongan pekerjaan. Anda akan menerima notifikasi setiap ada pelamar baru.'
            },
            {
                heading: 'Apakah data saya aman?',
                content: 'Ya, kami menjaga keamanan data Anda dengan enkripsi dan protokol keamanan terkini. Data pribadi Anda tidak akan dibagikan kepada pihak ketiga tanpa izin Anda. Lihat Kebijakan Privasi kami untuk informasi lebih lanjut.'
            }
        ]
    }
};

const InfoPage = ({ slug }) => {
    const { theme } = useContext(ThemeContext);
    const isDark = theme === 'dark';
    const page = pages[slug];

    if (!page) {
        return (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: isDark ? '#a8a29e' : '#57534e' }}>
                Halaman tidak ditemukan
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: page.type === 'tentang-kami' ? '1100px' : '800px',
            margin: '0 auto',
            padding: '60px 24px 100px',
        }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <span style={{ fontSize: '48px' }}>{page.icon}</span>
                <h1 style={{
                    color: isDark ? '#fef3c7' : '#1c1917',
                    fontSize: 'clamp(28px, 5vw, 36px)',
                    fontWeight: '800',
                    marginTop: '16px',
                    marginBottom: '8px',
                    letterSpacing: '-0.02em',
                }}>
                    {page.title}
                </h1>
                <div style={{
                    width: '60px',
                    height: '4px',
                    background: 'linear-gradient(90deg, #ea580c, #f59e0b)',
                    borderRadius: '2px',
                    margin: '16px auto 0',
                }} />
            </div>

            {page.sections && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginBottom: '48px' }}>
                    {page.sections.map((section, i) => (
                        <div key={i} style={{
                            background: isDark ? '#120b06' : '#ffffff',
                            border: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`,
                            borderRadius: '16px',
                            padding: '28px',
                            transition: 'all 0.3s ease',
                        }}>
                            <h2 style={{
                                color: '#ea580c',
                                fontSize: '18px',
                                fontWeight: '700',
                                marginBottom: '12px',
                                margin: 0,
                            }}>
                                {section.heading}
                            </h2>
                            <p style={{
                                color: isDark ? '#a8a29e' : '#57534e',
                                fontSize: '15px',
                                lineHeight: '1.7',
                                marginTop: '12px',
                                margin: '12px 0 0 0',
                            }}>
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {page.type === 'tentang-kami' && (
                <>
                    <h2 style={{
                        color: isDark ? '#fef3c7' : '#1c1917',
                        fontSize: '22px',
                        fontWeight: '800',
                        textAlign: 'center',
                        marginBottom: '32px',
                    }}>
                        <UserGroupIcon style={{width: '1em', height: '1em', verticalAlign: 'middle', marginRight: '4px'}} /> Tim Pendiri
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '24px',
                    }}>
                        {founders.map((founder, i) => (
                            <div key={i} style={{
                                background: isDark ? '#120b06' : '#ffffff',
                                border: `1px solid ${isDark ? '#262626' : '#e5e5e5'}`,
                                borderRadius: '20px',
                                padding: '32px 24px',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                            }}>
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    margin: '0 auto 20px',
                                    overflow: 'hidden',
                                    border: '3px solid #ea580c',
                                }}>
                                    <img
                                        src={founder.photo}
                                        alt={founder.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                                <h3 style={{
                                    color: isDark ? '#fef3c7' : '#1c1917',
                                    fontSize: '17px',
                                    fontWeight: '800',
                                    margin: '0 0 4px',
                                }}>
                                    {founder.name}
                                </h3>
                                <div style={{
                                    color: '#ea580c',
                                    fontSize: '12px',
                                    fontWeight: '700',
                                    letterSpacing: '1px',
                                    textTransform: 'uppercase',
                                    marginBottom: '12px',
                                }}>
                                    {founder.jabatan}
                                </div>
                                <p style={{
                                    color: isDark ? '#a8a29e' : '#57534e',
                                    fontSize: '13px',
                                    lineHeight: '1.6',
                                    margin: '0 0 16px',
                                }}>
                                    {founder.info}
                                </p>
                                <a
                                    href={`https://wa.me/${founder.wa}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '8px 18px',
                                        borderRadius: '30px',
                                        background: '#22c55e',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        fontSize: '12px',
                                        fontWeight: '700',
                                        transition: 'all 0.3s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(34,197,94,0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <PhoneIcon style={{width: '1em', height: '1em', verticalAlign: 'middle'}} /> WhatsApp
                                </a>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default InfoPage;
