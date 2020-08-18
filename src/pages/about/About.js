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
                    image: require('./../../res/img/about-page/andy.jpg')
                },
                {
                    name: 'Iris Zhang',
                    description: "Iris is a full-stack software developer for UT Review and a software engineering student at UT. She's a true asian and is addicted to boba. In her free time, she enjoys spoiling her doggo, Momo, and getting carried (nope, not carrying) as her team's ADC in League of Legends.",
                    image: require('./../../res/img/about-page/iris.jpg')
                },
                {
                    name: 'Yangle Xue',
                    description: 'More widely known as Vina, Yangle is a software engineering student at the University of Texas at Austin. She enjoys drawing (follow her on Instagram @binabbyjy), dancing, and sleeping. She also loves boba and hotpot. \n League position: Top',
                    image: require('./../../res/img/about-page/vina.jpg')
                },
                {
                    name: 'Colin Wang',
                    description: "Colin is a Computer Science student at UWaterloo. He enjoys swimming to burn off the month supply of sweets he eats per day.\n Will be streaming League soon on Twitch.",
                    image: require('./../../res/img/about-page/colin.jpg')
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
