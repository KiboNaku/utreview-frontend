import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MetaTags from 'react-meta-tags';

class NotFound extends Component {

	render() {

		return (
			<div>
				<MetaTags>
					<title>{this.props.title} | {this.props.mainTitle}</title>
				</MetaTags>

				<main className="bg-grey">
					<div className="main-sub container py-5">
						<div className="container justify-content-center px-5 py-5 col-12 col-sm-11 col-md-9 col-lg-7 bg-light">
							<div className='py-5 text-center'>
								<h3 className='py-5 text-center'>
									<h3>The page you are looking for cannot be found.</h3> <br />
									<h3>Please <Link className="utcolor" to="/">click here</Link> to be taken to the homepage.</h3>
								</h3>
							</div>
						</div>
					</div>
				</main>
			</div>
		)
	}
}

export default NotFound