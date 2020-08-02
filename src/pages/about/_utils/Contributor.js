import React, { Component } from 'react'

class Contributor extends Component {
    render() {
        return (
            <div className="card contributor">
                <img className="card-img-top contributor-image"
                    src={this.props.image}
                    alt={this.props.name} />
                <div className="card-block contributor-info">
                    <p className='lead contributor-name'>{this.props.name}</p>
                    <div className='contributor-description'>
                        <p>{this.props.description}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Contributor