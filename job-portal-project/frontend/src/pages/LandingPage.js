import React from 'react';

const LandingPage = () => {
    return (
        <div className="bg-slate-50 dark:bg-gray-950">
            {/* Header / Hero Section */}
            <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 blur-[120px] rounded-full animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400/20 blur-[120px] rounded-full animate-pulse shadow-2xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest mb-8">
                        Portal Lowongan Kerja Terpercaya
                    </div>
                    
                    <h1 className="text-6xl md:text-8xl font-black mb-8 text-gray-900 dark:text-white leading-[1.1] tracking-tighter">
                        Mastering Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Career Journey.</span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
                        Portal loker tercepat untuk menemukan peluang impian Anda. <br className="hidden md:block" /> Kami kurasi, Anda melamar, karier Anda melesat.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                        <button className="px-12 py-5 rounded-2xl bg-blue-600 text-white text-lg font-black hover:bg-blue-700 shadow-2xl shadow-blue-500/40 transition-all">
                            Cari Loker Sekarang
                        </button>
                    </div>
                </div>
            </header>

            {/* Section: Cara Kerja */}
            <section className="py-24 bg-white dark:bg-gray-950 border-y border-gray-100 dark:border-gray-900">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-blue-600 font-black uppercase tracking-widest text-sm mb-4">Cara Kerja</h2>
                        <h3 className="text-4xl font-black text-gray-900 dark:text-white">3 Langkah Menuju Karier Impian</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: 'Buat Profil', desc: 'Lengkapi profil profesional Anda agar dilirik perusahaan.' },
                            { title: 'Cari Loker', desc: 'Filter lowongan sesuai dengan skill dan lokasi Anda.' },
                            { title: 'Kirim Lamaran', desc: 'Apply dengan satu klik dan pantau status lamaran Anda.' }
                        ].map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="w-20 h-20 bg-blue-600 text-white rounded-3xl flex items-center justify-center text-3xl font-black mx-auto mb-6 shadow-xl shadow-blue-500/30">
                                    {index + 1}
                                </div>
                                <h4 className="text-xl font-bold mb-3 dark:text-white">{item.title}</h4>
                                <p className="text-gray-500 dark:text-gray-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;