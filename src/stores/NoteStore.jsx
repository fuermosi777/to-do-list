export default {
	getAll() {
		return JSON.parse(localStorage.getItem('noteData') || '[]');
	},
	setAll(data) {
		localStorage.setItem('noteData', JSON.stringify(data));
	},
	getNote(id) {

	},
	create(note) {
		let data = this.getAll();
		let id = Date.now();
		data.push({
			id: id,
			note: note,
			isComplete: false
		});
		this.setAll(data);
		return id;
	},
	searchNote(id) {
		let data = this.getAll();
		let result = data.filter((item) => {
			if (item.id === id) {
				return item;
			}
		})[0];
		return {index:data.indexOf(result), value:result};
	},
	edit(id, newNote) {
		let res = this.searchNote(id);
		res.value.note = newNote;
		let data = this.getAll();
		data[res.index] = res.value;
		this.setAll(data);
	},
	toggleComplete(id) {
		let res = this.searchNote(id);
		res.value.isComplete = !res.value.isComplete;
		let data = this.getAll();
		data[res.index] = res.value;
		this.setAll(data);
	},
	delete(id) {
		let res = this.searchNote(id);
		let data = this.getAll();
		data.splice(res.index, 1);
		this.setAll(data);
	},
	getCompleteNum() {
		let data = this.getAll();
		let result = data.filter((item) => {
			if (item.isComplete) {
				return item;
			}
		});
		return result.length;
	},
	getIncompleteNum() {
		let data = this.getAll();
		let result = data.filter((item) => {
			if (!item.isComplete) {
				return item;
			}
		});
		return result.length;
	},
	getTotalNum() {
		return this.getAll().length;
	}
};