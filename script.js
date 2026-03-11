// Database Produk
const products = [
    { id: 1, name: "Panel Minecraft (Private)", price: 50000, node: "Private" },
    { id: 2, name: "Panel Minecraft (Public)", price: 25000, node: "Public" },
    { id: 3, name: "VPS Minecraft 8GB", price: 120000, node: "Dedicated" },
    { id: 4, name: "Setup Plugin Full", price: 75000, node: "Internal" }
];

let cart = [];

// Menampilkan Produk saat Halaman Dimuat
function init() {
    const container = document.getElementById('product-container');
    products.forEach(p => {
        container.innerHTML += `
            <div class="card">
                <h3>${p.name}</h3>
                <p>Node: ${p.node}</p>
                <div class="price">Rp ${p.price.toLocaleString()}</div>
                <button onclick="addToCart(${p.id})">Beli Sekarang</button>
            </div>
        `;
    });
}

function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    updateCart();
    alert(item.name + " telah masuk keranjang!");
}

function updateCart() {
    const itemsDiv = document.getElementById('cart-items');
    const totalSpan = document.getElementById('cart-total');
    let total = 0;
    
    itemsDiv.innerHTML = cart.map((item, index) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
            <span>${item.name}</span>
            <span>Rp ${item.price.toLocaleString()}</span>
        </div>
    `).join('');

    cart.forEach(item => total += item.price);
    totalSpan.innerText = `Rp ${total.toLocaleString()}`;
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function closePayment() {
    document.getElementById('payment-modal').style.display = 'none';
}

// LOGIKA PEMBAYARAN DAN WHATSAPP
function checkout() {
    if (cart.length === 0) return alert("Keranjang Anda masih kosong!");

    // Tutup keranjang, buka pembayaran
    document.getElementById('cart-modal').style.display = 'none';
    document.getElementById('payment-modal').style.display = 'block';

    const waNumber = "6283862601567";
    const waBtn = document.getElementById('wa-confirm-btn');

    // Mengolah data keranjang untuk pesan WA
    let listBarang = cart.map(item => item.name).join(", ");
    let listNode = cart.map(item => item.node).join(", ");
    let totalHarga = cart.reduce((sum, item) => sum + item.price, 0);

    // Format Pesan Sesuai Perintah Anda
    const pesan = `Kak aku mau konfirmasi pembayaran\n\nBARANG : ${listBarang}\nHARGA : Rp ${totalHarga.toLocaleString()}\nNODE : ${listNode}`;
    
    waBtn.onclick = () => {
        const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(pesan)}`;
        window.open(url, '_blank');
        
        // Reset keranjang setelah kirim
        cart = [];
        updateCart();
        closePayment();
    };
}

window.onload = init;
