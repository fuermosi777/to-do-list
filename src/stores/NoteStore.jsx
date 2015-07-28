export default {
	getAll() {
		return localStorage.getItem('noteData');
	},
	getData(id) {
		return this.getAll()[id];
	},
	create(note) {
		let data = this.getAll();
		data[Date.now()] = {
			note: note,
			isComplete: false
		};
		localStorage.setItem('noteData', data);
	},
	edit(id, newNote) {
		let data = this.getAll();
		data[id]['note'] = newNote;
		localStorage.setItem('noteData', data);
	},
	complete(id) {
		let data = this.getAll();
		data[id]['isComplete'] = true;
		localStorage.setItem('noteData', data);
	},
	delete(id) {
		let data = this.getAll();
		delete data[id];
	}
};