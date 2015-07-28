import React from 'react';
import Styles from './Todo.less';
import NoteStore from '../../stores/NoteStore.jsx';

let Todo = React.createClass({
	getInitialState() {
		return {
			note:''
		}
	},

	componentWillMount() {
		let data = NoteStore.getAll();
		// put some dummy notes
		if (!data) {
			data = {
				1438058773285: {
					note: 'Buy a new phone',
					complete: false
				},
				1438058816745: {
					note: 'Change the lock',
					complete: true
				}
			};
		}
		this.setState({noteData: data});
	},

	render() {
		let noteList = [];
		for (let item in this.state.noteData) {
			noteList.push(
				<span>{item}</span>
			);
		}
		return (
			<div className="Todo">
				<div className="Todo-container">
					<div className="head">
						<div className="left"></div>
						<div className="right">
							<input type="text" className="note-input" onChange={this.handleNoteInputChange} onKeyDown={this.handleNoteInputKeyDown}/>
							{this.state.note ? '' : <label className="note-label">Click to add new note</label>}
						</div>
					</div>
					{noteList}
					<div className="bottom"></div>
				</div>
			</div>
		);
	},

	handleNoteInputChange(e) {
		this.setState({note: e.target.value});
	},

	handleNoteInputKeyDown(e) {
		if (e.keyCode === 13) {
			if (!this.state.note) {
				return;
			} else {
		        this.addNewNote(this.state.note);
		    }
	    }
	},

	addNewNote(note) {
		NoteStore.create(note);
	}
});

export default Todo;