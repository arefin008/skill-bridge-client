export const metadata = {
  title: "Terms of Service | SkillBridge",
  description: "Terms of Service of SkillBridge",
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto py-16 px-4 md:px-8 max-w-4xl">
      <h1 className="mb-8 text-4xl font-extrabold tracking-tight lg:text-5xl border-b pb-6">Terms of Service</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-lg">
        <p className="text-muted-foreground font-medium">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <section>
          <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">1. Acceptance of Terms</h2>
          <p>
            By accessing, browsing, or utilizing the SkillBridge platform, you officially acknowledge that you have actively read, completely understood, and irrevocably agree to essentially be bound by these definitive Terms of Service. If you expressly disagree with any integrated provision of these comprehensive terms, you are explicitly prohibited from accessing or using our proprietary services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">2. Platform Role & Responsibilities</h2>
          <p>
            SkillBridge acts exclusively as an advanced technological intermediary, seamlessly facilitating direct connections between qualified independent educational professionals (&quot;Tutors&quot;) and eager individuals actively seeking supplemental knowledge (&quot;Students&quot;). We do not intrinsically employ Tutors, nor are we categorically responsible for the explicit quality, complete accuracy, or absolute legality of the educational services actively rendered by independent Tutors.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">3. User Obligations & Conduct</h2>
          <p>To explicitly maintain a secure and productive learning environment, all active Users agree to fundamentally:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Provide completely accurate, exclusively current, and categorically true identity and qualification information.</li>
            <li>Maintain an absolute standard of professional courtesy and explicit mutual respect during all scheduled sessions.</li>
            <li>Strictly refrain from deliberately circumventing the platform&apos;s integrated booking and proprietary payment architecture.</li>
            <li>Acknowledge that any documented harassment, verified discrimination, or confirmed illegal conduct explicitly results in immediate account termination.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">4. Payments, Bookings, and Cancellations</h2>
          <p>
            All secure payments for verified tutoring services are processed transparently through our authorized third-party PCI-compliant payment gateways. Students universally agree to immediately pay all listed fees exclusively through the SkillBridge infrastructure prior to confirmed secure session commencement. Cancellations are strictly governed by the localized cancellation policy explicitly documented by each individual Tutor. Chronic cancellations may definitively result in systematic account restrictions or absolute privilege revocation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">5. Intellectual Property Rights</h2>
          <p>
            The comprehensive SkillBridge platform, extensively including its foundational source code, proprietary algorithms, bespoke design, and exclusively generated content, is comprehensively owned by SkillBridge and unconditionally protected by international copyright laws. Independent materials proactively shared by Tutors during live sessions resolutely remain the intellectual property of the respective originating Tutor.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">6. Limitation of Liability</h2>
          <p>
            To the absolute maximum extent comprehensively permitted by prevailing law, SkillBridge shall explicitly not be held liable for any indirect, naturally incidental, inherently special, consequential or strictly punitive damages resulting directly or indirectly from your access to, or verified inability to definitively access, our integrated services.
          </p>
        </section>

        <section className="bg-muted p-6 rounded-lg mt-12 border">
          <h2 className="text-xl font-bold mb-2">7. Contact Information</h2>
          <p className="mb-0">
            For critical legal inquiries or necessary clarifications regarding these explicit Terms of Service, please formally direct communication to our Legal Department at <a href="mailto:legal@skillbridge.com" className="text-primary hover:underline font-semibold">legal@skillbridge.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
