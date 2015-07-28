import React from 'react';
import Styles from './Item.less';
import NoteStore from '../../stores/NoteStore.jsx';

let Item = React.createClass({
    getInitialState() {
        return {
            data: this.props.data,
            hide: false
        }
    },

    render() {
        return (
            <div className={"Item" + (this.state.hide ? ' hidden' : '')}>
                <div className="Item-left">
                <span className={"check-box" + (this.state.data.isComplete ? ' complete' : '')} onClick={this.handleCheckClick}>{this.state.data.isComplete ? <i className="fa fa-check"></i> : ''}</span>
                </div>
                <div className={"Item-right" + (this.state.data.isComplete ? ' complete' : '')}>
                    {this.state.data.note}
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

    handleCloseClick() {
        NoteStore.delete(this.state.data.id);
        this.props.onDelete();
        this.setState({hide: true});
    }
});

export default Item;