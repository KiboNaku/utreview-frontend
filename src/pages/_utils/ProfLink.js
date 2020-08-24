import React from 'react'
import { Link, withRouter } from 'react-router-dom';

function ProfLink(props) {

    const profPath = props.firstName.toLowerCase().replaceAll(" ", "") + "_" + props.lastName.toLowerCase().replaceAll(" ", "")

    return (
        <Link
            className={ props.className === undefined ? "utcolor" : props.className}
            to={{
                pathname: `/prof-results/${profPath}`,
                state: {
                    profId: props.profId
                }
            }}
        > {props.firstName} {props.lastName}
        </Link>
    )
}
export default ProfLink