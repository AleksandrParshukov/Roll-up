const SCROLL_SPEED = 10;
const SWIPE_LENGTH = 100;

const sliders = document.querySelectorAll('.slider');
const swipeSliders = document.querySelectorAll('.swipe-slider');

sliders.forEach((slider) => {
  const sliderList = slider.querySelector('.slider__list');
  const sliderNav = slider.querySelector('.slider__nav');
  const sliderNavBtns = sliderNav.querySelectorAll('.slider__nav-btn');
  const marginRight = parseInt(/\d+/.exec(getComputedStyle(sliderList.firstElementChild).marginRight)[0]);
  const offset = sliderList.firstElementChild.clientWidth + marginRight;
  const maxOffset = sliderList.scrollWidth - slider.clientWidth;
  const btnBack = slider.querySelector('.slider__back');
  const btnNext = slider.querySelector('.slider__next');

  let currentIndex = 0;

  if (btnBack) {
    btnBack.addEventListener('click', (evt) => {
      evt.preventDefault();
      currentIndex--;
      updateSlider();
    })
  }
  if (btnNext) {
    btnNext.addEventListener('click', (evt) => {
      evt.preventDefault();
      currentIndex++;
      updateSlider();
    })
  }

  sliderNavBtns.forEach((button, index) => {
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      currentIndex = index;
      updateSlider();
    })
  })

  slider.addEventListener('mousedown', (evt) => {
    xStart = evt.screenX;
  })
  
  slider.addEventListener('mouseup', (evt) => {
    const lenght = evt.screenX - xStart;
    touchendHandler(lenght);
  })

  slider.addEventListener('touchstart', (evt) => {
    xStart = evt.changedTouches[0].clientX;
  })
  
  slider.addEventListener('touchend', (evt) => {
    const lenght = evt.changedTouches[0].clientX - xStart;
    touchendHandler(lenght);
  })


  function touchendHandler(lenght) {
    if (isSwipeLeft(lenght) && currentIndex != sliderList.children.length - 1) {
      currentIndex++;
      updateSlider();
    }

    if (isSwipeRight(lenght)) {
      if (currentIndex > 0) {
        currentIndex--;
      }
      updateSlider();
    }
  }

  function updateSlider() {
    sliderNav.querySelector('.slider__nav-btn--current').classList.remove('slider__nav-btn--current');
    sliderNavBtns[currentIndex].classList.add('slider__nav-btn--current');

    sliderList.style.transform = `translateX(${-offset*currentIndex}px)`;

    if (offset*currentIndex >= maxOffset) {
      sliderList.style.transform = `translateX(${-maxOffset}px)`;
    }

    if (btnBack) {
      btnBack.disabled = false;

      if (currentIndex === 0) {
        btnBack.disabled = true;
      }
    }

    if (btnNext) {
      btnNext.disabled = false;

      if ((currentIndex === sliderList.children.length - 1)) {
        btnNext.disabled = true;
      }
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

  
function isSwipeLeft(length) {
  return length <= -SWIPE_LENGTH;
}

function isSwipeRight(length) {
  return length >= SWIPE_LENGTH;
}