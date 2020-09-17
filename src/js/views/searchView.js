import { elements } from './base';

export const getInput=() => elements.searchInput.value;

export const clearInput=()=>{
	elements.searchInput.value='';
};

export const clearResults=()=>{
	elements.searchResList.innerHTML='';
	elements.searchResPages.innerHTML='';
};

export const highlightSelected=id=>{
	const resultsArr = Array.from(document.querySelectorAll('.results__link'));
	resultsArr.forEach(el=>{
		el.classList.remove('results__link--active');
	})
	document.querySelector(`a[href*="${id}"]`).classList.add('results__link--active');
}
const limitRecTitle=(title,limit=17)=>{
	const reducedTitle=[];
	if(title.length> limit){
		title.split(" ").reduce((acc,cur)=> {
			if(acc+cur.length<=limit){
				reducedTitle.push(cur);
			}
			return acc+cur.length;
		}, 0);
		return `${reducedTitle.join(" ")}...`;
	}
	return title;
};


const renderRecipe=(recipe)=>{
	const insertingHtml =`
	<li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
             <div class="results__data">
                <h4 class="results__name">${limitRecTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
	`
	elements.searchResList.insertAdjacentHTML('beforeend',insertingHtml);
};
const createButton=(page,type)=>{
	return `<button class="btn-inline results__btn--${type}"  data-goto=${type==='prev'? page-1 : page+1}>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-${type==='prev' ?`left` :`right`}"></use>
                </svg>
                <span>Page ${type==='prev' ? page-1 : page+1}</span>
            </button>
	`;
};
const renderButtons=(page,numResults,resPerPage)=>{
	const pages=Math.ceil(numResults/resPerPage);
	let button;
	if(page==1&& page<pages){
		button =createButton(page,'next');
	}else if(page<pages){
		button=` ${createButton(page,`prev`)}
			     ${createButton(page,`next`)}
			`;
	}else{
		button =createButton(page,`prev`);
	}
	elements.searchResPages.insertAdjacentHTML('afterbegin',button);
};
export const renderResults= (recipes,page=1,resPerPage=10)=>{
	const start=(page-1)*resPerPage;
	const end=page*resPerPage;
	recipes.slice(start,end).forEach( el=> renderRecipe(el));
	renderButtons(page,recipes.length,resPerPage);   
};