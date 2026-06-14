// to check if there are contacts of not
var allContacts = [];
if (localStorage.getItem("allContacts")) {
  allContacts = JSON.parse(localStorage.getItem("allContacts"));
} // or var allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];

var contractSearch = document.getElementById("contractSearch");
var contactPhoto = document.getElementById("contactPhoto");
var contactName = document.getElementById("contactName");
var contactPhone = document.getElementById("contactPhone");
var contactEmail = document.getElementById("contactEmail");
var contactAddress = document.getElementById("contactAddress");
var contactGroup = document.getElementById("contactGroup");
var notesArea = document.getElementById("notesArea");
var favoriteCheckbox = document.getElementById("favoriteCheckbox");
var emergencyCheckbox = document.getElementById("emergencyCheckbox");
// the place that the contact will appear in
var contactPlace = document.getElementById("contactPlace");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var updateIndex;
var totalCount = document.getElementById("totalCount");
var favoriteCount = document.getElementById("favoriteCount");
var emergencyCount = document.getElementById("emergencyCount");

display(allContacts);

// add contact function
function addContact() {
  var contact = {
    contactPhoto: "./Images/" + contactPhoto.files[0]?.name || "",
    contactName: contactName.value,
    contactPhone: contactPhone.value,
    contactEmail: contactEmail.value,
    contactAddress: contactAddress.value,
    contactGroup: contactGroup.value,
    notesArea: notesArea.value,
    // we use .checked to check if the user choise the checkbox or not
    favoriteCheckbox: favoriteCheckbox.checked, // return true or false
    emergencyCheckbox: emergencyCheckbox.checked, // return true or false
  };
  allContacts.push(contact);
  localStorage.setItem("allContacts", JSON.stringify(allContacts));
  display(allContacts);
  clearForm();
}
// clear form
function clearForm() {
  contactPhoto.value = null;
  contactName.value = "";
  contactPhone.value = "";
  contactEmail.value = "";
  contactAddress.value = "";
  contactGroup.value = "";
  notesArea.value = "";
  favoriteCheckbox.checked = false;
  emergencyCheckbox.checked = false;
}
// display function
function display(arr) {
  var cartona = ``;
  if (arr.length === 0) {
    contactPlace.innerHTML = `
    <div class="bottomLeftSide py-5">
                <div
                  class="d-flex align-items-center justify-content-center mb-3">
                  <div
                    class="nocontactsIcon d-flex align-items-center justify-content-center rounded-4">
                    <i class="fa-solid fa-address-book fs-3"></i>
                  </div>
                </div>
                <p class="text-muted text-center fs-6 fw-medium mb-1">
                  No contacts found
                </p>
                <p
                  class="text-center mb-0"
                  style="font-size: 14px; color: #99a1af">
                  Click "Add Contact" to get started
                </p>
              </div>
    `;
  } else {
    for (let i = 0; i < arr.length; i++) {
      var badge1 = ``;
      var badge2 = ``;
      var contactBadges = ``;

      if (arr[i].contactGroup) {
        // if the user select value of options it will appear in the badges
        contactBadges += `<span class="badge badge1 fw-medium px-3 py-2">${arr[i].contactGroup}</span>`;
      }

      if (arr[i].favoriteCheckbox) {
        badge1 += `<div
                          class="position-absolute border-2 border bg-warning border-white d-flex align-items-center justify-content-center rounded-circle favoriteMark">
                          <i class="fas fa-star"></i>
                 </div>`;
      }

      if (arr[i].emergencyCheckbox) {
        badge2 += `<div
                          class="position-absolute border-2 border border-white d-flex align-items-center justify-content-center emergencyMark">
                          <i class="fa-solid fa-heart-pulse"></i>
                   </div>`;
        contactBadges += `<span class="badge badge2 fw-medium px-3 py-2">Emergency</span>`;
      }
      cartona += `
      <div class="col-12 col-md-6">
                  <div class="box rounded-4 border border-2 p-3">
                    <div
                      class="contactDetails mb-3 d-flex align-items-center column-gap-3 bg-white rounded-4">
                      <span
                        class="d-flex align-items-center justify-content-center rounded-3 text-white aboutContractIcon position-relative  ">
                        ${badge1}
                        ${badge2}
                      </span>
                      <div class="">
                        <h3 class="text-dark fs-6 fw-semibold mb-1">
                          ${arr[i].contactName}
                        </h3>
                        <div class="d-flex align-items-center column-gap-1">
                          <span
                            class="phoneIcone rounded-2 d-flex align-items-center justify-content-center">
                            <i class="fa-solid fa-phone text-primary"></i>
                          </span>
                          <p class="text-muted ms-2 mb-0">${arr[i].contactPhone}
                          </p>
                        </div>
                    </div>
                  </div>
                    <div class="d-flex column-gap-3 align-items-center mb-2">
                      <span
                        class="mailIcon d-flex align-items-center justify-content-center rounded-2">
                        <i class="fa-solid fa-envelope"></i>
                      </span>
                      <p class="mb-0">${arr[i].contactEmail}</p>
                    </div>
                    <div class="d-flex column-gap-3 align-items-center">
                      <span
                        class="locationIcon d-flex align-items-center justify-content-center rounded-2">
                        <i class="fa-solid fa-location-dot"></i>
                      </span>
                      <p class="mb-0">${arr[i].contactAddress}</p>
                    </div>
                    <div
                      class="d-flex align-items-center column-gap-2 mt-2 pb-3 border-light border-bottom">
                      ${contactBadges}
                    </div>

                    <div
                      class="d-flex align-items-center justify-content-between">
                      <div class="links d-flex align-items-center column-gap-2">
                        <a href="tel:${arr[i].contactPhone}" class="text-decoration-none">
                          <span
                            class="linkIcon phoneLinkIcon d-flex align-items-center justify-content-center rounded-2">
                            <i class="fa-solid fa-phone"></i>
                          </span>
                        </a>
                        <a
                          href="mailto:${arr[i].contactEmail}"
                          class="text-decoration-none">
                          <span
                            class="linkIcon mailLinkIcon d-flex align-items-center justify-content-center rounded-2">
                            <i class="fa-solid fa-envelope"></i>
                          </span>
                        </a>
                      </div>
                      <div
                        class="buttons d-flex align-items-center column-gap-2">
                        <button
                          type="button"
                          title="Add to favorites"
                          class="actionBtn favoriteBtn btn d-flex align-items-center justify-content-center rounded-3">
                          <i class="fa-solid fa-star"></i>
                        </button>
                        <button
                          type="button"
                          title="Mark as emergency"
                          class="actionBtn emergencyBtn btn d-flex align-items-center justify-content-center rounded-3">
                          <i class="fa-solid fa-heart-pulse"></i>
                        </button>
                        <button
                          type="button"
                          onclick="setFormForUpdate(${i})"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          title="Edit contact"
                          class="actionBtn editBtn btn d-flex align-items-center justify-content-center text-secondary">
                          <i class="fa-solid fa-pen"></i>
                        </button>
                        <button
                          onclick="deleteContact(${i})"
                          type="button"
                          title="Delete contact"
                          class="actionBtn deleteBtn btn d-flex align-items-center justify-content-center text-secondary">
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>`;
    }
    contactPlace.innerHTML = cartona;
  }
}

