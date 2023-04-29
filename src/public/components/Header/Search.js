import { $createElement } from '/js/utils.js';

function searchByTerm(event) {
  event.preventDefault();
  let inputValue;
  if (event.target.tagName === 'LI') {
    inputValue = event.target.firstChild.textContent;
    if (inputValue !== '') {
      window.location.href = `/products/?team=all&category=all&sort=recent&search=${inputValue}`;
    }
  } else {
    const input = document.querySelector('.search-content');
    inputValue = input.value;
    if (inputValue !== '') {
      window.location.href = `/products/?team=all&category=all&sort=recent&search=${inputValue}`;

      let recentSearches =
        JSON.parse(localStorage.getItem('recentSearches')) || [];
      recentSearches.unshift(inputValue);
      recentSearches = Array.from(new Set(recentSearches));
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    }
  }
}

function deleteSearchTerm(event) {
  event.stopPropagation();
  const li = event.target.closest('li');
  const termToDelete = li.firstChild.textContent;
  let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
  recentSearches = recentSearches.filter(term => term !== termToDelete);
  localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  renderRecentTerms(event);
}

function deleteAllTerms() {
  localStorage.setItem('recentSearches', JSON.stringify(''));
}

function removeRecentTermsContainer(event) {
  const target = event.target.className;
  if (
    target !== 'search-content input' &&
    target !== 'recent-searches-header' &&
    target !== 'search-term' &&
    target !== 'search-term-delete-button'
  ) {
    const recentSearchContainer = document.querySelector(
      '.recent-search-container'
    );
    if (recentSearchContainer) {
      recentSearchContainer.remove();
    }
  }
}

function renderRecentTerms(event) {
  if (event.target.tagName === 'SPAN') {
    document.querySelector('.recent-search-container').remove();
  }
  if (document.querySelector('.recent-search-container') !== null) {
    return null;
  }

  const searchForm = document.querySelector('header .search-box');

  const recentSearches =
    JSON.parse(localStorage.getItem('recentSearches')) || [];
  if (recentSearches.length > 0) {
    const recentSearchesList = document.createElement('ul');
    recentSearchesList.className = 'recent-search-container';

    const recentSearchesHeader = document.createElement('div');
    recentSearchesHeader.className = 'recent-searches-header';
    recentSearchesHeader.innerHTML = `
    <span>최근 검색어</span>
    `;

    const deleteAllTermsButton = document.createElement('span');
    deleteAllTermsButton.innerText = '모두 삭제';
    deleteAllTermsButton.addEventListener('click', deleteAllTerms);
    recentSearchesHeader.append(deleteAllTermsButton);

    recentSearches.forEach(searchTerm => {
      const li = document.createElement('li');
      li.className = 'search-term';
      li.textContent = searchTerm;
      const deleteButton = document.createElement('span');
      deleteButton.className = 'search-term-delete-button';
      deleteButton.innerText = 'X';
      li.append(deleteButton);
      recentSearchesList.appendChild(li);
      li.addEventListener('click', searchByTerm);
      deleteButton.addEventListener('click', deleteSearchTerm);
    });

    recentSearchesList.prepend(recentSearchesHeader);
    searchForm.appendChild(recentSearchesList);

    document.addEventListener('click', removeRecentTermsContainer);
  }
}

export function SearchBox(target) {
  const SearchForm = $createElement('div', 'search-box');
  SearchForm.innerHTML = `
        <form class="search-form">
          <input class="search-content input" type="text" placeholder="검색어를 입력해 주세요.">
          <button class="search-button button"><i class="fa fa-search" style="font-size:24px"></i></button>
        </form>
    `;

  SearchForm.addEventListener('submit', searchByTerm);
  SearchForm.addEventListener('click', renderRecentTerms);
  target.insertAdjacentElement('afterbegin', SearchForm);
}
