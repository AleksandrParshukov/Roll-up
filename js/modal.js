const modals = document.querySelectorAll('.modal');
const feedbackOpeners = document.querySelectorAll('.feedback-open');
const feedback = document.querySelector('.feedback').parentElement;
const feedbaclSubmit = feedback.querySelector('.feedback__submit');
const success = document.querySelector('.success').parentElement;
const examples = document.querySelectorAll('.example');
const exampleOpeners = document.querySelectorAll('.gallery__link');

modals.forEach((modal) => {
  const modalClose = modal.querySelector('.modal__close');

  modalClose.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.classList.add('modal--close')
  })
})

feedbackOpeners.forEach((button) => {
  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    feedback.classList.remove('modal--close');
  })
})

feedbaclSubmit.addEventListener('click', (evt) => {
  evt.preventDefault();
  feedback.classList.add('modal--close');
  success.classList.remove('modal--close');
})

examples.forEach((example) => {
  const exampleButton = example.querySelector('.example__button');

  exampleButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    example.parentElement.classList.add('modal--close');
    feedback.classList.remove('modal--close');
  })
})

exampleOpeners.forEach((link, index) => {
  link.addEventListener('click', (evt) => {
    evt.preventDefault();
    examples[index].parentElement.classList.remove('modal--close');
  })
})