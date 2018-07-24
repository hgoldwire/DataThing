import React, {Component} from 'react';
import './App.css';

export class UserIdLink extends Component {
    render() {
        let href = "#/"+this.props.uid
        return (
            <p>
                <a href={href} role="button" onClick={this.props.onClick}>{this.props.uid}</a>
            </p>
        )
    }
}

export class UserList extends Component {

    render() {
        return (
            <div className="UserList">
                <p> search box</p>
                <div className="UserIdList">
                    {this.props.uids.map(uid => <UserIdLink key={uid} uid={uid} onClick={() => this.props.setActiveUserId(uid)}/>)}
                </div>
            </div>
        );
    }
}

