export const elements={
	searchForm : document.querySelector('.search'),
	searchInput: document.querySelector('.search__field'),
	searchResults:document.querySelector('.results'),
	searchResList : document.querySelector('.results__list'),
	searchResPages:document.querySelector('.results__pages'),
	recipe:document.querySelector('.recipe'),
	shopping :document.querySelector('.shopping__list'),
	likes:document.querySelector('.likes__list')
};
export const elementStrings={
	loader:'loader'
}; 
export const renderLoader=parent=>{
	const loaderIcon=`
		<div class="${elementStrings.loader}">
			<svg>
				<use href="img/icons.svg#icon-cw"></use>
			</svg>
		</div>
	`;
	parent.insertAdjacentHTML('afterbegin',loaderIcon);
};
export const clearLoader=()=>{
	const loaderIcon=document.querySelector(`.${elementStrings.loader}`);
	if(loaderIcon){
		loaderIcon.parentElement.removeChild(loaderIcon);
	};
};