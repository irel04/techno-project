import React from "react";
import HomeTitle from "../components/HomeTitle";

function TermsofService() {
  return (
    <main className="flex flex-col items-center justify-center">
      <section className="w-full md:w-3/4 lg:w-1/2 px-4">
        <HomeTitle title="Terms of Service" />

        <div className="my-4 text-justify">
          <p>
            These Terms of Service ("Terms") govern your access to and use of [Your Company Name] ("Company") website and services (the "Services"). By accessing or using the Services, you agree to be bound by these Terms.
          </p>
        </div>

        <div className="my-4 text-justify">
          <p className="font-bold text-xl">1. Acceptance of Terms</p>
          <p>
            By accessing or using the Services, you agree to these Terms and to comply with all applicable laws and regulations. If you do not agree with these Terms, you may not access or use the Services.
          </p>
        </div>

        <div className="my-4 text-justify">
          <p className="font-bold text-xl">2. Use of Services</p>
          <p>
            a. <span className="font-bold">Eligibility:</span> You must be at least 18 years old or have the legal capacity to enter into a contract to use the Services. By using the Services, you represent and warrant that you meet these eligibility requirements.
          </p>
          <p>
            b. <span className="font-bold">Registration:</span> To access certain features of the Services, you may be required to register for an account. You agree to provide accurate and complete information during the registration process and to keep your account information updated.
          </p>
          <p>
            c. <span className="font-bold">User Conduct:</span> You agree not to use the Services for any unlawful or prohibited purpose, or in any manner that could damage, disable, overburden, or impair the Services. You also agree not to interfere with the security or integrity of the Services or any related systems.
          </p>
        </div>

        <div className="my-4 text-justify">
          <p className="font-bold text-xl">3. User Roles and Responsibilities</p>

          <div className="ml-4">
            <p className="font-bold">a. Dorm Owners:</p>
            <p>
              i. By listing a dorm on the website, you agree to provide accurate and up-to-date information about the dorm, including but not limited to location, amenities, availability, and pricing.
            </p>
            <p>
              ii. You are responsible for ensuring that the dorm complies with all applicable laws and regulations, including building codes and safety standards.
            </p>
            <p>
              iii. You agree to promptly respond to inquiries and requests from potential renters and to facilitate the rental process in good faith.
            </p>
          </div>

          <div className="ml-4">
            <p className="font-bold">b. Renters:</p>
            <p>
              i. By using the Services to search for and rent a dorm, you agree to provide accurate information about your housing needs and preferences.
            </p>
            <p>
              ii. You are responsible for reviewing and agreeing to any terms and conditions set forth by the dorm owner, including rental agreements and house rules.
            </p>
            <p>
              iii. You agree to treat the dorm and its occupants with respect and to abide by all applicable rules and regulations.
            </p>
          </div>

          <div className="ml-4">
            <p className="font-bold">c. Other Users:</p>
            <p>
              i. Users who provide reviews, comments, or other feedback about dorms agree to provide honest and constructive feedback based on their own experiences.
            </p>
            <p>
              ii. Users who engage in transactions or interactions with other users agree to do so in good faith and to comply with any applicable terms and conditions.
            </p>
          </div>
        </div>

        <div className="my-4 text-justify">
          <p className="font-bold text-xl">4. User Content</p>
          <p>
            a. <span className="font-bold">Submission:</span> You may be able to submit content, including but not limited to dorm listings, reviews, comments, and messages ("User Content"), through the Services. By submitting User Content, you grant the Company a worldwide, non-exclusive, royalty-free, transferable license to use, reproduce, modify, adapt, publish, translate, distribute, and display such User Content.
          </p>
          <p>
            b. <span className="font-bold">Responsibility:</span> You are solely responsible for the User Content you submit, and you represent and warrant that you have all necessary rights and permissions to submit such User Content. The Company does not endorse or control User Content and disclaims any liability for such content.
          </p>
        </div>

        <div className="my-4 text-justify">
          <p className="font-bold text-xl">5. Intellectual Property</p>
          <p>
            a. <span className="font-bold">Ownership:</span> The Company owns all rights, title, and interest in and to the Services and its content, including but not limited to text, graphics, logos, images, and software. You may not use, copy, modify, distribute, or reproduce any part of the Services without the Company's prior written consent.
          </p>
          <p>
            b. <span className="font-bold">Trademarks:</span> All trademarks, service marks, and logos used in connection with the Services are the property of their respective owners and may not be used without permission.
          </p>
        </div>

        <div className="my-4 text-justify">
          <p className="font-bold text-xl">6. Privacy</p>
          <p>
            a. <span className="font-bold">Collection of Information:</span> By using the Services, you consent to the collection, use, and disclosure of your information as described in the Company's Privacy Policy.
          </p>
        </div>

        <div className="my-4 text-justify">
          <p className="font-bold text-xl">7. Disclaimer of Warranties</p>
          <p>
            THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. THE COMPANY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
          </p>
        </div>

        <div className="my-4 text-justify">
          <p className="font-bold text-xl">8. Limitation of Liability</p>
          <p>
            THE COMPANY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES ARISING OUT OF OR IN CONNECTION WITH THE SERVICES, WHETHER OR NOT THE COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>
        </div>

        <div className="my-4 text-justify">
          <p className="font-bold text-xl">9. Governing Law</p>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the Philippines. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of the Philippines.
          </p>
        </div>

        <div className="my-4 text-justify">
          <p className="font-bold text-xl">10. Changes to Terms</p>
          <p>
            The Company reserves the right to modify or revise these Terms at any time, and such changes will be effective immediately upon posting on the Company's website. Your continued use of the Services after any such changes constitutes your acceptance of the revised Terms.
          </p>
        </div>

        <div className="my-4 text-justify">
          <p className="font-bold text-xl">11. Contact Us</p>
          <p>
            If you have any questions about these Terms, please contact us at <span className="underline">[Your Contact Email Address]</span>.
          </p>
        </div>
      </section>
    </main>
  );
}

export default TermsofService;