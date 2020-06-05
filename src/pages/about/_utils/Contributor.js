import React, { Component } from 'react'

class Contributor extends Component {

    render() {

        return (

            <div>
                <img 
                    style={{
                        width: 150,
                        height: 150,
                        overflow: "hidden"
                    }} 
                    className="rounded-circle float-left mx-3 my-3" 
                    src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
                <div>
                    <h3>Maecenas vitae</h3>
                    <h5>Suspendisse potenti. Aliquam erat volutpat.</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In rhoncus leo ipsum, at congue dolor aliquam eu. Duis urna nulla, posuere vel nibh eu, faucibus mattis ex. Nullam ultricies ipsum at malesuada ullamcorper. Vestibulum ut hendrerit purus. Quisque laoreet, mauris nec efficitur placerat, elit arcu placerat nulla, sed fringilla leo urna id eros. Integer neque neque, viverra eu faucibus et, lacinia id mauris. Curabitur imperdiet mi in bibendum malesuada. Fusce in sapien aliquam, tincidunt tellus eget, venenatis arcu. Integer sodales urna sit amet facilisis tincidunt. Vivamus eget ultricies dui, sollicitudin volutpat eros. Nam imperdiet tortor diam.</p>
                </div>
            </div>
        )
    }
}

export default Contributor