var contacts = JSON.parse(localStorage.getItem("contactHubContacts")) || [];
var searchTerm = "";

var contactModalElement = document.getElementById("contactModal");
var contactModal = new bootstrap.Modal(contactModalElement);
var contactForm = document.getElementById("contactForm");
var contactsList = document.getElementById("contactsList");
var emptyState = document.getElementById("emptyState");
var searchInput = document.getElementById("contractSearch");

var formFields = {
  id: document.getElementById("contactId"),
  name: document.getElementById("contactName"),
  phone: document.getElementById("contactPhone"),
  email: document.getElementById("contactEmail"),
  address: document.getElementById("contactAddress"),
  group: document.getElementById("contactGroup"),
  favorite: document.getElementById("contactFavorite"),
  emergency: document.getElementById("contactEmergency"),
};

function saveContacts() {
  localStorage.setItem("contactHubContacts", JSON.stringify(contacts));
}

function getInitials(name) {
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(function (part) {
      return part[0].toUpperCase();
    })
    .join("");
}

function getFilteredContacts() {
  var term = searchTerm.toLowerCase().trim();

  if (!term) {
    return contacts;
  }

  return contacts.filter(function (contact) {
    return (
      contact.name.toLowerCase().includes(term) ||
      contact.phone.toLowerCase().includes(term) ||
      contact.email.toLowerCase().includes(term)
    );
  });
}

function contactCardTemplate(contact) {
  var favoriteClass = contact.favorite ? "isActive" : "";
  var emergencyClass = contact.emergency ? "isActive" : "";

  return `
    <div class="col-12 col-lg-6">
      <article class="contactCard bg-white border border-2 rounded-4 p-3 h-100">
        <div class="d-flex align-items-start gap-3">
          <div class="contactAvatar d-flex align-items-center justify-content-center rounded-4 text-white fw-bold">
            ${getInitials(contact.name)}
          </div>
          <div class="flex-grow-1 min-w-0">
            <div class="d-flex justify-content-between align-items-start gap-2">
              <div class="min-w-0">
                <h3 class="contactName mb-1 text-truncate">${contact.name}</h3>
                <span class="contactGroup badge rounded-pill">${contact.group}</span>
              </div>
              <div class="d-flex gap-1">
                <button type="button" class="iconBtn ${favoriteClass}" title="Toggle favorite" onclick="toggleFavorite('${contact.id}')">
                  <i class="fas fa-star"></i>
                </button>
                <button type="button" class="iconBtn ${emergencyClass}" title="Toggle emergency" onclick="toggleEmergency('${contact.id}')">
                  <i class="fas fa-phone"></i>
                </button>
              </div>
            </div>
            <div class="contactInfo mt-3">
              <p class="mb-2"><i class="fas fa-mobile-screen-button"></i>${contact.phone}</p>
              <p class="mb-2"><i class="fas fa-envelope"></i>${contact.email}</p>
              ${
                contact.address
                  ? `<p class="mb-0"><i class="fas fa-location-dot"></i>${contact.address}</p>`
                  : ""
              }
            </div>
          </div>
        </div>
        <div class="contactActions d-flex justify-content-end gap-2 mt-3 pt-3">
          <button type="button" class="btn btn-sm btn-light rounded-3" onclick="editContact('${contact.id}')">
            <i class="fas fa-pen"></i> Edit
          </button>
          <button type="button" class="btn btn-sm btn-outline-danger rounded-3" onclick="deleteContact('${contact.id}')">
            <i class="fas fa-trash"></i> Delete
          </button>
        </div>
      </article>
    </div>
  `;
}

function sideContactTemplate(contact) {
  return `
    <div class="sideContact d-flex align-items-center gap-2 mb-2">
      <div class="sideAvatar d-flex align-items-center justify-content-center rounded-3 text-white fw-bold">
        ${getInitials(contact.name)}
      </div>
      <div class="min-w-0">
        <h4 class="mb-0 text-truncate">${contact.name}</h4>
        <p class="mb-0 text-truncate">${contact.phone}</p>
      </div>
    </div>
  `;
}

