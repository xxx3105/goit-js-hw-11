import Notiflix from 'notiflix';
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const BASE_URL = 'https://pixabay.com/api/?key=38025411-600b4c6c49c6550b6dbadacb0';

let formEl = document.querySelector('.search-form');
let inputEl = document.querySelector('input[name="searchQuery"]');
let btnLoadMore = document.querySelector('.load-more');
let gallery = document.querySelector('.gallery');
let currentPage = 1;
let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

formEl.addEventListener('submit', handleFormSubmit);
btnLoadMore.addEventListener('click', handleLoadMoreClick);

async function handleFormSubmit(e) {
  e.preventDefault();
  let searchQuery = inputEl.value.trim();

  if (!searchQuery) {
    return;
  }

  currentPage = 1;

  try {
    let data = await fetchImages(searchQuery);
    
    if (data.totalHits > currentPage * 40) {
      btnLoadMore.classList.remove("is-hidden");
    }

    if (data.total === 0) {
      showErrorMessage('Sorry, there are no images matching your search query. Please try again.');
    } else {
      showSuccessMessage(`Hooray! We found ${data.total} images.`);
    }

    renderImages(data.hits);
    lightbox.refresh();
  } catch (error) {
    console.log(error);
    showErrorMessage('Oops! Something went wrong. Please try again later.');
  }
}

async function handleLoadMoreClick() {
  currentPage++;
  
  try {
    let data = await fetchImages(inputEl.value);

    if (data.totalHits <= currentPage * 40) {
      btnLoadMore.classList.add("is-hidden");
      showWarningMessage('We are sorry, but you have reached the end of the search results.');
    }

    renderImages(data.hits);
    lightbox.refresh();
  } catch (error) {
    console.log(error);
    showErrorMessage('Oops! Something went wrong. Please try again later.');
  }
}

async function fetchImages(searchQuery) {
  const response = await axios.get(`${BASE_URL}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=40`);
  return response.data;
}

function renderImages(images) {
  let markup = images.map(image => createImageMarkup(image)).join('');
  gallery.innerHTML = markup;
}

function createImageMarkup({ webformatURL, tags, likes, views, comments, downloads, largeImageURL }) {
  return `<div class="photo-card">
    <a href="${largeImageURL}" class="link">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>Likes: ${likes}</b>
      </p>
      <p class="info-item">
        <b>Views: ${views}</b>
      </p>
      <p class="info-item">
        <b>Comments: ${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads: ${downloads}</b>
      </p>
    </div>
  </div>`;
}

function showSuccessMessage(message) {
  Notiflix.Notify.success(message);
}

function showErrorMessage(message) {
  Notiflix.Notify.failure(message);
}

function showWarningMessage(message) {
  Notiflix.Notify.warning(message);
}