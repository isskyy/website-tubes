let iconCart = document.querySelector(".icon-cart");
let closeCart = document.querySelector(".close");
let body = document.querySelector("body");
let listProdukHTML = document.querySelector(".listproduk");
let cartHTML = document.querySelector(".listcart");
let totalCartHTML = document.querySelector(".icon-cart span");

let cart = [];

iconCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

closeCart.addEventListener("click", () => {
  body.classList.remove("showCart");
});

const tampilkanCart = () => {
  cartHTML.innerHTML = "";
  cart.forEach((item) => {
    let cartItemHTML = `
      <div class="barang" data-id="${item.id}">
        <div class="image">
          <img src="${item.gambar}" alt="${item.nama}" />
        </div>
        <div class="name">${item.nama}</div>
        <div class="totalprice">Rp.${item.harga}</div>
        <div class="total">
          <span class="minus">-</span>
          <span>${item.qty}</span>
          <span class="plus">+</span>
        </div>
      </div>
    `;
    cartHTML.innerHTML += cartItemHTML;
  });
  updateTotalCart();
};

const updateTotalCart = () => {
  let totalItems = cart.reduce((total, item) => total + item.qty, 0);
  totalCartHTML.textContent = totalItems;
};

listProdukHTML.addEventListener("click", (event) => {
  if (event.target.classList.contains("addcart")) {
    let selectedBarang = event.target.closest(".barang");
    let selectedId = parseInt(selectedBarang.dataset.id);
    let selectedNama = selectedBarang.dataset.nama;
    let selectedHarga = parseInt(selectedBarang.dataset.harga);
    let selectedGambar = selectedBarang.querySelector("img").src;

    let existingItem = cart.find((item) => item.id === selectedId);
    if (existingItem) {
      existingItem.qty++;
    } else {
      cart.push({
        id: selectedId,
        nama: selectedNama,
        harga: selectedHarga,
        gambar: selectedGambar,
        qty: 1,
      });
    }
    tampilkanCart();
  }
});

cartHTML.addEventListener("click", (event) => {
  if (event.target.classList.contains("minus")) {
    let selectedId = parseInt(event.target.closest(".barang").dataset.id);
    let selectedItemIndex = cart.findIndex((item) => item.id === selectedId);
    if (cart[selectedItemIndex].qty > 1) {
      cart[selectedItemIndex].qty--;
    } else {
      cart.splice(selectedItemIndex, 1);
    }
    tampilkanCart();
  } else if (event.target.classList.contains("plus")) {
    let selectedId = parseInt(event.target.closest(".barang").dataset.id);
    let selectedItemIndex = cart.findIndex((item) => item.id === selectedId);
    cart[selectedItemIndex].qty++;
    tampilkanCart();
  }
});

let checkoutButton = document.getElementById("checkout-btn");

checkoutButton.addEventListener("click", () => {
  let checkoutUrl = `checkout.html?total=${calculateTotalPrice()}&items=${encodeURIComponent(
    JSON.stringify(cart)
  )}`;
  window.location.href = checkoutUrl;
});

const calculateTotalPrice = () => {
  return cart.reduce((total, item) => total + item.qty * item.harga, 0);
};
