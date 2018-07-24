import React, {Component} from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'

export class UserEvents extends Component {


    columns = [
        {
            Header: 'attributed_date',
            accessor: 'attributed_date',
            width: 185
        }, {
            Header: 'billing_type',
            accessor: 'billing_type',
        }, {
            accessor: 'platform',
            Header: 'platform',
        }, {
            accessor: 'partner',
            Header: 'partner',
            width: 60
        }, {
            accessor: 'event',
            Header: 'event',
            width: 160
        }
        , {
            accessor: 'event_date',
            Header: 'event_date',
            width: 180
        }, {
            accessor: 'dt',
            Header: 'dt',
        }, {
            accessor: 'product_id',
            Header: 'product_id',
            width: 50
        }, {
            accessor: 'subscription_length',
            Header: 'subscription_length',
        }, {
            accessor: 'add_on_name',
            Header: 'add_on_name',
        }
    ];

    render() {
        return (
            <div className="UserEvents">
                <p style={{textAlign: "center"}}>User Events</p>
                <ReactTable
                    className="-striped -highlight"
                    data={this.props.events}
                    columns={this.columns}
                    showPagination={false}
                    defaultPageSize={Math.min(this.props.events.length, 1000)}
                    defaultSorted={[
                        {
                            id: "event_date",
                            desc: false
                        }
                    ]}
                    minRows={0}
                    style={{
                         height: "400px" // This will force the table body to overflow and scroll, since there is not enough room
                     }}
                />
            </div>
        );
    }
}

