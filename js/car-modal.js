// js/car-modal.js

// 1. Modal elements
const modalOverlay = document.getElementById("carModalOverlay");
const closeModalBtn = document.getElementById("closeModal");

const modalCarImage = document.getElementById("modalCarImage");
const modalCarName = document.getElementById("modalCarName");
const modalManufacturer = document.getElementById("modalManufacturer");
const modalModel = document.getElementById("modalModel");
const modalYear = document.getElementById("modalYear");
const modalMileage = document.getElementById("modalMileage");
const modalPrice = document.getElementById("modalPrice");
const inquireBtn = document.getElementById("inquireBtn");

let selectedCarId = null;

// 2. Open modal with car data
function openCarModal(car) {
  selectedCarId = car.id;

  modalCarImage.src = `assets/cars/${car.image}`;
  modalCarImage.alt = car.name;
  modalCarName.textContent = car.name;
  modalManufacturer.textContent = car.manufacturer;
  modalModel.textContent = car.model || "N/A";
  modalYear.textContent = car.year || "N/A";
  modalMileage.textContent = Number(car.mileage).toLocaleString();
  modalPrice.textContent = Number(car.price).toLocaleString();

  // Clear previous message
  const messageBox = document.getElementById("inquiryMessage");
  if (messageBox) messageBox.value = "";

  modalOverlay.classList.remove("hidden");
}

// 3. Close modal
function closeCarModal() {
  modalOverlay.classList.add("hidden");
}

// 4. Click outside or "X" to close
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeCarModal();
});
closeModalBtn.addEventListener("click", closeCarModal);

// 5. Attach click to all car cards
function bindCarCardClicks() {
  document.querySelectorAll(".car-card").forEach(card => {
    card.addEventListener("click", () => {
      const car = {
        id: card.dataset.id,
        name: card.dataset.name,
        manufacturer: card.dataset.manufacturer,
        model: card.dataset.model,
        year: card.dataset.year,
        mileage: card.dataset.mileage,
        price: card.dataset.price,
        image: card.dataset.image
      };
      openCarModal(car); // ✅ This call is critical
    });
  });
}


// 6. Send inquiry
inquireBtn.addEventListener("click", async () => {
  if (!selectedCarId) return;

  const userEmail = localStorage.getItem("loggedInEmail");
  if (!userEmail) {
    alert("You must be logged in to inquire.");
    return;
  }

  const message = document.getElementById("inquiryMessage")?.value.trim() || "";

  try {
    const res = await fetch("php/add_inquiry.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        car_id: selectedCarId,
        user_email: userEmail,
        message: message
      })
    });

    const result = await res.json();
    if (result.success) {
      alert("✅ Inquiry Sent!");
      closeCarModal();
    } else {
      alert("❌ Failed to send inquiry.");
    }
  } catch (err) {
    console.error("Inquiry error:", err);
    alert("Something went wrong.");
  }
});

