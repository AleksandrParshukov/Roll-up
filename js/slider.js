const SCROLL_SPEED = 10;

const sliders = document.querySelectorAll('.slider');
const swipeSliders = document.querySelectorAll('.swipe-slider');

sliders.forEach((slider) => {
  const sliderList = slider.querySelector('.slider__list');
  const sliderNav = slider.querySelector('.slider__nav');
  const sliderNavBtns = sliderNav.querySelectorAll('.slider__nav-btn');
  const marginRight = parseInt(/\d+/.exec(getComputedStyle(sliderList.firstElementChild).marginRight)[0]);
  const offset = sliderList.firstElementChild.clientWidth + marginRight;
  const maxOffset = sliderList.scrollWidth - slider.clientWidth;
  const btnBack = sliderNav.previousElementSibling;
  const btnNext = sliderNav.nextElementSibling;

  let currentIndex = 0;

  btnBack.addEventListener('click', (evt) => {
    evt.preventDefault();
    currentIndex--;
    updateSlider();
  })

  btnNext.addEventListener('click', (evt) => {
    evt.preventDefault();
    currentIndex++;
    updateSlider();
  })

  sliderNavBtns.forEach((button, index) => {
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      currentIndex = index;
      updateSlider();
    })
  })

  function updateSlider() {
    btnBack.disabled = false;
    btnNext.disabled = false;
    sliderNav.querySelector('.slider__nav-btn--current').classList.remove('slider__nav-btn--current');
    sliderNavBtns[currentIndex].classList.add('slider__nav-btn--current');

    sliderList.style.transform = `translateX(${-offset*currentIndex}px)`;

    if (currentIndex === 0) {
      btnBack.disabled = true;
    }

    if (offset*currentIndex >= maxOffset) {
      sliderList.style.transform = `translateX(${-maxOffset}px)`;
    }

    if ((currentIndex === sliderList.children.length - 1)) {
      btnNext.disabled = true;
    }
  }

})

swipeSliders.forEach((slider) => {
  const sliderList = slider.querySelector('.slider__list'); 
  const marginRight = parseInt(/\d+/.exec(getComputedStyle(sliderList.firstElementChild).marginRight)[0]);
  const maxOffset = sliderList.scrollWidth - slider.clientWidth - marginRight;

  sliderList.style.transform = 'traslateX(0px)'
  let posInit = 0;
  let posX2 = 0;
  let trfRegExp = /[-0-9.]+(?=px)/;

  function swipeStart(e) {
    let evt = e.type === 'touchstart' ? e.touches[0] : e;
    posInit = posX1 = evt.clientX;
    sliderList.style.transition = '';

    document.addEventListener('touchmove', swipeAction);
    document.addEventListener('touchend', swipeEnd);
    document.addEventListener('mousemove', swipeAction);
    document.addEventListener('mouseup', swipeEnd);
  }

  function swipeAction(e) {
    let evt = e.type === 'touchmove' ? e.touches[0] : e;
    let style = sliderList.style.transform;
    let transform = +style.match(trfRegExp);

    posX2 = posX1 - evt.clientX;
    posX1 = evt.clientX;

    sliderList.style.transform = `translateX(${transform - posX2}px)`;

    if (transform - posX2 > 0) {
      sliderList.style.transform = 'translateX(0px)';
    }

    if (transform - posX2 < -maxOffset) {
      sliderList.style.transform = `translateX(${-maxOffset}px)`;
    }
  }

  function swipeEnd() {
    // финальная позиция курсора
    posFinal = posInit - posX1;
  
    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);
  
  };

  slider.addEventListener('touchstart', swipeStart);
  slider.addEventListener('mousedown', swipeStart); 
})