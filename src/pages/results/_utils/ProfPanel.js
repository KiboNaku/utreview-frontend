import React, { useState } from 'react'
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

        if (profs.length >= 0 && sortBy in a) {

            // TODO: update with approval & # ratings

            switch (sortBy) {
                case 'profName':
                    let profNameA = a.firstName + " " + a.lastName
                    let profNameB = b.firstName + " " + b.lastName
                    return profNameB.localeCompare(profNameA)
            }
        }

        return null;
    }

    function setTableData(sortedProfs) {

        if (props.data != null) {

            if (sortedProfs.length > 0) {
                return sortedProfs.map(prof => {
                    const { firstName, lastName } = prof

                    const profPath = firstName.toLowerCase().replace(" ", "") + "_" + lastName.toLowerCase().replace(" ", "")
                    return (
                        <tr key={prof.id}>
                            <td colSpan="3" className="class-name">{
                                <Link
                                    className="utcolor"
                                    to={{
                                        pathname: `/prof-results/${profPath}`,
                                        state: {
                                            profId: prof.id
                                        }
                                    }}
                                > {firstName} {lastName}
                                </Link>
                            }</td>
                            <td colSpan="1">
                                {prof.eCIS !== null ? prof.eCIS : "N/A"}
                            </td>
                            <td colSpan="1">
                                {prof.approval !== null ? prof.approval : "N/A"}%
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
            fn: (a) => a
        }
    }
    // TODO: update with prof info
    // TODO: update with filter

    let sortedProfs = props.data
        .filter(prof =>
            (filter.mNum <= prof.numRatings) &&
            (props.isSemester(filter.sem, prof)))
        .sort(sortTypes[sortDir].fn)
        .slice(0, props.calcTableEdge(props.page, props.data.length))
        
    let moreResults = hasMore 
    if (props.calcTableEdge(props.page, props.data.length) >= props.data.length){
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
                        <th scope="col" colSpan="1" className="sortable" onClick={() => console.log("No sort for eCIS")}>
                            <span>eCIS</span>
                            <i className={'pl-3 fas fa-sort-' + sortDir + (sortBy === 'eCIS' ? '' : ' invisible')}></i>
                        </th>

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
            {props.loaded ? (sortedProfs.length == 0 ? props.emptyTable : profTable) : props.loading}
        </TabPanel>
    )
}

export default ProfPanel