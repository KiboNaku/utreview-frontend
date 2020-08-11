import React, { Component } from 'react'
import AboutComponent from './_components/AboutComponent'
import './About.css'

class About extends Component {
    constructor() {
        super()

        this.state = {
            contributors: [
                {
                    name: 'Andy Ni',
                    description: 
                    'Andy is a Software Engineering student who develops for UT Review during his free time.\
                    When he is not working on the site, he enjoys playing Animal Crossing and being a jungler for his team in League of Legends.',
                    image: require('./../../res/img/andy_photo.jpg')
                },
                {
                    name: 'Iris Zhang',
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    image: 'https://images.unsplash.com/photo-1553776590-89774e24b34a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80'
                },
                {
                    name: 'Yangle Xue',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
                    image: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60'
                },
                {
                    name: 'Colin Wang',
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    image: 'https://images.unsplash.com/photo-1553776590-89774e24b34a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80'
                }
            ]
        }
    }

    render() {

        return (
            <AboutComponent
                data={this.state}
            />
        )
    }
}

export default About