import React, { Component } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import PersonalInfo from './PersonalInfo'
import ChangePassword from './ChangePassword'

class EditProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tabValue: 0,
            submitted: false,
            passwordSubmitted: false
        }

        this.handleSubmitChange = this.handleSubmitChange.bind(this)
        this.handlePasswordSubmitChange = this.handlePasswordSubmitChange.bind(this)
    }

    handleSubmitChange(value) {
        this.setState({ submitted: value })
    }

    handlePasswordSubmitChange(value) {
        this.setState({ passwordSubmitted: value })
    }

    render() {

        return (
            <div className="modal fade" id={'edit-profile'} role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Profile</h5>
                            <button type="button" onClick={() => { this.setState({ submitted: false, passwordSubmitted: false }) }} className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <Tabs defaultActiveKey="edit-personal" className="utcolor">
                                <Tab eventKey="edit-personal" title="Personal">
                                    <PersonalInfo
                                        {...this.props}
                                        handleSubmitChange={this.handleSubmitChange}
                                        submitted={this.state.submitted}
                                        onSubmit={this.props.editPersonalInfo} />
                                </Tab>
                                <Tab eventKey="edit-password" title="Password">
                                    <ChangePassword
                                        {...this.props}
                                        handleSubmitChange={this.handlePasswordSubmitChange}
                                        submitted={this.state.passwordSubmitted}
                                        onSubmit={this.props.changePassword} />
                                </Tab>
                            </Tabs>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditProfile