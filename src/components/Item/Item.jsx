import React from 'react';
import Styles from './Item.less';
import NoteStore from '../../stores/NoteStore.jsx';

let Item = React.createClass({
    getInitialState() {
        return {
            data: this.props.data,
            hide: false,
            isEditable: false
        }
    },

    render() {
        return (
            <div className={"Item" + (this.state.hide ? ' hidden' : '')}>
                <div className="Item-left">
                <span className={"check-box" + (this.state.data.isComplete ? ' complete' : '')} onClick={this.handleCheckClick}>{this.state.data.isComplete ? <i className="fa fa-check"></i> : ''}</span>
                </div>
                <div className={"Item-right" + (this.state.data.isComplete ? ' complete' : '')}>
                    {this.state.isEditable ? '' : <span className="note-content" onClick={this.handleContentClick}>{this.state.data.note}</span>}
                    <input type="text" ref="input" className={"edit-input" + (this.state.isEditable ? '' : ' hidden')} onChange={this.handleInputChange} onBlur={this.handleInputBlur}/> : ''}
                    <span className="fa fa-close" onClick={this.handleCloseClick}></span>
                </div>
            </div>
        );
    },

    handleCheckClick() {
        let data = this.state.data;
        data.isComplete = !data.isComplete;
        this.setState({data: data});
        // update store
        NoteStore.toggleComplete(data.id);
        // send update signal to parent
        this.props.onUpdate();
    },

    handleContentClick() {
        this.setState({isEditable: true}, () => {
            React.findDOMNode(this.refs.input).focus();
        });
        React.findDOMNode(this.refs.input).value = this.state.data.note;
    },

    handleInputChange(e) {
        let data = this.state.data;
        data.note = e.target.value;
        this.setState({data: data});
        NoteStore.edit(data.id, data.note);
    },

    handleInputBlur() {
        this.setState({isEditable: false});
    },

    handleCloseClick() {
        NoteStore.delete(this.state.data.id);
        this.props.onDelete();
        this.setState({hide: true});
    }
});

export default Item;