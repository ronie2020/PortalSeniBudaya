// File: js/layout.js
export async function loadLayout() {
    const pageContentElement = document.querySelector('body > .page-content');
    const pageTitle = document.title.split(' - ')[0];

    if (!pageContentElement) {
        console.error("Struktur Halaman Salah: Elemen dengan kelas '.page-content' tidak ditemukan.");
        return false;
    }
    const pageContentHTML = pageContentElement.innerHTML;
    document.body.innerHTML = ''; // Kosongkan body untuk diisi layout

    try {
        const response = await fetch('_layout-guru.html');
        if (!response.ok) throw new Error('File _layout-guru.html tidak ditemukan.');
        let layoutHTML = await response.text();
        
        // Ganti placeholder dengan konten halaman yang sebenarnya
        layoutHTML = layoutHTML.replace('<!-- PAGE_CONTENT_PLACEHOLDER -->', pageContentHTML);
        
        document.body.innerHTML = layoutHTML;
        
        document.getElementById('page-title').textContent = pageTitle;

        const currentPath = window.location.pathname.split('/').pop();
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.replace('text-gray-600', 'text-white');
                link.classList.replace('hover:bg-indigo-100', 'bg-indigo-600');
            }
        });

        const hamburgerBtn = document.getElementById('hamburger-btn');
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebar-overlay');

        hamburgerBtn.addEventListener('click', () => {
            sidebar.classList.toggle('-translate-x-full');
            sidebarOverlay.style.display = sidebar.classList.contains('-translate-x-full') ? 'none' : 'block';
        });

        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.add('-translate-x-full');
            sidebarOverlay.style.display = 'none';
        });

        return true;

    } catch (error) {
        console.error("Gagal memuat layout:", error);
        document.body.innerHTML = `<p class="p-4 text-red-600 font-bold">Error: ${error.message}. Gagal memuat layout.</p>`;
        return false;
    }
}