function renderSideList(elementId, list, emptyText) {
  var element = document.getElementById(elementId);
  element.innerHTML = list.length
    ? list.map(sideContactTemplate).join("")
    : `<p class="sideEmpty mb-0">${emptyText}</p>`;
}

function updateStats() {
  var favoriteCount = contacts.filter(function (contact) {
    return contact.favorite;
  }).length;
  var emergencyCount = contacts.filter(function (contact) {
    return contact.emergency;
  }).length;

  document.getElementById("totalContacts").textContent = contacts.length;
  document.getElementById("favoriteContacts").textContent = favoriteCount;
  document.getElementById("emergencyContacts").textContent = emergencyCount;
  document.getElementById(
    "contactsSubtitle"
  ).textContent = `Manage and organize your ${contacts.length} contacts`;
}

function renderContacts() {
  var filteredContacts = getFilteredContacts();

  contactsList.innerHTML = filteredContacts.map(contactCardTemplate).join("");
  emptyState.classList.toggle("d-none", filteredContacts.length > 0);
  contactsList.classList.toggle("d-none", filteredContacts.length === 0);

  renderSideList(
    "favoritesList",
    contacts.filter(function (contact) {
      return contact.favorite;
    }),
    "No favorite contacts yet."
  );
  renderSideList(
    "emergencyList",
    contacts.filter(function (contact) {
      return contact.emergency;
    }),
    "No emergency contacts yet."
  );
  updateStats();
}

function openAddContactModal() {
  contactForm.reset();
  formFields.id.value = "";
  document.getElementById("modalTitle").textContent = "Add Contact";
  contactModal.show();
}

function getContactFormData() {
  return {
    id: formFields.id.value || Date.now().toString(),
    name: formFields.name.value.trim(),
    phone: formFields.phone.value.trim(),
    email: formFields.email.value.trim(),
    address: formFields.address.value.trim(),
    group: formFields.group.value,
    favorite: formFields.favorite.checked,
    emergency: formFields.emergency.checked,
  };
}

function editContact(id) {
  var contact = contacts.find(function (item) {
    return item.id === id;
  });

  if (!contact) {
    return;
  }

  formFields.id.value = contact.id;
  formFields.name.value = contact.name;
  formFields.phone.value = contact.phone;
  formFields.email.value = contact.email;
  formFields.address.value = contact.address;
  formFields.group.value = contact.group;
  formFields.favorite.checked = contact.favorite;
  formFields.emergency.checked = contact.emergency;
  document.getElementById("modalTitle").textContent = "Edit Contact";
  contactModal.show();
}

function deleteContact(id) {
  var contact = contacts.find(function (item) {
    return item.id === id;
  });

  if (!contact || !confirm(`Delete ${contact.name}?`)) {
    return;
  }

  contacts = contacts.filter(function (item) {
    return item.id !== id;
  });
  saveContacts();
  renderContacts();
}

function toggleFavorite(id) {
  contacts = contacts.map(function (contact) {
    if (contact.id === id) {
      contact.favorite = !contact.favorite;
    }
    return contact;
  });
  saveContacts();
  renderContacts();
}

function toggleEmergency(id) {
  contacts = contacts.map(function (contact) {
    if (contact.id === id) {
      contact.emergency = !contact.emergency;
    }
    return contact;
  });
  saveContacts();
  renderContacts();
}

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  var contact = getContactFormData();
  var currentIndex = contacts.findIndex(function (item) {
    return item.id === contact.id;
  });

  if (currentIndex === -1) {
    contacts.push(contact);
  } else {
    contacts[currentIndex] = contact;
  }

  saveContacts();
  renderContacts();
  contactModal.hide();
});

searchInput.addEventListener("input", function (event) {
  searchTerm = event.target.value;
  renderContacts();
});

[
  document.getElementById("navAddContactBtn"),
  document.getElementById("mainAddContactBtn"),
  document.getElementById("emptyAddContactBtn"),
].forEach(function (button) {
  button.addEventListener("click", openAddContactModal);
});

renderContacts();
