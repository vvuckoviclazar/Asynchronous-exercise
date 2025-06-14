"use strict";

const productList = document.querySelector(".products-list");

let allProducts = [];

const fetchProducts = async () => {
  try {
    const res = await fetch("https://www.course-api.com/react-store-products");
    const data = await res.json();

    allProducts = data;

    renderProducts();
  } catch (error) {
    console.log("Failed to fetch products:", error);
  }
};

const renderProducts = () => {
  productList.innerHTML = "";

  allProducts.forEach((product) => {
    const li = document.createElement("li");
    li.classList.add("product");

    li.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="product-image" />
    <div class="info-div">
     <h3 class="product-name">${product.name}</h3>
     <p class="product-price">$${(product.price / 200).toFixed(2)}</p>
    </div>
  `;

    productList.appendChild(li);
  });
};

fetchProducts();
