"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Terms and Conditions</CardTitle>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <section className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing and using ScavTools ("the Service"), you agree to be bound by these Terms and Conditions.
                  If you do not agree to these terms, please do not use our Service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-3">2. Description of Service</h2>
                <p className="text-muted-foreground">
                  ScavTools provides a collection of browser-based developer tools and utilities. The Service includes
                  frontend tools, backend-integrated features, and blockchain-powered functionalities through StarkNet
                  integration.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-3">3. User Accounts</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p>To access certain features of the Service, you must create an account. You agree to:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Provide accurate and complete information</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Notify us immediately of any unauthorized access</li>
                    <li>Be responsible for all activities under your account</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-3">4. Acceptable Use</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p>You agree not to:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Use the Service for any illegal or unauthorized purpose</li>
                    <li>Attempt to gain unauthorized access to any part of the Service</li>
                    <li>Interfere with or disrupt the Service or servers</li>
                    <li>Upload malicious code or content</li>
                    <li>Use the Service to harm others or violate their rights</li>
                    <li>Reverse engineer or attempt to extract source code</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-3">5. Intellectual Property</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    The Service and its original content, features, and functionality are owned by ScavTools and are
                    protected by international copyright, trademark, and other intellectual property laws.
                  </p>
                  <p>
                    Content you create using our tools remains your property. By using the Service, you grant us a
                    license to store and process your content as necessary to provide the Service.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-3">6. Privacy</h2>
                <p className="text-muted-foreground">
                  Your use of the Service is also governed by our{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                  , which describes how we collect, use, and protect your information.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-3">7. Disclaimers and Limitations</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS
                    OR IMPLIED, INCLUDING MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
                  </p>
                  <p>
                    IN NO EVENT SHALL SCAVTOOLS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL
                    DAMAGES ARISING FROM YOUR USE OF THE SERVICE.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-3">8. Indemnification</h2>
                <p className="text-muted-foreground">
                  You agree to indemnify and hold harmless ScavTools from any claims, damages, or expenses arising from
                  your use of the Service or violation of these Terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-3">9. Modifications to Service</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify or discontinue the Service at any time without notice. We shall not be
                  liable to you or any third party for any modification or discontinuance.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-3">10. Termination</h2>
                <p className="text-muted-foreground">
                  We may terminate or suspend your account immediately, without prior notice, for any reason, including
                  breach of these Terms. Upon termination, your right to use the Service will cease.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-3">11. Governing Law</h2>
                <p className="text-muted-foreground">
                  These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in
                  which ScavTools operates, without regard to conflict of law provisions.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-3">12. Changes to Terms</h2>
                <p className="text-muted-foreground">
                  We reserve the right to update these Terms at any time. We will notify you of any changes by posting
                  the new Terms on this page and updating the "Last updated" date.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-3">13. Contact Information</h2>
                <p className="text-muted-foreground">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <div className="mt-2 text-muted-foreground">
                  <p>Email: legal@scavtools.com</p>
                  <p>
                    Or visit our{" "}
                    <Link href="/contact" className="text-primary hover:underline">
                      Contact Page
                    </Link>
                  </p>
                </div>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
