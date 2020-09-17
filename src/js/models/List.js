import uniqid from 'uniqid';

export default class List{
	constructor(){
		this.list =[];
	}
	
	addItem( count,unit, ingredient ){
		const item ={
			id : uniqid(),
			count,
			unit,
			ingredient
		};

		this.list.push(item);
	};

	deleteItem(id){
		const index= this.list.findIndex(el=> el.id === id);//..

		this.list.splice(index, 1);
	};
	updateItem(id , newCount){
		this.list.find(el =>el.id === id).count =newCount;
	};
};