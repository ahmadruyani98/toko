let keranjang = [];
let totalHarga = 0;

function tambahKeKeranjang(namaKue) {
    const itemKeranjang = keranjang.find(item => item.nama === namaKue);

    if (itemKeranjang) {
        itemKeranjang.jumlah++;
    } else {
        keranjang.push({
            nama: namaKue,
            harga: getHargaKue(namaKue), // Ambil harga dari fungsi getHargaKue
            jumlah: 1
        });
    }

    updateKeranjang();
}

function kurangiJumlah(namaKue) {
    const itemKeranjang = keranjang.find(item => item.nama === namaKue);

    if (itemKeranjang) {
        itemKeranjang.jumlah--;
        if (itemKeranjang.jumlah <= 0) {
            // Hapus item dari keranjang jika jumlahnya 0 atau kurang
            keranjang = keranjang.filter(item => item.nama !== namaKue);
        }
        updateKeranjang();
    }
}

function getHargaKue(namaKue) {
    // Fungsi untuk mendapatkan harga kue berdasarkan nama (ganti dengan data yang sesuai)
    switch (namaKue) {
        case 'Kue Coklat':
            return 25000;
        case 'Kue Vanila':
            return 20000;
        case 'Kue Strawberry':
            return 30000;
        default:
            return 0;
    }
}

function updateKeranjang() {
    const keranjangBelanja = document.getElementById('keranjang-belanja');
    const totalHargaSpan = document.getElementById('total-harga');

    // Kosongkan keranjang belanja
    keranjangBelanja.innerHTML = '';

    // Reset total harga
    totalHarga = 0;

    if (keranjang.length === 0) {
        keranjangBelanja.innerHTML = '<li>Keranjang belanja masih kosong.</li>';
    } else {
        keranjang.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${item.nama} - Rp ${item.harga.toLocaleString()} x ${item.jumlah}
                                    <br>
                                    onclick="kurangiJumlah('${item.nama}')">-</button>
                                    <span>${item.jumlah}</span>
                                    <button onclick="tambahJumlah('${item.nama}')">+</button>`;
            keranjangBelanja.appendChild(listItem);
            totalHarga += item.harga * item.jumlah;
        });
    }

    totalHargaSpan.textContent = totalHarga.toLocaleString();
}

function checkout() {
    if (keranjang.length === 0) {
        alert('Keranjang belanja Anda masih kosong!');
        return;
    }

    let pesan = "Hai, saya ingin memesan:
";
    keranjang.forEach(item => {
        pesan += "- " + item.nama + " - Rp " + item.harga + " x " + item.jumlah + "
";
    });
    pesan += "Total: Rp " + totalHarga.toLocaleString();

    const nomorWhatsApp = "+6282268487849";
    const tautanWhatsApp = "https://wa.me/" + nomorWhatsApp + "?text=" + encodeURIComponent(pesan);

    window.open(tautanWhatsApp, '_blank');

    keranjang = [];
    totalHarga = 0;
    updateKeranjang();
}
