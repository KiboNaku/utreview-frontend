import React, { Component, useCallback, useRef, useState } from 'react'
import TabPanel from './TabPanel'
import { Link } from 'react-router-dom'

function ProfPanel(props) {

    const { sortDir, sortBy } = props.sort
    const [hasMore, setHasMore] = useState(true)
    const observer = useRef()
    const loadRef = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                props.handlePageInc()
                if (props.calcTableEdge(props.page, props.data.length) >= props.data.length) setHasMore(false)
            }
        })
        if (node) observer.current.observe(node)
    }, [props.loading, props.hasMore])

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

    function setTableData() {

        if (props.data != null) {

            const { sortDir } = props.sort
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
                .sort(sortTypes[sortDir].fn)
                .slice(0, props.calcTableEdge(props.page, props.data.length))

            return sortedProfs.map(prof => {
                const { firstName, lastName } = prof

                // TODO: temporary numbers to fill table: remove later
                const rating = Math.floor(Math.random() * 70 + 30)
                const numRating = Math.floor(Math.random() * 1500)

                return (
                    <tr key={prof.id} ref={loadRef}>
                        <td colSpan="3" className="class-name">{
                            <Link
                                className="utcolor"
                                to={{
                                    pathname: `prof-results/${firstName}_${lastName}`,
                                    state: {
                                        profId: prof.id
                                    }
                                }}
                            > {firstName} {lastName}
                            </Link>
                        }</td>
                        <td colSpan="1">
                            {prof.eCIS}
							</td>
                        <td colSpan="1">
                            {prof.approval}%
							</td>
                        <td colSpan="1">
                            {prof.numRatings}
                        </td>
                    </tr>
                )
            })
        }
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
                    {setTableData()}
                </tbody>
            </table>
            <div>{hasMore && props.loading}</div>
        </div>
    )

    return (
        <TabPanel index={1} value={props.tabIndex}>
            {props.loaded ? (props.data == null ? props.emptyTable : profTable) : props.loading}
        </TabPanel>
    )
}

export default ProfPanel