// delete function
function deleteContact(index) {
  allContacts.splice(index, 1);
  localStorage.setItem("allContacts", JSON.stringify(allContacts));
  display(allContacts);
}

// search fnuction
function search() {
  var searchContacts = [];
  for (let i = 0; i < allContacts.length; i++) {
    if (
      allContacts[i].contactName
        .toLowerCase()
        .includes(contractSearch.value.toLowerCase().trim())
    ) {
      searchContacts.push(allContacts[i]);
    }
  }
  display(searchContacts);
}
// setFormForUpdate function
function setFormForUpdate(index) {
  updateIndex = index;
  contactName.value = allContacts[index].contactName;
  contactPhone.value = allContacts[index].contactPhone;
  contactEmail.value = allContacts[index].contactEmail;
  contactAddress.value = allContacts[index].contactAddress;
  contactGroup.value = allContacts[index].contactGroup;
  notesArea.value = allContacts[index].notesArea;
  //allContacts[index].favoriteCheckbox; it will return true or false
  favoriteCheckbox.checked = allContacts[index].favoriteCheckbox;
  emergencyCheckbox.checked = allContacts[index].emergencyCheckbox;

  // sytling the buttons
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
  // ===============================================================================================
  const modal = new bootstrap.Modal(document.getElementById("contactModal"));
  modal.show();
}
// updateContact function
function updateContact() {
  allContacts[updateIndex].contactName = contactName.value;
  allContacts[updateIndex].contactPhone = contactPhone.value;
  allContacts[updateIndex].contactEmail = contactEmail.value;
  allContacts[updateIndex].contactAddress = contactAddress.value;
  allContacts[updateIndex].contactGroup = contactGroup.value;
  allContacts[updateIndex].notesArea = notesArea.value;
  allContacts[updateIndex].favoriteCheckbox = favoriteCheckbox.checked;
  allContacts[updateIndex].emergencyCheckbox = emergencyCheckbox.checked;
  display(allContacts);
  clearForm();
  // to update the local storage
  localStorage.setItem("allContacts", JSON.stringify(allContacts));
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
}

// updateStatics

function updateStatics() {}
var ayhaga = allContacts.length();
totalCount.innerHTML = ayhaga;
