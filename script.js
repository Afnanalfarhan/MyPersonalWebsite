document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-link');
    const contents = document.querySelectorAll('.tab-content');
    const typingElement = document.querySelector('.typing-animation'); // Elemen teks dengan animasi mengetik
    const aboutPhoto = document.querySelector('.about-photo'); // Foto di About
    const aboutText = document.querySelector('.about-text'); // Teks di About
    // Fungsi untuk mengatur tab menjadi aktif
    const setActiveTab = (targetId) => {
        tabs.forEach(tab => {
            if (tab.getAttribute('href').substring(1) === targetId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', event => {
            event.preventDefault();

            // Hapus kelas 'active' dari semua tab dan konten
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(content => {
                content.classList.remove('active', 'fade-in');
            });

            // Tambahkan kelas 'active' ke tab yang diklik
            tab.classList.add('active');
            const targetId = tab.getAttribute('href').substring(1);
            const targetContent = document.getElementById(targetId);

            if (targetContent) {
                // Hapus kelas animasi untuk memutar ulang
                aboutPhoto.classList.remove('slide-up');
                aboutText.classList.remove('slide-left');
                void aboutPhoto.offsetWidth; // Memicu reflow untuk foto
                void aboutText.offsetWidth; // Memicu reflow untuk teks
                aboutPhoto.classList.add('slide-up');
                aboutText.classList.add('slide-left');
                targetContent.classList.remove('fade-in');
                void targetContent.offsetWidth; // Memicu reflow
                targetContent.classList.add('active', 'fade-in');
                    
                // Jika tab "Home" diklik, reset animasi mengetik
                if (targetId === 'home' && typingElement) {
                    typingElement.classList.remove('typing-animation');
                    void typingElement.offsetWidth; // Memicu reflow
                    typingElement.classList.add('typing-animation');
                }

                // Scroll halus ke elemen yang diklik
                targetContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Intersection Observer untuk mendeteksi bagian yang sedang dilihat
    const observerOptions = {
        root: null, // Menggunakan viewport sebagai root
        rootMargin: '0px',
        threshold: 0.6 // Bagian terlihat minimal 60% agar dianggap aktif
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveTab(entry.target.id);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    contents.forEach(content => observer.observe(content));
});
