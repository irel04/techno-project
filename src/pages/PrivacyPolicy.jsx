import React from "react";
import HomeTitle from "../components/HomeTitle";

function PrivacyPolicy() {
  return (
    <main className="flex flex-col items-center justify-center">
      <section className="w-full md:w-3/4 lg:w-1/2 px-4">
        <HomeTitle title="Privacy Policy" />
        
        <div className="my-4 text-justify">
          <p>This Privacy Policy describes how [Your Company Name] collects, uses, and discloses personal information when you use our website [Your Website URL] (the "Site").</p>
        </div>
  
        <div className="my-4 text-justify">
          <p className="font-bold text-xl">Personal Information We Collect</p>
          <ul className="list-disc list-inside">
            <li>Name</li>
            <li>Contact Information including email address and phone number</li>
            <li>Demographic Information such as postcode, preferences, and interests</li>
            <li>Other information relevant to customer surveys and/or offers</li>
          </ul>
        </div>
  
        <div className="my-4 text-justify">
          <p className="font-bold text-xl">Security</p>
          <p>We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect online.</p>
        </div>
  
        <div className="my-4 text-justify">
          <p className="font-bold text-xl">Controlling Your Personal Information</p>
          <ul className="list-disc list-inside">
            <p>Whenever you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used by anybody for direct marketing purposes.</p>
            <p>If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us at [Your Contact Email Address].</p>
          </ul>
        </div>
  
        <div className="my-4 text-justify">
          <p className="font-bold text-xl">Data Retention</p>
          <p>We will retain your personal information for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>
        </div>
  
        <div className="my-4 text-justify">
          <p className="font-bold text-xl">Links to Other Websites</p>
          <p>Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites and such sites are not governed by this privacy statement. You should exercise caution and look at the privacy statement applicable to the website in question.</p>
        </div>
  
        <div className="my-4 text-justify">
          <p className="font-bold text-xl">Sharing of Personal Information</p>
          <p>We may share your personal information with third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>
        </div>
  
        <div className="my-4 text-justify">
          <p className="font-bold text-xl">Children's Privacy</p>
          <p>Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will delete that information as quickly as possible. If you believe that we might have any information from or about a child under 13, please contact us at [Your Contact Email Address].</p>
        </div>
  
        <div className="my-4 text-justify">
          <p className="font-bold text-xl">Changes to This Privacy Policy</p>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
        </div>
  
        <div className="my-4 text-justify">
          <p className="font-bold text-xl">Contact Us</p>
          <p>If you have any questions about this Privacy Policy, please contact us by email at [Your Contact Email Address].</p>
        </div>
      </section>
    </main>
  );
}

export default PrivacyPolicy;
