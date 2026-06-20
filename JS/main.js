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
var totalCount1 = document.getElementById("totalCount1");
var totalCount2 = document.getElementById("totalCount2");
var favoriteCount = document.getElementById("favoriteCount");
var emergencyCount = document.getElementById("emergencyCount");
var favoriteContacts = document.getElementById("favoriteContacts");
var emergencyContacts = document.getElementById("emergencyContacts");
var favoriteBtn = document.getElementById("favoriteBtn");
var emergencyBtn = document.getElementById("emergencyBtn");
updateStatics();
display(allContacts);

// error alert function
function errorAlert(title, text) {
  Swal.fire({
    icon: "error",
    title,
    text,
  });
}
// fullName validation funcntion
function nameValidation() {
  if (contactName.value.trim() === "") {
    errorAlert("Missing Name", "Please enter a name for the contact!");
    return false;
  }
  // if the contact name validation isn't true == the alert will appear
  if (!dynamicValidation(contactName)) {
    errorAlert(
      "Invalid Name",
      "Name should contain only letters and spaces (2-50 characters).",
    );
    return false;
  }
  return true;
}
// phone validation funcntion
function phoneValidation() {
  if (contactPhone.value.trim() === "") {
    errorAlert("Missing Phone", "Please enter a phone number!");
    return false;
  }
  if (!dynamicValidation(contactPhone)) {
    errorAlert("Invalid Phone", "Please enter a valid Egyptian phone number");
    return false;
  }
  return true;
}
// email validation funcntion
function emailValidation() {
  if (contactEmail.value.trim() === "") {
    errorAlert("Missing Email", "Please enter an email address!");
    return false;
  }
  if (!dynamicValidation(contactEmail)) {
    errorAlert("Invalid Email", "Please enter a valid email address!");
    return false;
  }
  return true;
}
// add contact function
function addContact() {
  // if the validation not true == stop the function
  if (!nameValidation() || !phoneValidation() || !emailValidation()) {
    return;
  }

  var contact = {
    contactPhoto: "./Images/" + contactPhoto.files[0]?.name || "",
    contactName: contactName.value,
    contactPhone: contactPhone.value,
    contactEmail: contactEmail.value,
    contactAddress: contactAddress.value,
    contactGroup: contactGroup.value,
    notesArea: notesArea.value,
    favoriteCheckbox: favoriteCheckbox.checked,
    emergencyCheckbox: emergencyCheckbox.checked,
  };

  allContacts.push(contact);
  localStorage.setItem("allContacts", JSON.stringify(allContacts));

  display(allContacts);
  updateStatics();
  clearForm();
  // by searching how to close the modal only after add contact
  var modalEl = document.getElementById("staticBackdrop");
  var modalInstance = bootstrap.Modal.getInstance(modalEl);
  modalInstance.hide();
  // if all things are suitable ==> the success alert will appear
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Contact added successfully",
    showConfirmButton: false,
    timer: 1500,
  });
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

  contactName.classList.remove("is-valid", "is-invalid");
  contactPhone.classList.remove("is-valid", "is-invalid");
  contactEmail.classList.remove("is-valid", "is-invalid");
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
}
// display function
function display(arr) {
  var cartona = ``;
  var favCartona = ``;
  var emgCartona = ``;
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
    // to  upadate the data when i reload the page
    favoriteContacts.innerHTML = `
      <p class="text-muted text-center fs-6 py-3 mb-0">no favorite contacts</p>
    `;
    emergencyContacts.innerHTML = `
      <p class="text-muted text-center fs-6 py-3 mb-0">no emergency contacts</p>
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
        favCartona += `
                        <div class="col-12 col-md-6 col-xxl-12">
                          <div
                            class="d-flex align-items-center justify-content-between p-2 rounded-2 border boredr-1  mb-2">
                            <div class="d-flex align-items-center column-gap-2">
                              <span
                                style="width: 40px; height: 40px"
                                class="rounded-3 bg-warning"></span>
                              <div>
                                <h3
                                  class="mb-1 fw-bold text-black"
                                  style="font-size: 14px">
                                  ${arr[i].contactName}
                                </h3>
                                <p class="mb-0" style="font-size: 13px">
                                  ${arr[i].contactPhone}
                                </p>
                              </div>
                            </div>
                            <span
                              style="width: 30px; height: 30px"
                              class="d-flex align-items-center justify-content-center rounded text-secondary bg-light">
                              <i class="fa-solid fa-phone"></i>
                            </span>
                          </div>
                        </div>
                 
    `;
      }

      if (arr[i].emergencyCheckbox) {
        badge2 += `<div
                          class="position-absolute border-2 border border-white d-flex align-items-center justify-content-center emergencyMark">
                          <i class="fa-solid fa-heart-pulse"></i>
                   </div>`;
        contactBadges += `<span class="badge badge2 fw-medium px-3 py-2">Emergency</span>`;
        emgCartona += `
                        <div class="col-12 col-md-6 col-xxl-12">
                          <div
                            class="d-flex align-items-center justify-content-between p-2 rounded-2 border boredr-1  mb-2">
                            <div class="d-flex align-items-center column-gap-2">
                              <span
                                style="width: 40px; height: 40px"
                                class="rounded-3 bg-danger"></span>
                              <div>
                                <h3
                                  class="mb-1 fw-bold text-black"
                                  style="font-size: 14px">
                                  ${arr[i].contactName}
                                </h3>
                                <p class="mb-0" style="font-size: 13px">
                                  ${arr[i].contactPhone}
                                </p>
                              </div>
                            </div>
                            <span
                              style="width: 30px; height: 30px"
                              class="d-flex align-items-center justify-content-center rounded text-secondary bg-light">
                              <i class="fa-solid fa-phone"></i>
                            </span>
                          </div>
                        </div>
    `;
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
                        ${
                          allContacts[i].favoriteCheckbox
                            ? `<button
                          type="button"
                          title="Add to favorites"
                          onclick="togleFav(${i})"  
                          class="actionBtn
                            favoriteBtn
                            btn
                            d-flex
                            align-items-center
                            justify-content-center
                            rounded-3">
                          <i class="fa-solid fa-star"></i>
                        </button>`
                            : `<button
                              onclick="togleFav(${i})"  
                              type="button"
                              title="Add to favorites"
                              class="text-muted border-0 bg-transparent">
                          <i class="fa-regular fa-star"></i>
                        </button>`
                        }
                      
                 ${
                   allContacts[i].emergencyCheckbox
                     ? `<button
                          type="button"
                          title="Add to favorites"
                          onclick="togleEmg(${i})"
                          class="actionBtn
                                 emergencyBtn
                                 btn
                                 d-flex
                                 align-items-center
                                 justify-content-center
                                 "rounded-3">
                          <i class="fa-solid fa-heart-pulse"></i>
                        </button>`
                     : ` <button
                          type="button"
                          onclick="togleEmg(${i})"
                          title="Mark as emergency"
                          class="text-muted border-0 bg-transparent">
                          <i class="fa-regular fa-heart"></i>
                        </button>`
                 }
                         
                       
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
    favoriteContacts.innerHTML =
      favCartona ||
      `
      <p class="text-muted text-center fs-6 py-3 mb-0">no favorite contacts</p>
    `;
    emergencyContacts.innerHTML =
      emgCartona ||
      `
      <p class="text-muted text-center fs-6 py-3 mb-0">no emergency contacts</p>
    `;
  }
}

// delete function
function deleteContact(index) {
  Swal.fire({
    title: "Delete Contact?",
    text: `Are you sure you want to delete ${allContacts[index].contactName}
           This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6B7280",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      allContacts.splice(index, 1);
      localStorage.setItem("allContacts", JSON.stringify(allContacts));
      display(allContacts);
      updateStatics();
      Swal.fire({
        title: "Deleted!",
        text: "Your Contact has been deleted.",
        timer: 1500,
        icon: "success",
      });
    }
  });
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
  var modal = new bootstrap.Modal(document.getElementById("contactModal"));
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
  updateStatics();
  clearForm();
  // to update the local storage
  localStorage.setItem("allContacts", JSON.stringify(allContacts));
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
}
// updateStatics
function updateStatics() {
  totalCount1.innerHTML = allContacts.length;
  totalCount2.innerHTML = allContacts.length;
  var favorites = 0;
  var emergencies = 0;
  for (var i = 0; i < allContacts.length; i++) {
    if (allContacts[i].favoriteCheckbox) {
      // to count the number of favorites
      favorites++;
    }
    if (allContacts[i].emergencyCheckbox) {
      // to count number of emergencies
      emergencies++;
    }
  }
  favoriteCount.innerHTML = favorites;
  emergencyCount.innerHTML = emergencies;
}

