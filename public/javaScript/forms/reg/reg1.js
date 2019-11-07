// H1 Title
const errorTitle = document.getElementById("classReg");

// Selects All inputs
const inputList = document.querySelectorAll(`input`);

// If > 1 => e.preventDefault() is called
let errorSwitch = [];

// Object of Errors
const errorMsg = {
  emptyField: "is required.",
  lettersOnly: "requires letters only.",
  phonePattern: "number example: 555-555-5555.",
  emailPattern: "requires an @",
  zipCode: "requires 5 digits."
};

// Actions performed on Submit
form.addEventListener("submit", e => {
  // Refresh Form on Submit
  let errorUl = document.getElementsByTagName("ul");
  if (errorUl) {
    for (let i = 0; i < errorUl.length; i++) {
      // If error has been fixed, error field is reset to no error
      errorUl[i].innerHTML = "";
      // errorUl.parentNode.removeChild.errorUl;
      errorSwitch = [];
    }
  }

  // Iterate over input fields + Custom Validation / Message Creation
  for (let i = 0; i < inputList.length; i++) {
    // Create variable for inputListField
    let inputListField = inputList[i];

    // Reset Aria
    inputListField.setAttribute("aria-invalid", false);

    detectError(inputListField);

    removeError(inputListField);

    // For empty email field
    // if (inputListField.type === "email" && inputListField.value === "") {
    //   inputListField.className = "errorBox";

    //   // Create unordered list and class .errorText
    //   const list = document.createElement("ul");
    //   list.className = "errorText";

    //   // Create List Item
    //   let listItem = document.createElement("li");
    //   let listValue = document.createTextNode(emptyMessage);

    //   // Create a list in <div>#error</div> of error messages
    //   // Append value to list item
    //   listItem.appendChild(listValue);

    //   // Append list item into the list
    //   list.appendChild(listItem);

    //   let inputListErrorIndex = inputListField;
    //   let parentDiv = inputListErrorIndex.parentNode;

    //   // Append dynamic list to Error Section
    //   parentDiv.appendChild(list);

    //   inputListField.className = "errorBox";

    // }
    // if (inputListField.type === "email" && inputListField.value !== "") {
    //   inputListField.classList.remove("errorBox");
    // }

    // For First Name letters only

    // For Last Name letters only

    // For Phone Number Pattern

    // For Email Address Pattern

    // For Zip Code pattern / length
  }

  // Set Focuspoint on First Error field
  let firstErrorInput = document.getElementsByClassName("errorBox");
  const focusPoint = firstErrorInput[0];
  focusPoint.focus();

  // If Error Stop Submit page, call Display Errors
  if (errorSwitch.length > 0) {
    e.preventDefault();
    // displayErrors();
  }
});

// Detect if there is an error in the input field
let detectError = inputListField => {
  if (
    (inputListField.type === "text" && inputListField.value === "") ||
    inputListField.value === null
  ) {
    makeError(inputListField);
  }
};

// Make the error show under the fields.
let makeError = inputListField => {
  errorSwitch.push("Error");

  // Set Aria Attributes to
  inputListField.setAttribute("aria-invalid", true);
  inputListField.setAttribute("aria-describeby", "errorIdForAria");

  // Create unordered list and class .errorText
  const list = document.createElement("ul");
  list.className = "errorText";

  // Create List Item
  let listItem = document.createElement("li");
  // Give list item ID
  listItem.id = "errorIdForAria";
  let listValue = document.createTextNode(
    `Error: ${inputListField.title} ${errorMsg.emptyField}`
  );

  // Add list Value to li
  listItem.append(listValue);

  // Append li to ul
  list.appendChild(listItem);

  // Create variables for parent Div of ul
  let parentDiv = inputListField.parentNode;

  // Append ul to parentDiv
  parentDiv.appendChild(list);

  // Add ErrorBox CSS styling to input field
  inputListField.className = "errorBox";
};

let removeError = inputListField => {
  if (inputListField.type === "text" && inputListField.value !== "") {
    inputListField.classList.remove("errorBox");
    inputListField.removeAttribute("aria-describeby", "errorIdForAria");
  }
};
