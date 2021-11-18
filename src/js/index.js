import '../sass/main.scss';

// Import Function
import apiService from './apiService';

// Import Tеmplates
import cardsMarkup from '../templates/card';

// Refs
const galery = document.querySelector('.gallery');
const search = document.querySelector('.js-search');
const inputEl = document.querySelector('#input');
const btnMorePic = document.querySelector('.js-btn');
const scroll = document.querySelector('body');

btnMorePic.style.visibility = 'hidden';

search.addEventListener('click', e => {
  e.preventDefault();

  const value = inputEl.value;
  let pageNum = 1;

  firstRendering(value, pageNum);

  btnMorePic.addEventListener('click', () => {
    pageNum += 1;

    if (value === inputEl.value) {
      nextsRenderings(value, pageNum);
    } else {
      pageNum = 1;
      return;
    }
  });
});

function firstRendering(value, pageNum) {
  if (value === '') {
    alert('Ведите название картинки');
    return;
  }
  checkRender(value, pageNum);
}

function nextsRenderings(value, pageNum) {
  apiService(value, pageNum)
    .then(card => {
      galery.insertAdjacentHTML('beforeend', cardsMarkup(card.hits));
    })
    .then(() => {
      scroll.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    });
}

function checkRender(value, pageNum) {
  apiService(value, pageNum).then(card => {
    if (card.hits.length === 0) {
      alert('Такой картинки нет');
      return;
    }
    galery.innerHTML = cardsMarkup(card.hits);
    btnMorePic.style.visibility = 'visible';
  });
}
