let cart = [];

function addToCart(name, price, node) {
    cart.push({ name, price, node });
    updateCart();
    alert(name + " ditambahkan ke keranjang!");
}

function updateCart() {
    const itemsDiv = document.getElementById('cart-items');
    const totalSpan = document.getElementById('cart-total');
    let total = 0;
    
    itemsDiv.innerHTML = cart.map(item => `<p>${item.name} - Rp ${item.price.toLocaleString()}</p>`).join('');
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

function checkout() {
    if (cart.length === 0) return alert("Keranjang kosong!");
    document.getElementById('cart-modal').style.display = 'none';
    document.getElementById('payment-modal').style.display = 'block';

    const waNumber = "6283862601567";
    const waBtn = document.getElementById('wa-confirm-btn');

    let listBarang = cart.map(item => item.name).join(", ");
    let listNode = cart.map(item => item.node).join(", ");
    let totalHarga = cart.reduce((sum, item) => sum + item.price, 0);

    const pesan = `Kak aku mau konfirmasi pembayaran\n\nBARANG : ${listBarang}\nHARGA : Rp ${totalHarga.toLocaleString()}\nNODE : ${listNode}`;
    
    waBtn.onclick = () => {
        window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(pesan)}`, '_blank');
        cart = [];
        updateCart();
        closePayment();
    };
}
