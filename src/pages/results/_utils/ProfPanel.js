import React, { Component } from 'react'
import Loading from '../../_utils/Loading.js'
import { Link } from 'react-router-dom'
import TabPanel from './TabPanel'

class ProfPanel extends Component {

    constructor() {

        super();
        this.setTableData = this.setTableData.bind(this)
        this.sort = this.sort.bind(this)
    }

    sort(a, b) {
        
        const sortBy = this.props.sort.sortBy
        const profs = this.props.data

        if (profs.length >= 0 && sortBy in a) {

            // TODO: update with approval & # ratings

            switch (sortBy) {
                case 'profName':
                    return b.profName.localeCompare(a.profName)
            }
        }

        return null;
    }

    setTableData() {

        if (this.props.data != null) {

            const { sortDir } = this.props.sort
            const filter = this.props.filter

            const sortTypes = {
                up: {
                    class: 'sortUp',
                    fn: (a, b) => this.sort(a, b)
                },
                down: {
                    class: 'sortDown',
                    fn: (a, b) => this.sort(b, a)
                },
                default: {
                    class: 'sort',
                    fn: (a) => a
                }
            }
            // TODO: update with prof info
            // TODO: update with filter

            let sortedProfs = this.props.data
                .sort(sortTypes[sortDir].fn)

            return sortedProfs.map(prof => {
                const { profName } = prof

                // TODO: temporary numbers to fill table: remove later
                const rating = Math.floor(Math.random() * 70 + 30)
                const numRating = Math.floor(Math.random() * 1500)

                return (
                    <tr key={profName}>
                        <td colSpan="3" className="class-name">{
                            <Link
                                to={{
                                    pathname: `${this.props.match.url}/${profName}`,
                                    state: {
                                        profName: profName
                                    }
                                }}
                            > {profName}
                            </Link>
                        }</td>
                        <td colSpan="1">
                            {rating}%
							</td>
                        <td colSpan="1">
                            {numRating}
                        </td>
                    </tr>
                )
            })
        }
    }

    render() {

        const { sortDir, sortBy } = this.props.sort

        let profTable = (

            <table id='profResults' className='table table-hover result-table'>
                <thead className='thead-dark'>
                    <tr rowSpan="2">

                        <th scope="col" colSpan="3" className="sortable" onClick={() => this.props.handleSortChange('profName')}>
                            <span>Name</span>
                            <i className={'pl-3 fas fa-sort-' + sortDir + (sortBy === 'profName' ? '' : ' invisible')}></i>
                        </th>

                        {/* TODO: update with onclick functions */}

                        <th scope="col" colSpan="1" className="sortable" onClick={() => console.log("No sort for approval")}>
                            <span>Approval</span>
                            <i className={'pl-3 fas fa-sort-' + sortDir + (sortBy === 'approval' ? '' : ' invisible')}></i>
                        </th>

                        <th scope="col" colSpan="1" className="sortable" onClick={() => console.log("No sort for num ratings")}>
                            <span># Ratings</span>
                            <i className={'pl-3 fas fa-sort-' + sortDir + (sortBy === 'ratings' ? '' : ' invisible')}></i>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.setTableData()}
                </tbody>
            </table>
        )
        
        return (
            <TabPanel index={1} value={this.props.tabIndex}>
                {this.props.loaded ? (this.props.data == null ? this.props.emptyTable : profTable) : this.props.loading}
            </TabPanel>
        )
    }
}

export default ProfPanel