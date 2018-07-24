import React, {Component} from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'

export class UserEvents extends Component {


    columns = [
        {
            Header: 'attributed_date',
            accessor: 'attributed_date' // String-based value accessors!
        }, {
            Header: 'billing_type',
            accessor: 'billing_type',
        }, {
            accessor: 'platform', // Required because our accessor is not a string
            Header: 'platform',
        }, {
            accessor: 'partner', // Required because our accessor is not a string
            Header: 'partner',
        }, {
            accessor: 'event', // Required because our accessor is not a string
            Header: 'event',
        }
        , {
            accessor: 'event_date', // Required because our accessor is not a string
            Header: 'event_date',
        }, {
            accessor: 'dt', // Required because our accessor is not a string
            Header: 'dt',
        }, {
            accessor: 'product_id', // Required because our accessor is not a string
            Header: 'product_id',
        }, {
            accessor: 'subscription_length', // Required because our accessor is not a string
            Header: 'subscription_length',
        }, {
            accessor: 'add_on_name', // Required because our accessor is not a string
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
                    minRows={0}
                    style={{
                         height: "400px" // This will force the table body to overflow and scroll, since there is not enough room
                     }}
                />
            </div>
        );
    }
}

