import React, { Component } from 'react'
import PrivacyPolicyComponent from './_components/PrivacyPolicyComponent'
import './PrivacyPolicy.css'

class PrivacyPolicy extends Component {
    
    render() {

        return (
            <PrivacyPolicyComponent
                data={this.state}
            />
        )
    }
}

export default PrivacyPolicy