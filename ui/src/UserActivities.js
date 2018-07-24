import React, {Component} from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'

export class UserActivities extends Component {

    columns = [
        {
            Header: 'dtTs',
            accessor: 'dtTs',
            width: 200
        }, {
            Header: 'activityType',
            accessor: 'activityType',
            width: 150
        }, {
            accessor: 'billingType', // Required because our accessor is not a string
            Header: 'billingType',
            width: 100
        }, {
            accessor: 'platform', // Required because our accessor is not a string
            Header: 'platform',
            width: 100
        },
        {
            accessor: 'payload', // Required because our accessor is not a string
            Header: 'payload',
            style: {overflow: "visible"}
        }
    ];

    render() {
        return (
            <div className="UserActivities">
                <p style={{textAlign: "center"}}>User Activities</p>
                <ReactTable
                    className="-striped -highlight"
                    data={this.props.activities}
                    columns={this.columns}
                    showPagination={false}
                    defaultPageSize={Math.min(this.props.activities.length, 1000)}
                    defaultSorted={[
                        {
                            id: "dtTs",
                            desc: false
                        }
                    ]}
                    style={{
                        height: "400px" // This will force the table body to overflow and scroll, since there is not enough room
                    }}
                />
            </div>
        );
    }
}

