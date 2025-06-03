export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to ScavTools ("we," "our," or "us"). We are committed to protecting your personal information and
            your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you use our developer tools platform.
          </p>
          <p className="mb-4">
            By using ScavTools, you agree to the collection and use of information in accordance with this policy. If
            you do not agree with our policies and practices, please do not use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>

          <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
          <p className="mb-4">When you register for an account, we collect:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Email address</li>
            <li>Username</li>
            <li>Password (encrypted)</li>
            <li>Profile information you choose to provide</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">Usage Information</h3>
          <p className="mb-4">We automatically collect certain information when you use our tools:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Tool usage statistics</li>
            <li>Feature preferences</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>IP address (anonymized)</li>
            <li>Access times and dates</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">Tool-Specific Data</h3>
          <p className="mb-4">Depending on which tools you use, we may store:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Code snippets you save</li>
            <li>Generated PDFs and their content</li>
            <li>Screenshots and their metadata</li>
            <li>Uptime monitoring configurations</li>
            <li>Tool settings and preferences</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p className="mb-4">We use the collected information for:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Providing and maintaining our services</li>
            <li>Personalizing your experience</li>
            <li>Improving our tools and features</li>
            <li>Communicating with you about updates or issues</li>
            <li>Monitoring and analyzing usage patterns</li>
            <li>Detecting and preventing technical issues</li>
            <li>Protecting against unauthorized access</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Data Storage and Security</h2>
          <p className="mb-4">
            We implement appropriate technical and organizational security measures to protect your personal information
            against unauthorized access, alteration, disclosure, or destruction.
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>All data is encrypted in transit using HTTPS</li>
            <li>Passwords are hashed using industry-standard algorithms</li>
            <li>Database access is restricted and monitored</li>
            <li>Regular security audits are performed</li>
            <li>Data is stored in secure, access-controlled facilities</li>
          </ul>
          <p className="mb-4">
            However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot
            guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Data Sharing and Disclosure</h2>
          <p className="mb-4">
            We do not sell, trade, or rent your personal information to third parties. We may share your information
            only in the following circumstances:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>With your consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights, privacy, safety, or property</li>
            <li>In connection with a merger, acquisition, or sale of assets</li>
            <li>
              With service providers who assist in operating our platform (under strict confidentiality agreements)
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Your Rights and Choices</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Export your data in a portable format</li>
            <li>Opt-out of marketing communications</li>
            <li>Disable cookies in your browser</li>
          </ul>
          <p className="mb-4">To exercise these rights, please contact us at privacy@scavtools.com.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Cookies and Tracking Technologies</h2>
          <p className="mb-4">
            We use cookies and similar tracking technologies to enhance your experience. These include:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Essential cookies:</strong> Required for platform functionality
            </li>
            <li>
              <strong>Analytics cookies:</strong> Help us understand usage patterns
            </li>
            <li>
              <strong>Preference cookies:</strong> Remember your settings and preferences
            </li>
          </ul>
          <p className="mb-4">
            You can control cookies through your browser settings, but disabling certain cookies may limit
            functionality.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Third-Party Services</h2>
          <p className="mb-4">
            Our platform may contain links to third-party websites or services. We are not responsible for the privacy
            practices of these third parties. We encourage you to review their privacy policies.
          </p>
          <p className="mb-4">We use the following third-party services:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Vercel for hosting and deployment</li>
            <li>PostgreSQL for database services</li>
            <li>StarkNet for blockchain functionality</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
          <p className="mb-4">
            ScavTools is not intended for children under 13 years of age. We do not knowingly collect personal
            information from children under 13. If you believe we have collected information from a child under 13,
            please contact us immediately.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. International Data Transfers</h2>
          <p className="mb-4">
            Your information may be transferred to and processed in countries other than your own. We ensure appropriate
            safeguards are in place to protect your information in accordance with this privacy policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Data Retention</h2>
          <p className="mb-4">
            We retain your personal information for as long as necessary to provide our services and fulfill the
            purposes outlined in this policy. When data is no longer needed, we securely delete or anonymize it.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Changes to This Policy</h2>
          <p className="mb-4">
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new
            policy on this page and updating the "Last updated" date. We encourage you to review this policy
            periodically.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
          <p className="mb-4">
            If you have questions or concerns about this privacy policy or our data practices, please contact us at:
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="mb-2">
              <strong>ScavTools Privacy Team</strong>
            </p>
            <p className="mb-2">Email: privacy@scavtools.com</p>
            <p className="mb-2">Support: support@scavtools.com</p>
            <p>Response time: Within 48 hours</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">14. Legal Basis for Processing</h2>
          <p className="mb-4">We process your personal information under the following legal bases:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Your consent</li>
            <li>Performance of a contract (providing our services)</li>
            <li>Compliance with legal obligations</li>
            <li>Our legitimate interests (improving services, security)</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
