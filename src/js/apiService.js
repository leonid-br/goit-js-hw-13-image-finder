const BASE_URL = 'https://pixabay.com/api/';
const KEY = '?key=22290426-07a1b6b21ce6d6b5919cefbe3';
const CEARCH_PARAM = `&image_type=photo&orientation=horizontal&per_page=12&q=`;

export default function fetchImg(searchPicture, pageNum) {
  const url = `${BASE_URL}${KEY}${CEARCH_PARAM}${searchPicture}&page=${pageNum}`;

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return [];
    }
  });
}
