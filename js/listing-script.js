// listing-script.js (Fixed version with modal support)

function toggleDropdown() {
  const dropdown = document.getElementById("accountDropdown");
  dropdown.classList.toggle("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  const email = localStorage.getItem("loggedInEmail");
  if (email) {
    document.getElementById("user-email").textContent = email;
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("php/get_logged_in_user.php");
    const data = await res.json();
    const userEmailSpan = document.getElementById("user-email");
    userEmailSpan.textContent = data.email || "Not Logged In";
  } catch (err) {
    console.error("Error fetching user email:", err);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  loadManufacturers();
  loadListings(1);
  generatePaginationButtons();
});

async function loadManufacturers() {
  try {
    const res = await fetch("php/get_manufacturers.php");
    const makes = await res.json();
    const select = document.getElementById("manufacturer");
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

async function loadListings(page = 1) {
  try {
    const res = await fetch(`php/get_featured_cars.php?page=${page}`);
    const cars = await res.json();
    renderListings(cars);
  } catch (err) {
    console.error("Failed to load listings:", err);
  }
}

function renderListings(cars) {
  const container = document.getElementById("featured-container");
  container.innerHTML = "";

  if (!cars.length) {
    container.innerHTML = "<p>No results found.</p>";
    return;
  }

  cars.forEach(car => {
    const card = document.createElement("div");
    card.className = "car-card";

    // Set data attributes for modal
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

  // Call modal handler after rendering
  if (typeof bindCarCardClicks === "function") {
    bindCarCardClicks();
  }
}

function attachPaginationEvents() {
  document.querySelectorAll(".page-btn").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const page = e.target.dataset.page;
      await loadListings(page);
      document.querySelectorAll(".page-btn").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
    });
  });
}

async function generatePaginationButtons() {
  try {
    const res = await fetch("php/get_total_cars.php");
    const data = await res.json();
    const totalCars = data.total;
    const carsPerPage = 9;
    const totalPages = Math.ceil(totalCars / carsPerPage);

    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.className = "page-btn";
      btn.textContent = i;
      btn.dataset.page = i;
      if (i === 1) btn.classList.add("active");
      paginationContainer.appendChild(btn);
    }

    attachPaginationEvents();
  } catch (err) {
    console.error("Failed to generate pagination:", err);
  }
}

const manufacturerSelect = document.getElementById("manufacturer");
manufacturerSelect?.addEventListener("change", async (e) => {
  const make = e.target.value;
  if (!make) return;

  try {
    const res = await fetch(`php/get_filters_by_make.php?manufacturer=${encodeURIComponent(make)}`);
    const data = await res.json();
    updateDropdown("model", data.models, "Model");
    updateDropdown("year", data.years, "Select Year");
    updateDropdown("mileage", data.ccs, "Mileage");
  } catch (err) {
    console.error("Error fetching filter data:", err);
  }
});

function updateDropdown(id, items, placeholder) {
  const select = document.getElementById(id);
  select.innerHTML = `<option value="">${placeholder}</option>`;
  items.forEach(item => {
    const opt = document.createElement("option");
    opt.value = item;
    opt.textContent = item;
    select.appendChild(opt);
  });
}

const form = document.querySelector(".search-form");
form?.addEventListener("submit", async function (e) {
  e.preventDefault();

  const params = new URLSearchParams();
  ["manufacturer", "model", "year", "mileage"].forEach(id => {
    const val = document.getElementById(id)?.value;
    if (val) params.append(id, val);
  });

  const res = await fetch(`php/get_cars.php?${params.toString()}`);
  const cars = await res.json();
  renderListings(cars);
});