// togleFav function
function togleFav(index) {
  // to togle the value of favoritecheckbox
  allContacts[index].favoriteCheckbox = !allContacts[index].favoriteCheckbox;
  // to update the new data
  localStorage.setItem("allContacts", JSON.stringify(allContacts));
  display(allContacts);
  updateStatics();
}
// togleEmg function
function togleEmg(index) {
  // to togle the value of emergencyCheckbox
  allContacts[index].emergencyCheckbox = !allContacts[index].emergencyCheckbox;
  // to update the new data
  localStorage.setItem("allContacts", JSON.stringify(allContacts));
  display(allContacts);
  updateStatics();
}
// dynamic validation
function dynamicValidation(element) {
  // element.id === regex[]
  // we make it dynamic by put the input.id === values of regex object
  var regex = {
    contactName: /^[A-Z][A-Za-z]{2,12}(\s+[A-Za-z]{2,12})+$/,
    contactPhone: /^(002|\+2)?01[0125]\d{8}$/,
    contactEmail: /\w{3,30}@gmail.com/,
  };

  if (element.value.trim() === "") {
    element.classList.remove("is-valid", "is-invalid");
    element.classList.add("mb-3");
    element.nextElementSibling.classList.add("d-none");
    return false;
  } else if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid", "mb-3");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid", "mb-3");
    element.nextElementSibling.classList.remove("d-none");
    return false;
  }
}

