examples.forEach((example) => {
  const link  = example.querySelector('.example__img-link');
  const image = example.querySelector('.example__image');

  link.addEventListener('click', (evt) => {
    evt.preventDefault();
    const newModal = createNewElement();
    const modalImg = newModal.querySelector('.modal__img');
    
    modalImg.setAttribute('src', image.getAttribute('src'));

    example.parentElement.appendChild(newModal);
    document.addEventListener('click', documentClickHandler);

    function documentClickHandler(evt) {
      evt.preventDefault()

      if (evt.target !== modalImg && newModal.contains(evt.target)) {
        example.parentElement.removeChild(newModal);
        document.removeEventListener('click', documentClickHandler);
      }
    }
  })
})

function createNewElement () {
  const element = document.createElement('div');
  const overlay = document.createElement('div');
  const img = document.createElement('img');
  
  overlay.classList.add('modal');
  overlay.classList.add('modal__overlay');
  img.classList.add('modal__img');

  element.appendChild(overlay);
  element.appendChild(img);

  return element;
}