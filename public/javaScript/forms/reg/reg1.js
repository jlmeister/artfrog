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
  // Refresh List Item Errors to None on Submit
  let errorUl = document.getElementsByClassName("errorText");
  if (errorUl) {
    for (let i = 0; i < errorUl.length; i++) {
      // If error has been fixed, error field is reset to no error
      let allErrorUls = errorUl[i];
      allErrorUls.innerHTML = "";
      errorSwitch = [];
    }
  }

  // Iterate over input fields + Custom Validation / Message Creation
  for (let i = 0; i < inputList.length; i++) {
    // Create variable for inputListField
    let inputListField = inputList[i];

    // Reset Aria
    inputListField.setAttribute("aria-invalid", false);

    // Empty Field Errors
    detectEmptyField(inputListField);
    removeEmptyError(inputListField);

    // For Email Address Pattern
    


    // For Phone Number Pattern


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
let detectEmptyField = inputListField => {
  // For Empty Input Fields
  if (
    (inputListField.type === "text" && inputListField.value === "") ||
    (inputListField.type === "email" && inputListField.value === "")
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

let removeEmptyError = inputListField => {
  if (
    (inputListField.type === "text" && inputListField.value !== "") ||
    (inputListField.type === "email" && inputListField.value !== "")
  ) {
    inputListField.classList.remove("errorBox");
    inputListField.removeAttribute("aria-describeby", "errorIdForAria");

    // Attempting to remove errorText UL....
    // let errorUl = document.getElementsByClassName("errorText");
    // let parentDiv = errorUl.parentNode;
    // parentDiv.removeChild(errorUl);
  }
};
