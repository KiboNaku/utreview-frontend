import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import Avatar from 'react-avatar'
import './Profile.css'


class Profile extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            major: '',
            profilePic: '',
            reviews: []
        }
    }

    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            first_name: decoded.identity.first_name,
            last_name: decoded.identity.last_name,
            email: decoded.identity.email,
            major: decoded.identity.major
        })
    }

    render() {

        return (
            <main>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-3 profile'>
                            <Avatar
                                className='profile-pic'
                                name={this.state.first_name + ' ' + this.state.last_name}
                                size="100"
                                src={this.state.profilePic}
                                round={true} />
                            <h1 className='profile-name'>{this.state.first_name + ' ' + this.state.last_name}</h1>
                            <p> Email: {this.state.email} </p>
                            <p> Major: {this.state.major} </p>
                        </div>
                        <div className='col-9 review-list'>
                            <h1>review list</h1>
                        </div>
                    </div>
                </div>
            </main>
            // <div className="container">
            //     <div className="jumbotron mt-5">
            //         <div className="col-sm-8 mx-auto">
            //             <h1 className="text-center">PROFILE</h1>
            //         </div>
            //         <table className="table col-md-6 mx-auto">
            //             <tbody>
            //                 <tr>
            //                     <td>First Name</td>
            //                     <td>{this.state.first_name}</td>
            //                 </tr>
            //                 <tr>
            //                     <td>Last Name</td>
            //                     <td>{this.state.last_name}</td>
            //                 </tr>
            //                 <tr>
            //                     <td>Email</td>
            //                     <td>{this.state.email}</td>
            //                 </tr>
            //                 <tr>
            //                     <td>Major</td>
            //                     <td>{this.state.major}</td>
            //                 </tr>
            //             </tbody>
            //         </table>
            //     </div>
            // </div>
        )
    }
}

export default Profile