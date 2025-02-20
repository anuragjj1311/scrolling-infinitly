document.addEventListener("DOMContentLoaded", function() {
  let loading = false;
  let productContainer = document.getElementById("product-container");
  let observerTrigger = document.getElementById("observer-trigger");
  let loadingIndicator = document.getElementById("loading");

  function loadMoreProducts() {
      if (loading) return;

      loading = true;
      loadingIndicator.style.display = "block";

      let offset = document.getElementById("offset").value;

      fetch(`/products/load_more?offset=${offset}`)
          .then(response => response.json())
          .then(data => {
              data.forEach(product => {
                  let div = document.createElement("div");
                  div.className = "product-card";
                  div.innerHTML = `
                      <img src="${product.image_url}" alt="${product.name}" class="product-image">
                      <div class="product-details">
                          <p class="product-brand">${product.brand}</p>
                          <p class="product-title">${product.name}</p>
                          <p class="product-price">₹${product.selling_price} <del>₹${product.price}</del></p>
                      </div>
                  `;
                  productContainer.appendChild(div);
              });

              document.getElementById("offset").value = parseInt(offset) + 8;
              loadingIndicator.style.display = "none";
              loading = false;
          })
          .catch(() => {
              loadingIndicator.style.display = "none";
              loading = false;
          });
  }

  // Intersection Observer to watch the trigger element
  let observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
          loadMoreProducts();
      }
  }, {
      rootMargin: "100px",  // Trigger slightly before the user reaches the bottom
      threshold: 0.1
  });

  // Observe the trigger element
  observer.observe(observerTrigger);
});
