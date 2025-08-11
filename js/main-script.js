// main-script.js

function toggleDropdown() {
  const dropdown = document.getElementById("accountDropdown");
  dropdown.classList.toggle("hidden");
}

// Load manufacturers into dropdown
async function loadManufacturers() {
  const select = document.getElementById("manufacturer");
  if (!select) return;

  try {
    const res = await fetch("php/get_manufacturers.php");
    const makes = await res.json();
    makes.forEach(make => {
      const opt = document.createElement("option");
      opt.value = make;
      opt.textContent = make;
      select.appendChild(opt);
    });
  } catch (err) {
    console.error("Failed to load manufacturers:", err);
  }
}

// Load cars for homepage
async function loadCars() {
  try {
    const res = await fetch("php/get_featured_cars.php?limit=6");
    const cars = await res.json();
    const featured = cars.slice(0, 3);
    const newlyListed = cars.slice(3, 6);

    renderCars(featured, "featured-container");
    renderCars(newlyListed, "newly-listed-container");
  } catch (err) {
    document.getElementById("featured-container").innerHTML = "<p>Failed to load cars.</p>";
    document.getElementById("newly-listed-container").innerHTML = "<p>Failed to load cars.</p>";
    console.error(err);
  }
}

function renderCars(list, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  list.forEach(car => {
    const card = document.createElement("div");
    card.className = "car-card";

    // Set data attributes for modal use
    card.dataset.id = car.id;
    card.dataset.name = car.name;
    card.dataset.manufacturer = car.manufacturer;
    card.dataset.model = car.model || "Not specified";
    card.dataset.year = car.year || "Not specified";
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

  if (typeof bindCarCardClicks === "function") {
    bindCarCardClicks();
  }
}

// When manufacturer changes, load filter options
document.getElementById("manufacturer")?.addEventListener("change", async (e) => {
  const make = e.target.value;
  const modelSelect = document.getElementById("model");
  const yearSelect = document.getElementById("year");
  const mileageSelect = document.getElementById("mileage");

  modelSelect.innerHTML = '<option value="">Model</option>';
  yearSelect.innerHTML = '<option value="">Select Year</option>';
  mileageSelect.innerHTML = '<option value="">Mileage</option>';

  if (!make) return;

  try {
    const res = await fetch(`php/get_filters_by_make.php?manufacturer=${encodeURIComponent(make)}`);
    const data = await res.json();

    fillSelect(modelSelect, data.models, "Model");
    fillSelect(yearSelect, data.years, "Select Year");
    fillSelect(mileageSelect, data.mileages, "Mileage");
  } catch (err) {
    console.error("Failed to load filters:", err);
  }
});

// Fill a select element with options
function fillSelect(select, list, placeholder) {
  select.innerHTML = `<option value="">${placeholder}</option>`;
  list.forEach(val => {
    const opt = document.createElement("option");
    opt.value = val;
    opt.textContent = val;
    select.appendChild(opt);
  });
}

// Handle search form submit
document.querySelector(".search-form")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const params = new URLSearchParams();
  const searchInput = this.querySelector("input[type='text']");
  if (searchInput && searchInput.value.trim()) {
    params.append("q", searchInput.value.trim());
  }

  const manufacturer = document.getElementById("manufacturer")?.value;
  const model = document.getElementById("model")?.value;
  const year = document.getElementById("year")?.value;
  const mileage = document.getElementById("mileage")?.value;

  if (manufacturer) params.append("manufacturer", manufacturer);
  if (model) params.append("model", model);
  if (year) params.append("year", year);
  if (mileage) params.append("mileage", mileage);

  window.location.href = `display.html?${params.toString()}`;
})

// Page startup
document.addEventListener("DOMContentLoaded", async () => {
  const emailSpan = document.getElementById("user-email");

  // Show localStorage email if available
  const localEmail = localStorage.getItem("loggedInEmail");
  if (localEmail && emailSpan) {
    emailSpan.textContent = localEmail;
  }

  // Fetch server-verified session user
  try {
    const res = await fetch("php/get_logged_in_user.php");
    const data = await res.json();
    if (data.email && emailSpan) {
      emailSpan.textContent = data.email;
      localStorage.setItem("loggedInEmail", data.email);
    }
  } catch (err) {
    console.error("Error syncing logged-in user:", err);
  }

  loadManufacturers();
  loadCars();
});
