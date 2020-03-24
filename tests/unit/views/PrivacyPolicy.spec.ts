import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueCompositionApi from "@vue/composition-api";
import VueI18n from "vue-i18n";

import PrivacyPolicy from "../../../src/ui/views/PrivacyPolicy.vue";
import i18n from "../../../src/service/i18n";

describe("PrivacyPolicy.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    localVue.use(VueI18n);

    it("renders", (): void => {
        expect.assertions(1);

        const wrapper = shallowMount(PrivacyPolicy, {
            localVue,
            i18n
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <circlepage-stub>
              <div class="wrap">
                <pagetitle-stub title="Privacy Policy">
                  Last Updated: September 12, 2019
                </pagetitle-stub>
                <div class="heading">
                  INTRODUCTION
                </div>
                <div class="paragraph">
                  Welcome to MyHbarWallet.com, the first hosted implementation of MyHbarWallet, a free, open-source, client-side tool for interacting with the Hedera™ Hashgraph distributed ledger. We value privacy and we make a concerted effort to minimize and, to the extent possible, eliminate the exposure of personal data during the use of our interface. MyHbarWallet.com does not collect, hold, or store keys, account information, or passwords. We do not collect data passively, do not monetize the collection of data, and do not use your data for marketing or advertising.
                </div>
                <div class="paragraph">
                  To the extent we collect any personal information, this privacy policy ("Policy") describes how MyHbarWallet.com collects, uses, and shares personal information of people who visit our website (the "Site"), or otherwise use our services (collectively, the "Services").
                </div>
                <div class="paragraph">
                  This Policy applies to anyone who accesses the Services. Please read the Policy carefully to understand our practices regarding your information and how we will treat it. By visiting the Site and/or using the Services, you acknowledge that the collection, use, and sharing of your information will take place as described in this Policy.
                </div>
                <div class="paragraph">
                  So that we are clear about the terminology we are using, when we use the phrase "Personal Information" in this Privacy Policy, we mean information about an individual that (either by itself or when combined with information from other available sources) allows that individual to be identified, including, the individual's name, telephone number, or e-mail address.
                </div>
                <div class="heading">
                  HEDERA™ HASHGRAPH
                </div>
                <div class="paragraph">
                  Due to the inherent transparency of Hedera™ Hashgraph transactions that individuals broadcast via MyHbarWallet/MyHbarWallet.com may be publicly accessible. This includes, but is not limited to, your public sending address, the public address of the receiver, the amount sent or received, and any other data a user has chosen to include in a given transaction. Information stored on Hedera™ Hashgraph may be public, immutable, and difficult or even impossible to remove or delete. Transactions and addresses may reveal information about the user’s identity and information can potentially be correlated now or in the future by any party who chooses to do so, including law enforcement. Users are encouraged to review how privacy and transparency on Hedera™ Hashgraph works.
                </div>
                <div class="heading">
                  WHAT WE COLLECT
                </div>
                <div class="paragraph">
                  We collect information about you as described below. We use this information to enhance your experience with our Services.
                </div>
                <div class="sub-heading">
                  WHAT WE COLLECT
                </div>
                <div class="paragraph">
                  We may collect Personal Information you choose to provide to us. For example, when you contact us for support through the Services, you give us with your e-mail address and any other information that you choose to provide. Also, if you participate in a MyHbarWallet.com offer, give-away, or promotion (“Promotion”), you provide your name, e-mail address, and mailing address.
                </div>
                <h4>California Do Not Track Disclosures</h4>
                <div class="paragraph">
                  MyHbarWallet.com does not track users over time and across third party websites to provide targeted advertising and therefore does not respond to Do Not Track (DNT) signals.
                </div>
                <div class="heading">
                  USE OF INFORMATION
                </div>
                <div class="paragraph">
                  We use the information that we have about you to provide support and certain Services to you.
                </div>
                <div class="paragraph">
                  We may use the Personal Information we collect from and about you to (1) provide you with information or services that you request from us, including to respond to your comments, questions, and/or provide customer service; (2) monitor and analyze usage and trends and personalize and improve the Services and your experience using the Services; and (3) for any other purpose with your consent.
                </div>
                <div class="heading">
                  SHARING OF PERSONAL INFORMATION
                </div>
                <div class="paragraph">
                  We will not disclose your Personal Information other than as described below, and we do not and will not sell your Personal Information to anyone.
                </div>
                <div class="paragraph">
                  We may share the Personal Information we collect from and about you (1) to fulfill the purpose for which you provided it; (2) with your consent; (3) for legal, protection, and safety purposes; (4) to comply with any court order, law, or legal process, including to respond to any government or regulatory request; (5) to protect the rights of MyHbarWallet.com, our agents, customers, and others, including by enforcing our agreements, policies, and terms of service; and (6) with those who need it to do work for us (our Service Providers, as defined below).
                </div>
                <h4>Service providers</h4>
                <div class="paragraph">
                  We may contract with third parties to perform functions related to the Services (“Service Providers”). In general, Service Providers will have access to your Personal Information only to the extent needed to perform their business functions but may not use or share that personal information for purposes outside the scope of their functions related to the Services.
                </div>
                <div class="heading">
                  LINKS TO OTHER SITES
                </div>
                <div class="paragraph">
                  The Services contain links to other third-party websites or applications. Once you click on such a link and leave the Site or are redirected to a third-party website or application, you are no longer governed by this Policy. Any information you provide on those sites is subject to that third party’s privacy policy and we are not responsible for the privacy and security practices and policies of those third-party sites or applications.
                </div>
                <div class="heading">
                  OUR COMMITMENT TOWARDS CHILDREN'S PRIVACY
                </div>
                <div class="paragraph">
                  We do not direct the Services to, nor do we knowingly collect any Personal Information from children under 13. Children under 13 are not eligible to use the Services. If we learn that someone using our Services is under 13 years of age, we will take steps to remove any Personal Information from our database and to prevent them from utilizing the Services.
                </div>
                <div class="heading">
                  SECURITY OF YOUR PERSONAL INFORMATION &amp; RIGHTS
                </div>
                <div class="paragraph">
                  We are committed to protecting the security of Personal Information. We have taken certain physical, administrative, and technical steps to help safeguard the information we collect from and about you. While we take steps to help ensure the integrity and security of our network and systems, we cannot guarantee our security measures.
                </div>
                <div class="paragraph">
                  In certain circumstances, you will also have the following rights:
                </div>
                <ol>
                  <li class="item">
                    Right to access: the right to request certain information about, access to and copies of any Personal Information about you that we are holding (please note that you are entitled to request one copy of the Personal Information that we hold about you at no cost, but for any further copies, we reserve the right to charge a reasonable fee based on administration costs);
                  </li>
                  <li class="item">
                    Right to rectification: the right to have your Personal Information rectified if it is inaccurate or incomplete;
                  </li>
                  <li class="item">
                    Right to erasure/“right to be forgotten”: where the processing of your information is based on your consent, the right to withdraw that consent and the right to request that we delete or erase your Personal Information from our systems (however, this will not apply if we are required to hold on to the information for compliance with any legal obligation, or if we require the information to establish or defend any legal claim);
                  </li>
                  <li class="item">
                    Right to restriction of use of your information: the right to stop us from using your Personal Information or limit the way in which we can use it;
                  </li>
                  <li class="item">
                    Right to data portability: the right to request that we return any information you have provided in a structured, commonly used, and machine-readable format, or that we send it directly to another company, where technically feasible; and
                  </li>
                  <li class="item">
                    <i18n-stub path="privacyPolicy.section11.paragraph2.subsection6"><br> <a href="mailto:support@myhbarwallet.com">
                        support@myhbarwallet.com
                      </a></i18n-stub>
                  </li>
                </ol>
                <div class="heading">
                  LEGAL BASIS FOR PROCESSING
                </div>
                <div class="paragraph">
                  The following legal bases apply to the ways in which we use and share an individual’s Personal Information:
                </div>
                <ol>
                  <li class="item">
                    We rely on an individual’s consent to process Personal Information to provide support and/or carry out Promotions. This consent can be withdrawn at any time.
                  </li>
                  <li class="item">
                    We also process the information provided by an individual in our legitimate interests in ensuring our business is conducted legitimately and to a high standard.
                  </li>
                </ol>
                <div class="heading">
                  RETENTION
                </div>
                <div class="paragraph">
                  We will retain the information you provide in order to process your request, provide support, and/or carry out and fulfill our Promotions. If you request support, we will retain your information for no longer than six (6) months. If you participate in a Promotion, we will retain your information until the Promotion is carried out and ninety (90) days after any prize, reward, or offer is fulfilled. Your Personal Information will then be deleted.
                </div>
                <div class="heading">
                  CONTACT INFORMATION
                </div>
                <div class="paragraph">
                  <i18n-stub path="privacyPolicy.section14.paragraph1"><a href="mailto:support@myhbarwallet.com">
                      support@myhbarwallet.com
                    </a></i18n-stub>
                </div>
                <div class="heading">
                  CHANGES TO PRIVACY POLICY
                </div>
                <div class="paragraph">
                  We may modify this Policy from time to time. If we make any changes, we will change the Last Updated date above. We also may provide additional notice, as applicable, depending on the type of change. If you object to any changes, you may stop using the Services. Your continued use of the Services after we publish or otherwise provide notice about our changes to the Policy means that you are consenting to the updated Policy.
                </div>
              </div>
            </circlepage-stub>
        `);
    });
});
