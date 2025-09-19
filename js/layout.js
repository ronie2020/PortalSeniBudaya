import { supabase } from './supabase-client.js';

/**
 * Membangun tata letak dasbor di sekitar konten halaman yang ada
 * tanpa menghapus skrip atau elemen penting lainnya.
 */
const initializeLayout = async () => {
    // Cegah skrip berjalan dua kali
    if (document.body.classList.contains('layout-rendered')) {
        return;
    }
    document.body.classList.add('layout-rendered');

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // 1. Buat elemen-elemen utama tata letak
    const layoutWrapper = document.createElement('div');
    layoutWrapper.className = 'relative min-h-screen md:flex';

    const mainAreaWrapper = document.createElement('div');
    mainAreaWrapper.className = 'flex-1 flex flex-col overflow-hidden';
    
    const mainContentElement = document.createElement('main');
    mainContentElement.id = 'main-content';
    mainContentElement.className = 'flex-1 overflow-y-auto bg-slate-100';

    // 2. Pindahkan semua konten asli dari <body> ke dalam elemen <main>
    while (document.body.firstChild) {
        mainContentElement.appendChild(document.body.firstChild);
    }
    
    // 3. Tambahkan layout yang sudah jadi kembali ke <body>
    document.body.appendChild(layoutWrapper);
    document.body.className = 'bg-slate-100';

    // 4. Isi layoutWrapper dengan sidebar dan area konten utama
    const sidebarHTML = `
        <div id="sidebar-overlay" class="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden hidden"></div>
        <aside id="sidebar" class="bg-white w-64 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out shadow-lg z-30 flex flex-col">
            <div class="flex items-center justify-center h-20 shadow-md flex-shrink-0">
                <h1 class="text-2xl font-bold text-indigo-600">Portal Guru</h1>
            </div>
            <nav id="main-nav" class="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                <a href="dashboard-guru.html" data-page="dashboard-guru.html" class="nav-link flex items-center px-4 py-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                    Dashboard
                </a>
                <a href="manajemen-materi.html" data-page="manajemen-materi.html" class="nav-link flex items-center px-4 py-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 16c1.255 0 2.443-.29 3.5-.804V4.804zM14.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 0114.5 16c1.255 0 2.443-.29 3.5-.804V4.804A7.968 7.968 0 0014.5 4z" /></svg>
                    Manajemen Materi
                </a>
                <a href="manajemen-latihan.html" data-page="manajemen-latihan.html" class="nav-link flex items-center px-4 py-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd" /></svg>
                    Manajemen Latihan
                </a>
                <a href="manajemen-pengumuman.html" data-page="manajemen-pengumuman.html" class="nav-link flex items-center px-4 py-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition duration-200">
                     <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.236 9.168-5.584M13 18l5-5m0 0l-5-5m5 5H6" /></svg>
                    Manajemen Pengumuman
                </a>
                <a href="manajemen-absen.html" data-page="manajemen-absen.html" class="nav-link flex items-center px-4 py-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                    Manajemen Absensi
                </a>
                <a href="rekap-nilai.html" data-page="rekap-nilai.html" class="nav-link flex items-center px-4 py-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition duration-200">
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                    Rekap Nilai
                </a>
                <a href="daftar-siswa.html" data-page="daftar-siswa.html" class="nav-link flex items-center px-4 py-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
                    Daftar Siswa
                </a>
            </nav>
        </aside>
    `;
    layoutWrapper.innerHTML = sidebarHTML;

    const headerHTML = `
        <header class="flex items-center justify-between h-20 bg-white shadow-md px-6 flex-shrink-0 z-10">
            <div class="flex items-center">
                <button id="hamburger-btn" class="md:hidden text-slate-500 focus:outline-none mr-4">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
                <h2 id="page-title" class="text-2xl font-semibold text-slate-800"></h2>
            </div>
            <div class="flex items-center space-x-4">
                <span class="text-slate-600 hidden sm:block">Selamat datang, <span id="display-name" class="font-semibold">Memuat...</span></span>
                <button id="logout-button" class="text-sm text-red-500 hover:text-red-700 font-semibold">Logout</button>
            </div>
        </header>
    `;

    mainAreaWrapper.innerHTML = headerHTML;
    mainAreaWrapper.appendChild(mainContentElement);
    layoutWrapper.appendChild(mainAreaWrapper);

    // --- Fungsionalitas setelah layout terpasang ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    hamburgerBtn.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
    });
    overlay.addEventListener('click', () => {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
    });

    // Tandai menu aktif
    const navLinks = document.querySelectorAll('#main-nav .nav-link');
    let pageTitle = "Dashboard"; // Judul default
    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === currentPage) {
            link.classList.add('bg-indigo-600', 'text-white', 'shadow-md');
            link.classList.remove('text-slate-600', 'hover:bg-indigo-50');
            pageTitle = link.textContent.trim();
        }
    });
    document.getElementById('page-title').textContent = pageTitle;

    // --- Autentikasi terpusat ---
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        window.location.href = '../login.html';
        return;
    }
    
    const { data: profile } = await supabase.from('users').select('nama_lengkap, username').eq('id', user.id).single();
    if (profile) {
        document.getElementById('display-name').textContent = profile.nama_lengkap;
    }

    document.getElementById('logout-button').addEventListener('click', async () => {
        await supabase.auth.signOut();
        window.location.href = '../login.html';
    });

    // Kirim sinyal bahwa layout sudah siap
    const event = new CustomEvent('layoutReady', { detail: { user, profile } });
    document.dispatchEvent(event);
};

// Panggil fungsi utama.
// Tidak perlu DOMContentLoaded karena ini adalah module script yang di-defer secara default.
initializeLayout();

