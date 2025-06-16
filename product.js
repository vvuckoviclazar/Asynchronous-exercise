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
        <img src="${
          images[0].url
        }" alt="${name}" class="main-image" id="mainImage" />
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

    const leftDiv = document.querySelector(".left");

    leftDiv.addEventListener("click", (e) => {
      const backBtn = e.target.closest(".back-btn");
      const galleryImg = e.target.closest(".gallery-thumb");

      if (backBtn) {
        window.location.href = "index.html";
        return;
      }

      if (galleryImg) {
        const mainImage = document.getElementById("mainImage");
        mainImage.src = galleryImg.src;
        mainImage.alt = galleryImg.alt;
        document
          .querySelectorAll(".gallery-thumb")
          .forEach((img) => img.classList.remove("selected"));

        galleryImg.classList.add("selected");
      }
    });
  } catch (error) {
    console.error("Error loading product:", error);
  }
};

fetchProduct();
