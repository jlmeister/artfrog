// Selects All inputs
const inputList = document.querySelectorAll(`input`);

// If > 1 => e.preventDefault() is called
let errorSwitch = [];

// Object of Error Messages
const errorMsg = {
  emptyField: "is required.",
  dob: "Please enter a valid DOB: example dd/mm/yyyy",
  phonePattern: "number example: 555-555-5555.",
  emailPattern: "requires a valid email.",
  zipPattern: "requires 5 digits.",
  yesNo: "Please check a box."
};

// Actions performed on Submit
form.addEventListener("submit", e => {
  e.preventDefault();
  // Refresh List Item Errors to None on Submit
  let errorUl = document.getElementsByClassName("errorText");
  if (errorUl) {
    for (let i = 0; i < errorUl.length; i++) {
      // If error has been fixed, error field is reset to no error
      let allErrorUls = errorUl[i];
      allErrorUls.innerHTML = "";
    }
  }

  // Text Area Empty
  const areaId = document.getElementById("message");
  if (areaId.value === "") {
    const errMsg = `Error: Message is required.`;
    makeTextAreaError(areaId, errMsg);
  } else {
    removeAreaBoxError(areaId);
  }

  // Iterate over input fields + Custom Validation / Message Creation
  for (let i = 0; i < inputList.length; i++) {
    // Create variable for inputListField
    let inputListField = inputList[i];

    // Reset Aria
    inputListField.setAttribute("aria-invalid", false);

    // Empty Field Errors
    if (detectEmptyField(inputListField)) {
      const errMsg = `Error: ${inputListField.dataset.error} ${errorMsg.emptyField}`;
      makeError(inputListField, errMsg);
    } else {
      removeError(inputListField);
    }

    // For Phone Number Pattern
    // detectPhoneError(inputListField);
    if (detectPhoneError(inputListField)) {
      const errMsg = `Error: ${inputListField.dataset.error} ${errorMsg.phonePattern}`;
      makeError(inputListField, errMsg);
    }

    // Email Formatting Error
    if (detectEmailError(inputListField)) {
      const errMsg = `Error: ${inputListField.dataset.error} ${errorMsg.emailPattern}`;
      makeError(inputListField, errMsg);
    }
  }

  // Set Focuspoint on First Error field

  if (errorSwitch.length > 0) {
    let firstErrorInput = document.getElementsByClassName("errorBox");
    const focusPoint = firstErrorInput[0];
    focusPoint.focus();
  }

  // If Error Stop Submit page, call Display Errors
  if (errorSwitch.length > 0) {
    e.preventDefault();
    errorSwitch.length = 0;
  } else if (errorSwitch.length === 0) {
    e.preventDefault();
    handleSubmit();
    errorSwitch.length = 0;
  }
});

// Detect if there is an error in the input field
let detectEmptyField = inputListField => {
  // For Empty Input Field
  if (
    (inputListField.type === "text" && inputListField.value === "") ||
    (inputListField.type === "email" && inputListField.value === "")
  ) {
    return true;
  }
};

let detectEmailError = inputListField => {
  // For Email Address Pattern
  let emailInput = document.querySelectorAll("input[type=email]");
  let emailValue = emailInput[0].value;

  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  if (
    inputListField.type === "email" &&
    inputListField.value !== "" &&
    !re.test(String(emailValue).toLowerCase())
  ) {
    return true;
  }
};

let detectPhoneError = inputListField => {
  let phoneInput = inputListField;

  const re = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

  if (
    inputListField.name === "phone" &&
    inputListField.value !== "" &&
    !re.test(String(phoneInput.value))
  ) {
    return true;
  }
};

// Make the error show under the fields.
let makeError = (inputListField, errMsg) => {
  // Error is true
  errorSwitch.push("Error");

  // Make number for inputfield
  let inputNumber = `${inputListField.dataset.number}`;

  // Set Aria Attributes to
  inputListField.setAttribute("aria-invalid", true);
  inputListField.setAttribute(
    "aria-describedby",
    `errorIdForAria${inputNumber}`
  );

  // Create unordered list and class .errorText
  const list = document.createElement("ul");
  list.className = "errorText";

  // Create List Item
  let listItem = document.createElement("li");
  // Give list item ID
  listItem.id = `errorIdForAria${inputNumber}`;
  let listValue = document.createTextNode(`${errMsg}`);

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

// Make the error show under the fields.
let makeTextAreaError = (areaId, errMsg) => {
  // Error is true
  errorSwitch.push("Error");

  // Make number for inputfield
  let inputNumber = `${areaId.dataset.number}`;

  // Set Aria Attributes to
  areaId.setAttribute("aria-invalid", true);
  areaId.setAttribute("aria-describedby", `errorIdForAria${inputNumber}`);

  // Create unordered list and class .errorText
  const list = document.createElement("ul");
  list.className = "errorText";

  // Create List Item
  let listItem = document.createElement("li");
  // Give list item ID
  listItem.id = `errorIdForAria${inputNumber}`;
  let listValue = document.createTextNode(`${errMsg}`);

  // Add list Value to li
  listItem.append(listValue);

  // Append li to ul
  list.appendChild(listItem);

  // Create variables for parent Div of ul
  let parentDiv = areaId.parentNode;

  // Append ul to parentDiv
  parentDiv.appendChild(list);

  // Add ErrorBox CSS styling to input field
  areaId.className = "errorBox";
};

let removeError = (inputListField, areaId) => {
  let inputNumber = `${inputListField.dataset.number}`;
  inputListField.setAttribute("aria-invalid", false);
  inputListField.classList.remove("errorBox");
  inputListField.removeAttribute(
    "aria-describedby",
    `errorIdForAria${inputNumber}`
  );
};

let removeAreaBoxError = areaId => {
  let inputNumber = `${areaId.dataset.number}`;
  areaId.setAttribute("aria-invalid", false);
  areaId.classList.remove("errorBox");
  areaId.removeAttribute("aria-describedby", `errorIdForAria${inputNumber}`);
};

const handleSubmit = () => {
  const inputList = document.querySelectorAll("input");
  const areaId = document.getElementById("message");

  let newContactMessage = {};

  for (let i = 0; i < inputList.length; i++) {
    // Create variable for inputListField
    let inputListField = inputList[i];
    if (inputListField.type !== "checkbox") {
      newContactMessage[inputListField.dataset.error] = inputListField.value;
    }
  }

  // Add Message - Text Area
  newContactMessage[areaId.dataset.error] = areaId.value;

  console.log(newContactMessage);

  axios({
    method: "post",
    url: "http://localhost:80/api/register",
    data: newContactMessage
  })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};
