async function loadSearchResults() {
  const params = new URLSearchParams(window.location.search);
  const queryString = params.toString(); // full query string to PHP

  if (!queryString) return;

  try {
    const res = await fetch(`php/search_cars.php?${queryString}`);
    const cars = await res.json();
    console.log("Fetched cars:", cars);

    const container = document.getElementById("search-results");

    if (!container) {
      console.error("Missing container: #search-results not found in HTML.");
      return;
    }

    container.innerHTML = "";

    if (!Array.isArray(cars) || cars.length === 0) {
      container.innerHTML = "<p>No cars found for this search.</p>";
      return;
    }

    cars.forEach(car => {
      const card = document.createElement("div");
      card.className = "car-card";

      // ✅ Add data attributes for modal use
      card.dataset.id = car.id;
      card.dataset.name = car.name;
      card.dataset.manufacturer = car.manufacturer;
      card.dataset.model = car.model;
      card.dataset.year = car.year;
      card.dataset.mileage = car.mileage;
      card.dataset.price = car.price;
      card.dataset.image = car.image;

      card.innerHTML = `
        <img src="assets/cars/${car.image}" alt="${car.name}" class="car-image">
        <div class="car-details">
          <h3>${car.name}</h3>
          <p><strong>Manufacturer:</strong> ${car.manufacturer}</p>
          <p><strong>Mileage:</strong> ${Number(car.mileage).toLocaleString()} km</p>
          <p><strong>Price:</strong> RM${Number(car.price).toLocaleString()}</p>
        </div>
      `;

      container.appendChild(card);
    });

    // ✅ Important: Enable modal behavior after cards are added
    if (typeof bindCarCardClicks === "function") {
      bindCarCardClicks();
    } else {
      console.warn("bindCarCardClicks() not available. Ensure car-modal.js is loaded first.");
    }

  } catch (err) {
    console.error("Error loading search results:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadSearchResults);
