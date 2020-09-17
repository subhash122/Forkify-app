export default class Likes{
	constructor(){
		this.likesList=[];
	}
	addLike(recipe){
		const obj={
			id:recipe.id,	
			img :recipe.img,
			title:recipe.title,
			author:recipe.author
		};
		this.likesList.push(obj);
		this.persistData();
		return obj;
	}
	deleteLike(id){
		const index=this.likesList.findIndex(el =>el.id==id);
		this.likesList.splice(index,1);
		this.persistData();
	}
	isLiked(id){
		const value =this.likesList.findIndex(el =>el.id==id) != -1;
		return value;
	}
	persistData(){
		localStorage.setItem('likes',JSON.stringify(this.likesList));
	}
	readStorage(){
		const storage = JSON.parse(localStorage.getItem('likes'));
		if(storage)
			this.likesList=storage;
	}
};