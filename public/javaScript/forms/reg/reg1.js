const form = document.getElementById("form");
const errorTitle = document.getElementById("classReg");
const errorElement = document.getElementsByClassName("errorBox");
const errorStyle = document.getElementsByClassName(".errorText");

const inputList = document.querySelectorAll(`input`);

// If > 1 => e.preventDefault() is called
let errorSwitch = [];

// Object of Errorszzz
const errorMsg = {
  emptyField: "is required.",
  lettersOnly: "requires letters only.",
  phonePattern: "number example: 555-555-5555.",
  emailPattern: "requires an @",
  zipCode: "requires 5 digits."
};

// const resetErrorFields = () => {};

// const displayErrors = () => {};

// On Page Load Focus goes to first input field
for (let i = 0; i < inputList.length; i++) {
  // console.log(inputList[i]);
  let focusPoint = inputList[0];
  focusPoint.focus();
  // }
}

form.addEventListener("submit", e => {
  // Refresh Form on Submit
  let errorUl = document.getElementsByTagName("ul");
  if (errorUl) {
    for (let i = 0; i < errorUl.length; i++) {
      // If error has been fixed, error field is reset to no error
      errorUl[i].innerHTML = "";
      errorSwitch = [];
    }
  }

  // Iterate over input fields + Custom Validation / Message Creation
  for (let i = 0; i < inputList.length; i++) {
    // Reset Aria
    inputList[i].setAttribute("aria-invalid", false);

    // For empty text fields
    if (
      (inputList[i].type === "text" && inputList[i].value === "") ||
      inputList[i].value === null
    ) {
      errorSwitch.push("Error");
      inputList[i].setAttribute("aria-invalid", true);

      // Create unordered list and class .errorText
      const list = document.createElement("ul");
      list.className = "errorText";

      // Create List Item
      let listItem = document.createElement("li");
      listItem.setAttribute("role", "alert");
      let listValue = document.createTextNode(
        `Error: ${inputList[i].title} ${errorMsg.emptyField}`
      );

      // Add list Value to li
      listItem.append(listValue);

      // Append li to ul
      list.appendChild(listItem);

      // Create variables for input field at it's parent Div
      let inputListErrorIndex = inputList[i];
      let parentDiv = inputListErrorIndex.parentNode;

      // Append ul to parentDiv
      parentDiv.appendChild(list);

      // Add ErrorBox CSS styling to input field
      inputListErrorIndex.className = "errorBox";
    }

    if (inputList[i].type === "text" && inputList[i].value !== "") {
      inputList[i].classList.remove("errorBox");
    }

    

    // For empty email field
    // if (inputList[i].type === "email" && inputList[i].value === "") {
    //   inputList[i].className = "errorBox";

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

    //   let inputListErrorIndex = inputList[i];
    //   let parentDiv = inputListErrorIndex.parentNode;

    //   // Append dynamic list to Error Section
    //   parentDiv.appendChild(list);

    //   inputList[i].className = "errorBox";

    // }
    // if (inputList[i].type === "email" && inputList[i].value !== "") {
    //   inputList[i].classList.remove("errorBox");
    // }

    // For First Name letters only

    // For Last Name letters only

    // For Phone Number Pattern

    // For Email Address Pattern
    
    // For Zip Code pattern / length
  }
  
  let firstErrorInput = document.getElementsByClassName('errorBox');
  const focusPoint = firstErrorInput[0];
  focusPoint.focus();
  
  // If Error Stop Submit page, call Display Errors
  if (errorSwitch.length > 0) {
    e.preventDefault();
    // displayErrors();
  }
});

// // firstErrorInput.focus();