
import { createImageMarkup } from '../index';
 
let gallery = document.querySelector('.gallery');
        
export function renderImages(images) {
  let markup = images.map(image => createImageMarkup(image)).join('');
  gallery.innerHTML = markup;
}

