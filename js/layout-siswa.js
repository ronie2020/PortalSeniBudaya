import { supabase } from './supabase-client.js';

/**
 * Membuat dan menyisipkan layout utama (sidebar, header) untuk Portal Siswa.
 * Juga menangani autentikasi pengguna dan fungsionalitas logout secara terpusat.
 */
// PERBAIKAN: Tambahkan kata kunci 'async' di sini
const createStudentLayout = async () => {
    // Simpan semua konten asli yang ada di dalam <body>
    const originalContent = document.body.innerHTML;
    
    // Mendapatkan nama file halaman saat ini untuk menandai menu aktif
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard-siswa.html';

    const layoutHTML = `
        <div class="relative min-h-screen md:flex bg-gray-100">
            <!-- Sidebar -->
            <div id="sidebar-overlay" class="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden hidden"></div>
            <aside id="sidebar" class="bg-white w-64 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out shadow-lg z-30 flex flex-col">
                <div class="flex items-center justify-center h-20 shadow-md flex-shrink-0">
                    <h1 class="text-2xl font-bold text-indigo-600">Portal Belajar</h1>
                </div>
                <nav id="main-nav" class="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                    <a href="dashboard-siswa.html" data-page="dashboard-siswa.html" class="nav-link flex items-center px-4 py-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                        Dashboard
                    </a>
                    <a href="materi-siswa.html" data-page="materi-siswa.html" class="nav-link flex items-center px-4 py-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 16c1.255 0 2.443-.29 3.5-.804V4.804zM14.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 0114.5 16c1.255 0 2.443-.29 3.5-.804V4.804A7.968 7.968 0 0014.5 4z" /></svg>
                        Materi Belajar
                    </a>
                    <a href="tugas-siswa.html" data-page="tugas-siswa.html" class="nav-link flex items-center px-4 py-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg">
                         <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd" /></svg>
                        Tugas & Latihan
                    </a>
                    <a href="nilai-siswa.html" data-page="nilai-siswa.html" class="nav-link flex items-center px-4 py-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                        Nilai Saya
                    </a>
                     <a href="kartu-siswa.html" data-page="kartu-siswa.html" class="nav-link flex items-center px-4 py-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2h-8zm-2 2H4a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2h-2v12a1 1 0 11-2 0V4z" clip-rule="evenodd" /></svg>
                        Kartu Siswa
                    </a>
                    <a href="scan-absen-siswa.html" data-page="scan-absen-siswa.html" class="nav-link flex items-center px-4 py-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg">
                         <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H5v1.5a1 1 0 01-2 0V4zm14 0a1 1 0 011 1v1.5a1 1 0 01-2 0V5h-3a1 1 0 110-2h4zM4 17a1 1 0 01-1-1v-1.5a1 1 0 112 0V15h3a1 1 0 110 2H4zm13 0a1 1 0 01-1 1h-4a1 1 0 110-2h3v-1.5a1 1 0 112 0V16z" clip-rule="evenodd" /></svg>
                        Scan Absensi
                    </a>
                </nav>
            </aside>

            <div class="flex-1 flex flex-col overflow-hidden">
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
                <main id="main-content" class="flex-1 overflow-y-auto"></main>
            </div>
        </div>
    `;
    
    document.body.innerHTML = '';
    document.body.insertAdjacentHTML('beforeend', layoutHTML);
    document.getElementById('main-content').innerHTML = originalContent;

    const navLinks = document.querySelectorAll('#main-nav .nav-link');
    let pageTitle = "Dashboard"; 
    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === currentPage) {
            link.classList.add('bg-indigo-600', 'text-white', 'shadow-sm');
            link.classList.remove('text-slate-600', 'hover:bg-indigo-50');
            pageTitle = link.textContent.trim();
        }
    });
    document.getElementById('page-title').textContent = pageTitle;

    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    hamburgerBtn.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
        sidebarOverlay.classList.toggle('hidden');
    });
    sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.add('-translate-x-full');
        sidebarOverlay.classList.add('hidden');
    });

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        window.location.href = '../login.html';
        return;
    }
    
    const { data: profile } = await supabase.from('users').select('nama_lengkap, username, kelas').eq('id', user.id).single();
    if (profile) {
        document.getElementById('display-name').textContent = profile.nama_lengkap;
    }

    document.getElementById('logout-button').addEventListener('click', async () => {
        await supabase.auth.signOut();
        window.location.href = '../login.html';
    });
    
    const event = new CustomEvent('layoutReady', { detail: { user, profile } });
    document.dispatchEvent(event);
};

createStudentLayout();