/* // validationName function
function validationName() {
  var regex = /^[A-Z][A-Za-z]{2,12}(\s+[A-Za-z]{2,12})+$/;

  if (contactName.value.trim() === "") {
    contactName.classList.remove("is-valid", "is-invalid");
    contactName.classList.add("mb-3");
    contactName.nextElementSibling.classList.add("d-none");
  } else if (regex.test(contactName.value)) {
    contactName.classList.add("is-valid", "mb-3");
    contactName.classList.remove("is-invalid");
    contactName.nextElementSibling.classList.add("d-none");
  } else {
    contactName.classList.add("is-invalid");
    contactName.classList.remove("is-valid", "mb-3");
    contactName.nextElementSibling.classList.remove("d-none");
  }
}
// validationPhone function
function validationPhone() {
  var regex = /^(002|\+2)?01[0125]\d{8}$/;

  if (contactPhone.value.trim() === "") {
    contactPhone.classList.remove("is-valid", "is-invalid");
    contactPhone.classList.add("mb-3");
    contactPhone.nextElementSibling.classList.add("d-none");
  } else if (regex.test(contactPhone.value)) {
    contactPhone.classList.add("is-valid", "mb-3");
    contactPhone.classList.remove("is-invalid");
    contactPhone.nextElementSibling.classList.add("d-none");
  } else {
    contactPhone.classList.add("is-invalid");
    contactPhone.classList.remove("is-valid", "mb-3");
    contactPhone.nextElementSibling.classList.remove("d-none");
  }
}
// validationEmail function
function validationEmail() {
  var regex = /\w{3,30}@gmail.com/;

  if (contactEmail.value.trim() === "") {
    contactEmail.classList.remove("is-valid", "is-invalid");
    contactEmail.classList.add("mb-3");
    contactEmail.nextElementSibling.classList.add("d-none");
  } else if (regex.test(contactEmail.value)) {
    contactEmail.classList.add("is-valid", "mb-3");
    contactEmail.classList.remove("is-invalid");
    contactEmail.nextElementSibling.classList.add("d-none");
  } else {
    contactEmail.classList.add("is-invalid");
    contactEmail.classList.remove("is-valid", "mb-3");
    contactEmail.nextElementSibling.classList.remove("d-none");
  }
} */
