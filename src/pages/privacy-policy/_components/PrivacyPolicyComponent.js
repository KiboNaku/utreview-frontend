import React from 'react'

function PrivacyPolicyComponent (props) {
    let introduction = "At UT Review, accessible from utexasreview.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines information we collect and how we use it. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us through email at info@utexasreview.com."
    let informationCollected = "When you sign up for an account on UT Review, you provide us certain information voluntarily. This includes your personal information such as your name, utexas email address, password, major, and any other information you choose to provide us. When you make a search, we collect information about the search query, as well as any filters you decide to use. If you leave a review for a course or professor, we collect the information you provide in the review form."
    let informationUsed = "We use the information we collect to provide UT Review's services to you. We ask the user to provide an utexas email address so they may access certain services, such as leaving reviews and interacting with other user comments. We collect information related to the search queries in order to provide meaningful results and content. We collect review information to be able to display relevant data regarding courses and professors at UT Austin."
    let thirdPartyServices = "We use a host of open source technologies and external libraries that process, but do not store your data. We also use third party authentication plugins and software from Google. Our Privacy Policy does not apply other software. Thus, we are advising you to consult the respective Privacy Policies of these third parties for more detailed information. This may include their practices and instructions about how to opt-out of certain options."
    let informationSecurity = "We take steps to protect your sensitive, personal information from unauthorised access and against unlawful processing, accidental loss, destruction, and damage. All sensitive information is encrypted. When you have chosen a password which allows you to access certain services, you are responsible for keeping this password confidential. No method of transmission over the Internet, or method of electronic storage, is 100% secure. Therefore, we cannot guarantee the absolute security of your personal information."
    let consent = "By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions."
    return (
        <main>
            <div className='main-sub about container-fluid'>
                <h1 className='display-3 privacy'>Privacy Policy</h1>
                <div className='privacy-block'>
                    <div className="privacy-content">
                        <p >
                            {introduction}
                        </p>
                    </div>
                </div>
                <div className='privacy-block'>
                    <h2 className='privacy-header'>What Information We Collect</h2>
                    <div className="privacy-content">
                        <p >
                            {informationCollected}
                        </p>
                    </div>
                </div>
                <div className='privacy-block'>
                    <h2 className='privacy-header'>How the Information is Used</h2>
                    <div className="privacy-content">
                        <p >
                        {informationUsed}
                        </p>
                    </div>
                </div>
                <div className='privacy-block'>
                    <h2 className='privacy-header'>Third Party Services</h2>
                    <div className="privacy-content">
                        <p >
                        {thirdPartyServices}
                        </p>
                    </div>
                </div>
                <div className='privacy-block'>
                    <h2 className='privacy-header'>Information Security</h2>
                    <div className="privacy-content">
                        <p >
                        {informationSecurity}
                        </p>
                    </div>
                </div>
                <div className='privacy-block'>
                    <h2 className='privacy-header'>Consent</h2>
                    <div className="privacy-content">
                        <p >
                            {consent}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default PrivacyPolicyComponent