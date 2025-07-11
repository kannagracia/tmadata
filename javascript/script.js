document.addEventListener('DOMContentLoaded', function() {
    console.log('Repositori Proyek PIMS: Skrip JavaScript telah dimuat dan dijalankan!');

    // Ambil referensi ke elemen pencarian
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const repoItems = document.querySelectorAll('.repository-item'); // Ini akan menjadi NodeList kosong di company-detail.html

    // --- Fungsi Filtering (hanya relevan di index.html) ---
    function filterRepositoryItems() {
        const searchTerm = searchInput.value.toLowerCase();

        repoItems.forEach(item => {
            const titleElement = item.querySelector('h2');

            if (!titleElement) {
                console.warn('Item repositori tidak memiliki judul (h2):', item);
                item.style.display = 'none';
                return;
            }

            const title = titleElement.innerText.toLowerCase();

            if (title.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // --- Tambahkan Event Listeners, tapi hanya jika elemennya ada ---

    // Untuk fitur pencarian
    if (searchButton && searchInput) { // Pastikan kedua elemen ini ada
        searchButton.addEventListener('click', filterRepositoryItems);
        searchInput.addEventListener('keyup', filterRepositoryItems);
    }

    // Untuk efek klik pada setiap item repositori (hanya relevan di index.html)
    // Cek apakah ada item repositori yang ditemukan (NodeList tidak kosong)
    if (repoItems.length > 0) {
        repoItems.forEach(item => {
            item.addEventListener('click', function() {
                console.log('Item diklik:', this.querySelector('h2') ? this.querySelector('h2').innerText : 'Judul tidak ditemukan');
            });
        });
    }

});