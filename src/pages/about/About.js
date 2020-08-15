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
                    description: "Iris is a full-stack software developer for UT Review and a software engineering student at UT. She's a true asian and is addicted to boba. In her free time, she enjoys spoiling her doggo, Momo, and getting carried (nope, not carrying) as her team's ADC in League of Legends.",
                    image: require('./../../res/img/iris.JPG')
                },
                {
                    name: 'Yangle Xue',
                    description: 'More widely known as Vina, Yangle is a software engineering student at the University of Texas at Austin. She enjoys drawing (follow her on Instagram @binabbyjy), dancing, and sleeping. She also loves boba and hotpot. \n League position: Top',
                    image: require('./../../res/img/vina_pic.jpg')
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