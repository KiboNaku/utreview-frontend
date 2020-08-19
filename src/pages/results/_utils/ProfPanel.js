import React, { useState } from 'react'
import ProfLink from './../../_utils/ProfLink'
import TabPanel from './TabPanel'
import { Link } from 'react-router-dom'

function ProfPanel(props) {

    const { sortDir, sortBy } = props.sort
    const [hasMore, setHasMore] = useState(true)
    const [buttonDOM, setButtonDOM] = useState(null)

    function loadCourses() {
        if (buttonDOM != null) buttonDOM.blur();
        if (hasMore) {
            props.handlePageInc()
            if (props.calcTableEdge(props.page, props.data.length) >= props.data.length) setHasMore(false)
        }
    }

    function sort(a, b) {

        const sortBy = props.sort.sortBy
        const profs = props.data

        if (profs.length >= 0) {

            // TODO: update with approval & # ratings

            switch (sortBy) {
                case 'profName':
                    let profNameA = a.firstName + " " + a.lastName
                    let profNameB = b.firstName + " " + b.lastName
                    return profNameB.localeCompare(profNameA)
                case 'profECIS':
                    if (a.eCIS !== null && b.eCIS !== null) return a.eCIS - b.eCIS
                    else if (a.eCIS === null && b.eCIS !== null) {
                        if (props.sort.sortDir === 'up') return 1
                        else return -1
                    }
                    else if (a.eCIS !== null && b.eCIS === null) {
                        if (props.sort.sortDir === 'up') return -1
                        else return 1
                    }
                    else return 0
                case 'profApproval':
                    if (a.approval !== null && b.approval !== null) return a.approval - b.approval
                    else if (a.approval === null && b.approval !== null) {
                        if (props.sort.sortDir === 'up') return 1
                        else return -1
                    }
                    else if (a.approval !== null && b.approval === null) {
                        if (props.sort.sortDir === 'up') return -1
                        else return 1
                    }
                    else return 0
                case 'profRatings':
                    return a.numRatings - b.numRatings
                default:
                    return null;
            }
        }

        return null;
    }

    function setTableData(sortedProfs) {

        if (props.data != null) {

            if (sortedProfs.length > 0) {
                return sortedProfs.map(prof => {
                    const { firstName, lastName } = prof
                    return (
                        <tr key={prof.id}>
                            <td colSpan="3" className="class-name">{
                                <ProfLink 
                                    profId={prof.id}
                                    firstName={firstName}
                                    lastName={lastName}
                                />
                            }</td>
                            <td colSpan="1">
                                {prof.eCIS !== null ? prof.eCIS : "N/A"}
                            </td>
                            <td colSpan="1">
                                {prof.approval !== null ? prof.approval+'%' : "N/A"}
							</td>
                            <td colSpan="1">
                                {prof.numRatings}
                            </td>
                        </tr>
                    )
                })
            }
        }
    }

    const filter = props.filter

    const sortTypes = {
        up: {
            class: 'sortUp',
            fn: (a, b) => sort(a, b)
        },
        down: {
            class: 'sortDown',
            fn: (a, b) => sort(b, a)
        },
        default: {
            class: 'sort',
            fn: (a, b) => a
        }
    }

    let sortedProfs = props.filtered
    .sort(sortTypes[sortDir].fn)
    .slice(0, props.calcTableEdge(props.page, props.filtered.length))
        
    let moreResults = hasMore 
    if (props.calcTableEdge(props.page, props.filtered.length) >= props.filtered.length){
        moreResults = false
    }

    let profTable = (

        <div>
            <table id='profResults' className='table table-hover table-responsive result-table'>
                <thead className='thead-dark'>
                    <tr rowSpan="2">

                        <th scope="col" colSpan="3" className="sortable" onClick={() => props.handleSortChange('profName')}>
                            <span>Name</span>
                            <i className={'pl-3 fas fa-sort-' + sortDir + (sortBy === 'profName' ? '' : ' invisible')}></i>
                        </th>

                        {/* TODO: update with onclick functions */}
                        <th scope="col" colSpan="1" className="sortable" onClick={() => props.handleSortChange('profECIS')}>
                            <span>eCIS</span>
                            <i className={'pl-3 fas fa-sort-' + sortDir + (sortBy === 'profECIS' ? '' : ' invisible')}></i>
                        </th>

                        <th scope="col" colSpan="1" className="sortable" onClick={() => props.handleSortChange('profApproval')}>
                            <span>Approval</span>
                            <i className={'pl-3 fas fa-sort-' + sortDir + (sortBy === 'profApproval' ? '' : ' invisible')}></i>
                        </th>

                        <th scope="col" colSpan="1" className="sortable" onClick={() => props.handleSortChange('profRatings')}>
                            <span># Ratings</span>
                            <i className={'pl-3 fas fa-sort-' + sortDir + (sortBy === 'profRatings' ? '' : ' invisible')}></i>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {setTableData(sortedProfs)}
                </tbody>
            </table>
            {moreResults &&
                <div className="d-flex justify-content-center">
                    <button onClick={loadCourses} className="btn btn-block btn-more-results col-12 col-sm-9 col-md-8 col-lg-7" 
                        ref={(buttonDOM) => { setButtonDOM(buttonDOM) }}>
                        More results
                    </button>
                </div>
            }
        </div>
    )

    return (
        <TabPanel index={1} value={props.tabIndex}>
            {props.loaded ? (sortedProfs.length === 0 ? props.emptyTable : profTable) : props.loading}
        </TabPanel>
    )
}

export default ProfPanel