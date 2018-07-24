import React, {Component} from 'react';
import './App.css';
import {UserList} from './UserList';
import {UserView} from './UserView';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: {},
            activeUserId: null,
        };
    }

    componentDidMount() {
        fetch('/users')
            .then(r => r.json())
            .then(users => {
                this.setState({
                    activeUserId: Object.keys(users)[0],
                    users
                });
            })
    }

    setActiveUserId = uid => this.setState({activeUserId: uid});

    render() {
        return (
            <div className="App">
                <UserList uids={Object.keys(this.state.users)} setActiveUserId={this.setActiveUserId}/>
                <UserView user={this.state.users[this.state.activeUserId]}/>
            </div>
        );
    }
}

export default App;
