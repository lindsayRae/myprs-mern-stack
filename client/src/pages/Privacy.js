import React from 'react';

import Navbar from '../components/Navbar';
import { MdKeyboardBackspace } from 'react-icons/md';

const Privacy = ({ history }) => {
  const isAuthenticated = localStorage.getItem('userData');

  return (
    <div className='page-splash'>
      <header className='header header-fixed' onClick={() => history.goBack()}>
        <div className='header-inner'>
          <MdKeyboardBackspace style={{ fontSize: 25 }} />
        </div>
      </header>

      <div className='policy-container'>
        <div className=''>
          <h2 className='login-title'>Privacy Policy</h2>
          <p style={{ marginBottom: '10px' }}>Last updated Feb 14, 2021</p>
          <p className=''>
            MyPRs (“we” or “us” or “our”) respects the privacy of our users
            (“user” or “you”). This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you visit our mobile
            application (the “Application”). Please read this Privacy Policy
            carefully. IF YOU DO NOT AGREE WITH THE TERMS OF THIS PRIVACY
            POLICY, PLEASE DO NOT ACCESS THE APPLICATION. We reserve the right
            to make changes to this Privacy Policy at any time and for any
            reason. We will alert you about any changes by updating the “Last
            updated” date of this Privacy Policy. You are encouraged to
            periodically review this Privacy Policy to stay informed of updates.
            You will be deemed to have been made aware of, will be subject to,
            and will be deemed to have accepted the changes in any revised
            Privacy Policy by your continued use of the Application after the
            date such revised Privacy Policy is posted.
          </p>
          <h4 className='policy-headings'>COLLECTION OF YOUR INFORMATION</h4>
          <p>
            We may collect information about you in a variety of ways. The
            information we may collect via the Application depends on the
            content and materials you use, and includes: Personal Data
            Demographic and other personally identifiable information (such as
            your name and email address) that you voluntarily give to us when
            choosing to participate in various activities related to the
            Application, such as chat, posting messages in comment sections or
            in our forums, liking posts, sending feedback, and responding to
            surveys. If you choose to share data about yourself via your
            profile, online chat, or other interactive areas of the Application,
            please be advised that all data you disclose in these areas is
            public and your data will be accessible to anyone who accesses the
            Application. Financial Data Financial information, such as data
            related to your payment method (e.g. valid credit card number, card
            brand, expiration date) that we may collect when you purchase,
            order, return, exchange, or request information about our services
            from the Application. We store only very limited, if any, financial
            information that we collect. Otherwise, all financial information is
            stored by our payment processor, Stripe, and you are encouraged to
            review their privacy policy and contact them directly for responses
            to your questions.
          </p>
          <h4 className='policy-headings'>USE OF YOUR INFORMATION</h4>
          <p>
            Having accurate information about you permits us to provide you with
            a smooth, efficient, and customized experience. Specifically, we may
            use information collected about you via the Application to: Create
            and manage your account. Email you regarding your account or order.
            Fulfill and manage purchases, orders, payments, and other
            transactions related to the Application. Generate a personal profile
            about you to make future visits to the Application more
            personalized. Increase the efficiency and operation of the
            Application. Monitor and analyze usage and trends to improve your
            experience with the Application. Notify you of updates to the
            Application. Offer new products, services, mobile applications,
            and/or recommendations to you. Perform other business activities as
            needed. Prevent fraudulent transactions, monitor against theft, and
            protect against criminal activity. Process payments and refunds.
            Request feedback and contact you about your use of the Application.
            Resolve disputes and troubleshoot problems. Respond to product and
            customer service requests. Send you a newsletter. Solicit support
            for the Application.{' '}
          </p>
          <h4 className='policy-headings'>DISCLOSURE OF YOUR INFORMATION</h4>
          <p>
            We may share information we have collected about you in certain
            situations. Your information may be disclosed as follows: By Law or
            to Protect Rights If we believe the release of information about you
            is necessary to respond to legal process, to investigate or remedy
            potential violations of our policies, or to protect the rights,
            property, and safety of others, we may share your information as
            permitted or required by any applicable law, rule, or regulation.
            This includes exchanging information with other entities for fraud
            protection and credit risk reduction. Third-Party Service Providers
            We may share your information with third parties that perform
            services for us or on our behalf, including payment processing, data
            analysis, email delivery, hosting services, customer service, and
            marketing assistance.{' '}
          </p>
          <h4 className='policy-headings'>TRACKING TECHNOLOGIES</h4>
          <p>
            Cookies and Web Beacons We may use cookies, web beacons, tracking
            pixels, and other tracking technologies on the Application to help
            customize the Application and improve your experience. When you
            access the Application, your personal information is not collected
            through the use of tracking technology. Most browsers are set to
            accept cookies by default. You can remove or reject cookies, but be
            aware that such action could affect the availability and
            functionality of the Application. You may not decline web beacons.
            However, they can be rendered ineffective by declining all cookies
            or by modifying your web browser’s settings to notify you each time
            a cookie is tendered, permitting you to accept or decline cookies on
            an individual basis. Website Analytics We may also partner with
            selected third-party vendors, (eg. Google Analytics) to allow
            tracking technologies and remarketing services on the Application
            through the use of first party cookies and third-party cookies, to,
            among other things, analyze and track users’ use of the Application,
            determine the popularity of certain content, and better understand
            online activity. By accessing the Application, you consent to the
            collection and use of your information by these third-party vendors.
            You are encouraged to review their privacy policy and contact them
            directly for responses to your questions. We do not transfer
            personal information to these third-party vendors. You should be
            aware that getting a new computer, installing a new browser,
            upgrading an existing browser, or erasing or otherwise altering your
            browser’s cookies files may also clear certain opt-out cookies,
            plug-ins, or settings.{' '}
          </p>
          <h4 className='policy-headings'>THIRD-PARTY WEBSITES</h4>
          <p>
            The Application may contain links to third-party websites and
            applications of interest, including advertisements and external
            services, that are not affiliated with us. Once you have used these
            links to leave the Application, any information you provide to these
            third parties is not covered by this Privacy Policy, and we cannot
            guarantee the safety and privacy of your information. Before
            visiting and providing any information to any third-party websites,
            you should inform yourself of the privacy policies and practices (if
            any) of the third party responsible for that website, and should
            take those steps necessary to, in your discretion, protect the
            privacy of your information. We are not responsible for the content
            or privacy and security practices and policies of any third parties,
            including other sites, services or applications that may be linked
            to or from the Application.{' '}
          </p>
          <h4 className='policy-headings'>SECURITY OF YOUR INFORMATION</h4>
          <p>
            We use administrative, technical, and physical security measures to
            help protect your personal information. While we have taken
            reasonable steps to secure the personal information you provide to
            us, please be aware that despite our efforts, no security measures
            are perfect or impenetrable, and no method of data transmission can
            be guaranteed against any interception or other type of misuse. Any
            information disclosed online is vulnerable to interception and
            misuse by unauthorized parties. Therefore, we cannot guarantee
            complete security if you provide personal information. POLICY FOR
            CHILDREN We do not knowingly solicit information from or market to
            children under the age of 13. If you become aware of any data we
            have collected from children under age 13, please contact us using
            the contact information provided below.
          </p>
          <h4 className='policy-headings'>
            CONTROLS FOR DO-NOT-TRACK FEATURES
          </h4>
          <p>
            Most web browsers and some mobile operating systems [and our mobile
            applications] include a Do-Not-Track (“DNT”) feature or setting you
            can activate to signal your privacy preference not to have data
            about your online browsing activities monitored and collected. No
            uniform technology standard for recognizing and implementing DNT
            signals has been finalized. As such, we do not currently respond to
            DNT browser signals or any other mechanism that automatically
            communicates your choice not to be tracked online. If a standard for
            online tracking is adopted that we must follow in the future, we
            will inform you about that practice in a revised version of this
            Privacy Policy.{' '}
          </p>
          <h4 className='policy-headings'>
            OPTIONS REGARDING YOUR INFORMATION
          </h4>
          <p>
            Account Information You may at any time review or change the
            information in your account or terminate your account by: Logging
            into your account settings and updating your account Contacting us
            using the contact information provided below:
            lindsay.aiellodev@gmail.com Upon your request to terminate your
            account, we will deactivate or delete your account and information
            from our active databases. However, some information may be retained
            in our files to prevent fraud, troubleshoot problems, assist with
            any investigations, enforce our Terms of Use and/or comply with
            legal requirements.{' '}
          </p>

          <h4 className='policy-headings'>CALIFORNIA PRIVACY RIGHTS</h4>
          <p>
            California Civil Code Section 1798.83, also known as the “Shine The
            Light” law, permits our users who are California residents to
            request and obtain from us, once a year and free of charge,
            information about categories of personal information (if any) we
            disclosed to third parties for direct marketing purposes and the
            names and addresses of all third parties with which we shared
            personal information in the immediately preceding calendar year. If
            you are a California resident and would like to make such a request,
            please submit your request in writing to us using the contact
            information provided below. If you are under 18 years of age, reside
            in California, and have a registered account with the Application,
            you have the right to request removal of unwanted data that you
            publicly post on the Application. To request removal of such data,
            please contact us using the contact information provided below, and
            include the email address associated with your account and a
            statement that you reside in California. We will make sure the data
            is not publicly displayed on the Application, but please be aware
            that the data may not be completely or comprehensively removed from
            our systems.{' '}
          </p>
          <h4 className='policy-headings'>CONTACT US</h4>
          <p>
            If you have questions or comments about this Privacy Policy, please
            contact us at: lindsay.aiellodev@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
