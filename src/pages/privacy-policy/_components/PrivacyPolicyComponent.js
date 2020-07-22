import React from 'react'
import { Fade } from "react-awesome-reveal"

function PrivacyPolicyComponent (props) {
    return (
        <main>
            <div className='main-sub about container-fluid'>
                <h1 className='display-3 privacy'>Privacy Policy</h1>
                <div className='privacy-block'>
                    <div className="privacy-content">
                        <p >
                        At UT Review, accessible from utexasreview.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines information we collect and how we use it. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through email at info@utexasreview.com.
                        </p>
                    </div>
                </div>
                <div className='privacy-block'>
                    <h2 className='privacy-header'>Third Party Services</h2>
                    <div className="privacy-content">
                        <p >
                        At UT Review, we use a host of open source technologies and external libraries that process, but do not store your data. We also use third party authentication plugins and software from Google. UT Review's Privacy Policy does not apply other software. Thus, we are advising you to consult the respective Privacy Policies of these third parties for more detailed information. This may include their practices and instructions about how to opt-out of certain options. You may find a complete list of these Privacy Policies and their links here: policies.google.com/privacy. 
                        </p>
                    </div>
                </div>
                <div className='privacy-block'>
                    <h2 className='privacy-header'>Information Regarding Children</h2>
                    <div className="privacy-content">
                        <p >
                        UT Review does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records. 
                        </p>
                    </div>
                </div>
                <div className='privacy-block'>
                    <h2 className='privacy-header'>Online Privacy Policy Only</h2>
                    <div className="privacy-content">
                        <p >
                        This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in UT Review. This policy is not applicable to any information collected offline or via channels other than this website.
                        </p>
                    </div>
                </div>
                <div className='privacy-block'>
                    <h2 className='privacy-header'>Consent</h2>
                    <div className="privacy-content">
                        <p >
                        By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default PrivacyPolicyComponent