import {elements } from './base'

export const addLike=(item)=>{
	const markup=`
	<li>
        <a class="likes__link" href="#${item.id}">
            <figure class="likes__fig">
                <img src="${item.img}" alt="Test">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${item.title}</h4>
                 <p class="likes__author">${item.author}</p>
            </div>
        </a>
    </li>
	`;
	elements.likes.insertAdjacentHTML('beforeend',markup);
};
export const deleteLike=(id)=> {
	const item= document.querySelector(`.likes__link[href="#${id}"]`).parentElement;
	item.parentElement.removeChild(item);
};

export const toggleLikeBtn= isLiked =>{
	const icon= isLiked==true ? `icon-heart`: `icon-heart-outlined`;
	document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#${icon}`);
};