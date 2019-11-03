const form = document.getElementById("form");
const errorTitle = document.getElementById("classReg");
const errorElement = document.getElementById("error");
const errorList = document.getElementsByClassName(".list");
let messages = [];

const displayErrors = () => {
  // Display Error in Title
  errorTitle.innerText = "Class Registration - ERROR";

  // Create unordered list and class .list
  const list = document.createElement("ul");
  list.className = "list";

  // Create a list in <div>#error</div> of error messages
  for (let i = 0; i < messages.length; i++) {
    let listItem = document.createElement("li");
    let listValue = document.createTextNode(messages[i]);

    // Append value to list item
    listItem.appendChild(listValue);

    // Append list item into the list
    list.appendChild(listItem);

    // Append dynamic list to Error Section
    errorElement.append(list);
  }
};

form.addEventListener("submit", e => {
  // Reset Errors to none on Submit
  if (errorElement.firstChild) {
    messages = [];
    errorElement.innerHTML = "";
  }

  // Iterate over input fields + Custom Validation / Message Creation

  for (let i = 0; i < form.elements.length; i++) {
    // For empty text fields
    if (
      (form[i].type === "text" && form[i].value === "") ||
      form[i].value === null
    ) {
      messages.push(`Please fill out ${form[i].name}`);
      form[i].className = "errorBox";
    }

    if (form[i].type === "text" && form[i].value !== "") {
      form[i].classList.remove("errorBox");
    }

    // For empty email field
    if (
      (form[i].type === "email" && form[i].value === "") ||
      form[i].value === null
    ) {
      messages.push(`Please fill out ${form[i].name}`);
      form[i].className = "errorBox";
    }
    if (form[i].type === "email" && form[i].value !== "") {
      form[i].classList.remove("errorBox");
    }

    // For First Name Length

    // For First Name letters only

    // For Last Name Length

    // For Last Name letters only

    // For Phone Number Pattern

    // For Email Address Pattern

    // For Zip Code pattern / length
  }

  // If Error Stop Submit page, call Display Errors
  if (messages.length > 0) {
    e.preventDefault();
    displayErrors();
  }
});
