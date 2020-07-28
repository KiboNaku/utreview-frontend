import React, { Component } from 'react'
import Select from 'react-select'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import ModalHeader from '../../popups/_utils/ModalHeader'
import $ from 'jquery'
import UTEmail from '../../popups/_utils/UTEmail'
import PersonalInfo from './PersonalInfo'
import ChangePassword from './ChangePassword'

class EditProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tabValue: 0
        }

        console.log('constructor', this.state)
        console.log(props)
    }

    render() {

        console.log(this.props)

        return (
            <div className="modal fade" id={'edit-profile'} role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Profile</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <Tabs defaultActiveKey="edit-personal">
                                <Tab eventKey="edit-personal" title="Personal">
                                    <PersonalInfo {...this.props} onSubmit={this.props.editPersonalInfo}/>
                                </Tab>
                                <Tab eventKey="edit-password" title="Password">
                                    <ChangePassword {...this.props} onSubmit={this.props.changePassword} />
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