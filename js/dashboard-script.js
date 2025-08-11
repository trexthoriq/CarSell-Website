// dashboard-script.js

// Load inquired cars for the logged-in user
async function loadInquiredCars() {
  const container = document.getElementById("inquired-cars-container");
  if (!container) return;

  try {
    const res = await fetch("php/get_inquired_cars.php");
    const cars = await res.json();

    container.innerHTML = "";

    if (!Array.isArray(cars) || cars.length === 0) {
      container.innerHTML = "<p>No inquiries yet.</p>";
      return;
    }

    cars.forEach(car => {
      const card = document.createElement("div");
      card.className = "car-card";
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
  } catch (err) {
    console.error("Failed to load inquired cars:", err);
    container.innerHTML = "<p>Error loading inquiries.</p>";
  }
}

// Handle new listing submission
async function handleAddListing(event) {
  event.preventDefault();

  const form = document.getElementById("add-listing-form");
  const formData = new FormData(form);

  try {
    const res = await fetch("php/add_listing.php", {
      method: "POST",
      body: formData
    });

    const text = await res.text(); // get raw response
    console.log("Raw response from PHP:", text);

    let result;
    try {
      result = JSON.parse(text);
    } catch (parseErr) {
      console.error("Invalid JSON from server:", parseErr);
      alert("Server returned invalid response. Check console for details.");
      return;
    }

    if (result.success) {
      alert("Listing added successfully!");
      form.reset();
    } else {
      alert("Failed to add listing: " + (result.message || "Unknown error"));
    }
  } catch (err) {
    console.error("Error submitting listing:", err);
    alert("Error submitting listing. Please try again.");
  }
}

// Run when page loads
document.addEventListener("DOMContentLoaded", () => {
  loadInquiredCars();
  document.getElementById("add-listing-form")?.addEventListener("submit", handleAddListing);
});
