import React from 'react';
import Styles from './Todo.less';
import NoteStore from '../../stores/NoteStore.jsx';
import Item from '../Item/Item.jsx';

let Todo = React.createClass({
	getInitialState() {
		return {
			note:'',
			noteData: null,
			incompleteNum: NoteStore.getIncompleteNum()
		}
	},

	componentWillMount() {
		this.fetchNoteData(true);
	},

	render() {
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
					{this.state.noteData.map((value) => {
						return <Item data={value} onUpdate={this.handleItemUpdate} onDelete={this.handleItemDelete}/>
					})}
					{this.state.noteData.length < 1 ? '' : <div className="bottom">
						<span className="text">{this.state.incompleteNum} item left</span>
						<span className="text pull-right">Coding challenge for Zenefits <a href="http://liuhao.im">Hao Liu</a></span>
					</div>}
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
		        // clear input and memory
		        e.target.value = '';
		        this.setState({note:''});
		    }
	    }
	},

	addNewNote(note) {
		let index = NoteStore.create(note);
		let data = this.state.noteData;
		data.push(NoteStore.searchNote(index).value);
		this.setState({noteData: data});
		this.updateNumbers();
	},

	handleItemUpdate() {
		this.updateNumbers();
	},
	
	handleItemDelete() {
		this.updateNumbers();
	},

	updateNumbers() {
		this.setState({
			incompleteNum: NoteStore.getIncompleteNum()
		});
	},

	fetchNoteData(isFirstTime=false) {
		let data = NoteStore.getAll();
		// if first open then add some dummy data
		if (isFirstTime) {
			if (data.length < 1) {
				data = [{
					id: 1438058773285,
					note: 'Get a job',
					isComplete: false
				}, {
					id: 1438058816745,
					note: 'Prepare for the interview',
					isComplete: true
				}];
				NoteStore.setAll(data);
			}
		}
		this.setState({noteData: data});
	}
});

export default Todo;