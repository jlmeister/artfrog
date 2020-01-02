// H1 Title
const title = document.getElementById('classReg');

// Selects All inputs
const inputList = document.querySelectorAll(`input`);

// If > 1 => e.preventDefault() is called
const errorSwitch = [];

// Object of Error Messages
const errorMsg = {
  emptyField: 'is required.',
  dob: 'Please enter a valid DOB: example mm/dd/yyyy',
  phonePattern: 'number example: 555-555-5555.',
  emailPattern: 'requires a valid email.',
  zipPattern: 'requires 5 digits.',
  yesNo: 'Please check a box.',
};

// Actions performed on Submit
form.addEventListener('submit', e => {
  e.preventDefault();
  // Refresh List Item Errors to None on Submit
  const errorUl = document.getElementsByClassName('errorText');
  if (errorUl) {
    for (let i = 0; i < errorUl.length; i++) {
      // If error has been fixed, error field is reset to no error
      const allErrorUls = errorUl[i];
      allErrorUls.innerHTML = '';
    }
  }

  // Iterate over input fields + Custom Validation / Message Creation
  for (let i = 0; i < inputList.length; i++) {
    // Create variable for inputListField
    const inputListField = inputList[i];

    // Reset Aria
    inputListField.setAttribute('aria-invalid', false);

    // Empty Field Errors
    if (detectEmptyField(inputListField)) {
      const errMsg = `Error: ${inputListField.dataset.error} ${errorMsg.emptyField}`;
      makeError(inputListField, errMsg);
    } else {
      removeError(inputListField);
    }

    // For DOB Pattern
    if (detectDobError(inputListField)) {
      const errMsg = `Error: ${inputListField.dataset.error} ${errorMsg.dob}`;
      makeError(inputListField, errMsg);
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

    // For Zip Code pattern / length
    if (detectZipError(inputListField)) {
      const errMsg = `Error: ${inputListField.dataset.error} ${errorMsg.zipPattern}`;
      makeError(inputListField, errMsg);
    }
  }

  // Set Focuspoint on First Error field

  if (errorSwitch.length > 0) {
    const firstErrorInput = document.getElementsByClassName('errorBox');
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
const detectEmptyField = inputListField => {
  const notRequired = inputListField.classList.contains('noRequire');
  // For Empty Input Field
  if (
    (!notRequired &&
      inputListField.type === 'text' &&
      inputListField.value === '') ||
    (inputListField.type === 'email' && inputListField.value === '')
  ) {
    return true;
  }
};

const detectDobError = inputListField => {
  const dobInput = document.querySelectorAll('input[name=studentDOB]');
  const dobValue = dobInput[0].value;
  // let dobInput = inputListField;

  const re = /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/;

  if (
    inputListField.name === 'studentDOB' &&
    inputListField.value !== '' &&
    !re.test(String(dobValue))
  ) {
    return true;
  }
};

const detectEmailError = inputListField => {
  // For Email Address Pattern
  const emailInput = document.querySelectorAll('input[type=email]');
  const emailValue = emailInput[0].value;

  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  if (
    inputListField.type === 'email' &&
    inputListField.value !== '' &&
    !re.test(String(emailValue).toLowerCase())
  ) {
    return true;
  }
};

const detectZipError = inputListField => {
  // For Email Address Pattern
  const zipInput = document.querySelectorAll('input[name=zipCode]');
  const zipValue = zipInput[0].value;

  const re = /^[0-9]{5}(?:-[0-9]{4})?$/;

  if (
    inputListField.name === 'zipCode' &&
    inputListField.value !== '' &&
    !re.test(String(zipValue))
  ) {
    return true;
  }
};

const detectPhoneError = inputListField => {
  const phoneInput = inputListField;

  const re = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

  if (
    inputListField.name === 'phone' &&
    inputListField.value !== '' &&
    !re.test(String(phoneInput.value))
  ) {
    return true;
  }
};

// Make the error show under the fields.
const makeError = (inputListField, errMsg) => {
  // Error is true
  errorSwitch.push('Error');

  // Make number for inputfield
  const inputNumber = `${inputListField.dataset.number}`;

  // Set Aria Attributes to
  inputListField.setAttribute('aria-invalid', true);
  inputListField.setAttribute(
    'aria-describedby',
    `errorIdForAria${inputNumber}`
  );

  // Create unordered list and class .errorText
  const list = document.createElement('ul');
  list.className = 'errorText';

  // Create List Item
  const listItem = document.createElement('li');
  // Give list item ID
  listItem.id = `errorIdForAria${inputNumber}`;
  const listValue = document.createTextNode(`${errMsg}`);

  // Add list Value to li
  listItem.append(listValue);

  // Append li to ul
  list.appendChild(listItem);

  // Create variables for parent Div of ul
  const parentDiv = inputListField.parentNode;

  // Append ul to parentDiv
  parentDiv.appendChild(list);

  // Add ErrorBox CSS styling to input field
  inputListField.className = 'errorBox';
};

const removeError = inputListField => {
  const inputNumber = `${inputListField.dataset.number}`;
  inputListField.setAttribute('aria-invalid', false);
  inputListField.classList.remove('errorBox');
  inputListField.removeAttribute(
    'aria-describedby',
    `errorIdForAria${inputNumber}`
  );
};

const handleSubmit = () => {
  const inputList = document.querySelectorAll('input');

  const newUser = {};
  for (let i = 0; i < inputList.length; i++) {
    // Create variable for inputListField
    const inputListField = inputList[i];
    if (inputListField.type !== 'checkbox') {
      newUser[inputListField.dataset.iname] = inputListField.value;
    }
  }

  for (let i = 0; i < inputList.length; i++) {
    const inputListField = inputList[i];
    if (inputListField.type === 'checkbox' && inputListField.checked) {
      newUser[inputListField.dataset.iname] = inputListField.checked;
    }
  }

  classInfoObject = document.getElementById('class-info');
  newUser.class_id = parseInt(classInfoObject.innerText);

  axios({
    method: 'post',
    url: '/register',
    data: newUser,
  })
    .then(function(response) {
      window.location.assign(response.data.redirect);
    })
    .catch(function(error) {
      console.log(error);
    });
};
