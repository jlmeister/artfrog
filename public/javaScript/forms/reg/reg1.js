const form = document.getElementById("form");
const errorTitle = document.getElementById("classReg");
const errorElement = document.getElementById("error");
const errorList = document.getElementsByClassName(".list");
let errorSwitch = [];

const errorMsg = {
  emptyField: "is required.",
  tooShort: "is too short.",
  tooLong: "is too long.",
  lettersOnly: "requires letters only.",
  phonePattern: "number example: 555-555-5555.",
  emailPattern: "requires an @",
  zipCode: "requires 5 digits."
};

// const resetErrorFields = () => {};

// const displayErrors = () => {};

form.addEventListener("submit", e => {
  // Refresh Form on Submit
  // resetErrorFields();
  let errorUl = document.getElementsByTagName("ul");
  for (let i = 0; i < errorUl.length; i++) {
    // Reset Errors to none on Submit
    if (errorUl) {
      errorUl[i].innerHTML = "";
      errorSwitch = [];
    }
  }

  // Iterate over input fields + Custom Validation / Message Creation
  for (let i = 0; i < form.elements.length; i++) {
    // Reset Aria
    form[i].setAttribute("aria-invalid", false);


    // For empty text fields
    if (
      (form[i].type === "text" && form[i].value === "") ||
      form[i].value === null
    ) {
      errorSwitch.push("Error");
      
      form[i].setAttribute("aria-invalid", true);
      // displayErrors(errorMsg);
      // Display Error in Page H1
      errorTitle.innerText = "Class Registration - ERROR";

      // Create unordered list and class .list
      const list = document.createElement("ul");
      list.className = "list";

      // Create List Item
      let listItem = document.createElement("li");
      listItem.setAttribute("role", "alert");
      let listValue = document.createTextNode(
        `Error: ${form[i].title} ${errorMsg.emptyField}`
      );

      // Add list Value to li
      listItem.append(listValue)

      // // Add Alert Role to List Item
      // listItem.addAttribute("role", "alert");

      // Append li to ul
      list.appendChild(listItem);

      // Create variables for input field at it's parent Div
      let formErrorIndex = form[i];
      let parentDiv = formErrorIndex.parentNode;

      // Append ul to parentDiv
      parentDiv.appendChild(list);

      // Add ErrorBox CSS styling to input field
      formErrorIndex.className = "errorBox";

      // Give Focus to first error field
      for (let i = 0; i < errorUl.length; i++) {
        focusPoint = errorUl[0].previousElementSibling;
        focusPoint.focus();
      }
    }

    if (form[i].type === "text" && form[i].value !== "") {
      form[i].classList.remove("errorBox");
    }

    // For empty email field
    // if (form[i].type === "email" && form[i].value === "") {

    //   form[i].className = "errorBox";

    //   // Create unordered list and class .list
    //   const list = document.createElement("ul");
    //   list.className = "list";

    //   // Create List Item
    //   let listItem = document.createElement("li");
    //   let listValue = document.createTextNode(emptyMessage);

    //   // Create a list in <div>#error</div> of error messages
    //   // Append value to list item
    //   listItem.appendChild(listValue);

    //   // Append list item into the list
    //   list.appendChild(listItem);

    //   let formErrorIndex = form[i];
    //   let parentDiv = formErrorIndex.parentNode;

    //   // Append dynamic list to Error Section
    //   parentDiv.appendChild(list);

    //   form[i].className = "errorBox";

    //   for (let i = 0; i < errorUl.length; i++) {
    //     focusPoint = errorUl[1].previousElementSibling;
    //     focusPoint.autofocus;
    //   }
    // }
    // if (form[i].type === "email" && form[i].value !== "") {
    //   form[i].classList.remove("errorBox");
    // }

    // For First Name Length

    // For First Name letters only

    // For Last Name Length

    // For Last Name letters only

    // For Phone Number Pattern

    // For Email Address Pattern

    // For Zip Code pattern / length
  }

  // If Error Stop Submit page, call Display Errors
  if (errorSwitch.length > 0) {
    e.preventDefault();
    // displayErrors();
  }
});
