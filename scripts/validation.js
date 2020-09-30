const showInputError = (inputElement, formElement, {errorClass, inputErrorClass, ...rest}) => {
  const errorElement = document.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
  inputElement.classList.add(inputErrorClass);
};

const hideInputError = (inputElement, formElement, {errorClass, inputErrorClass, ...rest}) => {
  const errorElement = document.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
  inputElement.classList.remove(inputErrorClass);
};

const checkInputValidity = (inputElement, formElement, rest) => {
  if (inputElement.validity.valid) {
    hideInputError(inputElement, formElement, rest);
  } else {
    showInputError(inputElement, formElement, rest);
  }
};

const isInvalid = (inputs) => {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const makeSubmitButtonDisabled = (button, inactiveButtonClass) => {
  button.classList.add(inactiveButtonClass);
  button.setAttribute('disabled', true);
};

const toggleButtonState = (inputs, button, {inactiveButtonClass, ...rest}) => {
  if (isInvalid(inputs)) {
    makeSubmitButtonDisabled(button, inactiveButtonClass);
  } else {
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute('disabled', true);
  }
};

const enableValidation = ({formSelector, inputSelector, submitButtonSelector, ...rest}) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((formElement) => {
    formElement.addEventListener('submit', ((evt) => {
      evt.preventDefault();
      toggleButtonState(inputs, button, rest);
    }));
    const inputs = Array.from(formElement.querySelectorAll(inputSelector));
    const button = formElement.querySelector(submitButtonSelector);

    inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        //check input validity
        checkInputValidity (inputElement, formElement, rest);
        //togle button state
        toggleButtonState(inputs, button, rest);
        });
    });
  });
};

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__error",
  errorClass: "form__error_active"
});

//legacy - tbr for toggleButtonState
// const toggleButtonState = (inputs, button, {inactiveButtonClass, ...rest}) => {
//   const isValid = inputs.every((inputElement) => inputElement.validity.valid);
//   if (isValid) {
//     button.classList.remove(inactiveButtonClass);
//     button.removeAttribute('disabled', true);
//   } else {
//     button.classList.add(inactiveButtonClass);
//     button.setAttribute('disabled', true);
//   }
// };
