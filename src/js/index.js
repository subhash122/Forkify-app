import  Search from './models/search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import {elements,renderLoader,clearLoader } from './views/base';

const state={ };   

// SEARCH CONTROLLER //
const controlSearch= async () => {
	//get query fOR view
	const query =searchView.getInput();
	
	if(query)
	{
		state.search=new Search(query);
		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchResults);
		await state.search.getResults();
		clearLoader();
		searchView.renderResults(state.search.result);
	}
};

elements.searchForm.addEventListener('submit',event=>{
	event.preventDefault();
	controlSearch();
});
elements.searchResPages.addEventListener('click',e=>{
	
	const btn=e.target.closest('.btn-inline');
	if(btn)
	{
		const goToPage= parseInt(btn.dataset.goto);
		searchView.clearResults();
		searchView.renderResults(state.search.result,goToPage);
	}
});

//RECIPE CONTROLLER //
const controlRecipe=async ()=>{
	
	const id= window.location.hash.replace('#','');

	if(id){
		state.recipe=new Recipe(id);
		if(state.search) {
			searchView.highlightSelected(id);
		}	
		recipeView.clearResults();
		renderLoader(elements.recipe);

		await state.recipe.getRecipe();
		state.recipe.calcTime();
		state.recipe.calcServings();
		state.recipe.paserIngredients();
		clearLoader();
		recipeView.renderRecipe(state.recipe,state.likes.isLiked(id));
	}
	
};
window.addEventListener('load',() => {
	state.likes = new Likes();
	state.likes.readStorage();
	state.likes.likesList.forEach(like => likesView.addLike(like));

});
['hashchange','load'].forEach(event=> window.addEventListener(event,controlRecipe));

// LIST COTROLLER

const controlList= ()=>{
	if(!state.list) state.list=new List();

	state.recipe.ingredients.forEach(el =>{
		state.list.addItem(el.count,el.unit,el.ingredient);
	});
	state.list.list.forEach(el =>{
		listView.renderItem(el);
	});
}

elements.shopping.addEventListener('click', e=>{
	const id = e.target.closest('.shopping__item').dataset.itemid;

	if(e.target.matches(`.shopping__delete, .shopping__delete *`)){
		state.list.deleteItem(id);
		listView.deleteItem(id);
	}else if(e.target.matches(`.shopping__count-value`)){
		const val= parseFloat(e.target.value);
		state.list.updateItem(id, val);
	}
});

elements.recipe.addEventListener('click',e=>{
	if(e.target.matches('.btn-decrease, .btn-decrease *')){
		if(document.querySelector('.recipe__info-data--people').textContent>1 ){
			state.recipe.updateServings('dec');
			recipeView.updateServingsIngredients(state.recipe);
		}
		
	}
	else if(e.target.matches('.btn-increase , .btn-increase *')){
		state.recipe.updateServings('inc');
		recipeView.updateServingsIngredients(state.recipe);
	}
	else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
		controlList();
	}

	else if(e.target.closest('.recipe__love')){
		likesController();
	}
});

///LIKES CONTROLLER
const likesController=()=>{
	if(!state.likes) state.likes=new Likes();

	if(!state.likes.isLiked(state.recipe.id))
	{
		const item=state.likes.addLike(state.recipe);
		likesView.toggleLikeBtn(true);
		likesView.addLike(item);
	}
	else
	{
		state.likes.deleteLike(state.recipe.id);
		likesView.toggleLikeBtn(false);
		likesView.deleteLike(state.recipe.id);
	}
	
};

