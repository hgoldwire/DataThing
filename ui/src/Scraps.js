import React, {Component} from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'


export class Scraps extends Component {

    columns = [{
        Header: 'Source',
        accessor: 'source',
        maxWidth: 200
    }, {
        Header: 'dt',
        accessor: 'dt',
        width: 120
    }, {
        accessor: 'key', // Required because our accessor is not a string
        Header: 'key',
        width: 120
    }, {
        accessor: 'value', // Required because our accessor is not a string
        Header: 'value',
        // maxWidth: 900,
        style: {overflow: "visible"}
    }];

    render() {
        return (
            <div>
                <p style={{textAlign: "center"}}> Scraps</p>

                <ReactTable
                    className="-striped -highlight"
                    data={this.props.scraps}
                    columns={this.columns}
                    showPagination={false}
                    defaultPageSize={Math.min(this.props.scraps.length, 1000)}
                    defaultSorted={[
                        {
                            id: "dt",
                            desc: false
                        }
                    ]}
                    style={{
                        height: "400px",
                        width: "1200px",
                    }}
                />
            </div>
        );
    }
}

