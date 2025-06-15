"use strict";

const productContainer = document.getElementById("product-container");

const fetchProduct = async () => {
  const id = localStorage.getItem("selectedProductId");

  try {
    const res = await fetch(
      `https://www.course-api.com/react-store-single-product?id=${id}`
    );
    const data = await res.json();

    const { name, price, description, company, images, id: sku } = data;

    const imageGallery = images
      .map(
        (img, index) => `
      <img src="${img.url}" alt="gallery image ${index}" class="gallery-thumb" />
    `
      )
      .join("");

    productContainer.innerHTML = `
      <div class="product-detail-content">
       <div class="left">
       <button class="back-btn">Back to Products</button>
        <img src="${images[0].url}" alt="${name}" class="main-image" />
        <div class="gallery">${imageGallery}</div>
       </div>
       <div class="right">
        <h1>${name}</h1>
        <p class="product-price2">$${(price / 100).toFixed(2)}</p>
        <p class="description">${description}</p>
        <p class="same"><strong>Available:</strong> In stock</p>
        <p class="same"><strong>SKU:</strong> ${sku}</p>
        <p class="same"><strong>Brand:</strong> ${company}</p>
       </div>
      </div>
    `;
  } catch (error) {
    console.error("Error loading product:", error);
  }
};

fetchProduct();
