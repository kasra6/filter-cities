const citiesResource = '../assets/iran.json';

let cities = [];


fetch(citiesResource)
  .then(blob => blob.json())
  .then(data => cities.push(...data));


function findMatches(wordToMatch, cities){

  return cities.filter(place => {
    const regEx = new RegExp(wordToMatch, 'gi');
    return place.city_name.match(regEx) || place.province_name.match(regEx);
  })
}

function displayMatches(){
  if(!this.value) return;
  const regEx = new RegExp(this.value, 'gi');
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    const cityName = place.city_name.replace(regEx, `<span class="hl">
    ${place.city_name}</span>`);
    return `<li>${cityName} - ${place.province_name}</li>`;
  }).join();
  results.innerHTML = html;
}


const search = document.querySelector("input");
const results = document.querySelector("ul");

search.addEventListener('change', displayMatches);
search.addEventListener('keyup', displayMatches);
