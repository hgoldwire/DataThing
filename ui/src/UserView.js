import React, {Component} from 'react';
import './App.css';
import {Scraps} from './Scraps';
import {UserActivities} from './UserActivities';
import {UserEvents} from './UserEvents';
// import 'react-grid-layout/css/styles.css';
// import 'react-resizable/css/styles.css';
// import GridLayout from 'react-grid-layout';


export class UserView extends Component {

    layout = [
        {i: 'Scraps', x: 0, y: 0, w: 4, h: 12},
        {i: 'UserActivities', x: 4, y: 0, w: 4, h: 12},
        {i: 'UserEvents', x: 8, y: 0, w: 4, h: 12}
    ];

    render() {
        if (this.props.user) {
            return (
                <div className="UserViewz">
                    {/*<GridLayout className="layout"*/}
                                {/*layout={this.layout}*/}
                                {/*autoSize={true}*/}
                                {/*cols={12}*/}
                                {/*rowHeight={30}*/}
                                {/*width={1200}*/}
                                {/*preventCollision={true}*/}

                    {/*>*/}
                        <div key="Scraps">
                            <Scraps className="Scraps" scraps={this.props.user.scraps}/>
                        </div>
                        <div key="UserActivities">
                            <UserActivities key="UserActivities" className="UserActivities"
                                            activities={this.props.user.activities}/>
                        </div>
                        <div key="UserEvents">
                            <UserEvents key="UserEvents" className="UserEvents" events={this.props.user.events}/>
                        </div>
                    {/*</GridLayout>*/}
                </div>
            );
        } else return null;

    }
}

