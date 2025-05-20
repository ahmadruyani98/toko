
let keranjang = [];
let totalHarga = 0;

function getHargaKue(namaKue) {
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

function updateKeranjangItem(item) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `${item.nama} - Rp ${item.harga.toLocaleString()} x ${item.jumlah}<br>`;
  const tombolKurangi = document.createElement('button');
  tombolKurangi.textContent = '-';
  tombolKurangi.addEventListener('click', function() {
    kurangiJumlah(item.nama);
  });
  listItem.appendChild(tombolKurangi);
  const spanJumlah = document.createElement('span');
  spanJumlah.textContent = item.jumlah;
  listItem.appendChild(spanJumlah);
  const tombolTambah = document.createElement('button');
  tombolTambah.textContent = '+';
  tombolTambah.addEventListener('click', function() {
    tambahKeKeranjang(item.nama);
  });
  listItem.appendChild(tombolTambah);
  return listItem;
}

function updateKeranjangDisplay() {
  const keranjangBelanja = document.getElementById('keranjang-belanja');
  keranjangBelanja.innerHTML = '';
  console.log('Keranjang sebelum update:', keranjang);
  if (keranjang.length === 0) {
    keranjangBelanja.innerHTML = '<li>Keranjang belanja masih kosong.</li>';
  } else {
    keranjang.forEach(item => {
      const listItem = updateKeranjangItem(item);
      keranjangBelanja.appendChild(listItem);
    });
  }
}

function updateTotalHargaDisplay() {
  const totalHargaSpan = document.getElementById('total-harga');
  totalHargaSpan.textContent = totalHarga.toLocaleString();
}

function updateKeranjang() {
  console.log('Memperbarui tampilan keranjang.');
  updateKeranjangDisplay();
  updateTotalHargaDisplay();
}

function tambahKeKeranjang(namaKue) {
  console.log(`Menambahkan ${namaKue} ke keranjang`);
  const itemKeranjang = keranjang.find(item => item.nama === namaKue);
  if (itemKeranjang) {
    itemKeranjang.jumlah++;
  } else {
    const harga = getHargaKue(namaKue);
    keranjang.push({ nama: namaKue, harga: harga, jumlah: 1 });
  }
  totalHarga = keranjang.reduce((sum, item) => sum + (item.harga * item.jumlah), 0);
  updateKeranjang();
}

function kurangiJumlah(namaKue) {
  console.log(`Mengurangi ${namaKue} dari keranjang`);
  const itemKeranjang = keranjang.find(item => item.nama === namaKue);
  if (itemKeranjang) {
    itemKeranjang.jumlah--;
    if (itemKeranjang.jumlah <= 0) {
      keranjang = keranjang.filter(item => item.nama !== namaKue);
    }
    totalHarga = keranjang.reduce((sum, item) => sum + (item.harga * item.jumlah), 0);
    updateKeranjang();
  }
}

function checkout() {
  if (keranjang.length === 0) {
    alert('Keranjang belanja Anda masih kosong!');
    return;
  }
  let pesan = "Hai, saya ingin memesan: ";
  keranjang.forEach(item => {
    pesan += "- " + item.nama + " - Rp " + item.harga + " x " + item.jumlah + " ";
  });
  pesan += "Total: Rp " + totalHarga.toLocaleString();
  const nomorWhatsApp = "+6282268487849";
  const tautanWhatsApp = "https://wa.me/" + nomorWhatsApp + "?text=" + encodeURIComponent(pesan);
  window.open(tautanWhatsApp, '_blank');
  keranjang = [];
  totalHarga = 0;
  updateKeranjang();
}

document.addEventListener('DOMContentLoaded', function() {
  const tombolTambahKeKeranjang = document.querySelectorAll('.tambah-keranjang');
  tombolTambahKeKeranjang.forEach(tombol => {
    tombol.addEventListener('click', function() {
      const namaKue = this.parentNode.querySelector('span').textContent.trim();
      tambahKeKeranjang(namaKue);
    });
  });
});
