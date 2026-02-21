import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | SkillBridge",
  description: "Privacy Policy of SkillBridge",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-16 px-4 md:px-8 max-w-4xl">
      <h1 className="mb-8 text-4xl font-extrabold tracking-tight lg:text-5xl border-b pb-6">Privacy Policy</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-lg">
        <p className="text-muted-foreground font-medium">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <section>
          <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">1. Introduction</h2>
          <p>
            Welcome to SkillBridge (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We deeply respect your privacy and are unconditionally committed to protecting your personal data. This comprehensive Privacy Policy outlines how we collect, process, safeguard, and manage your personal information when you access our platform, interact with our services, or utilize our tutoring network.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">2. Information We Collect</h2>
          <p>To provide you with a premier educational experience, we collect and process the following categories of data:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Identity Data:</strong> First name, last name, username, title, and profile photographs.</li>
            <li><strong>Contact Data:</strong> Primary email addresses, telephone numbers, and billing addresses.</li>
            <li><strong>Educational Data:</strong> Academic background, subjects of interest, tutoring qualifications, and session history.</li>
            <li><strong>Financial Data:</strong> Securely tokenized payment card details and transaction history (processed by our secure PCI-compliant partners).</li>
            <li><strong>Technical Data:</strong> Internet Protocol (IP) address, browser type and version, time zone setting, browser plug-in types, operating system, and platform metadata.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">3. How We Use Your Data</h2>
          <p>We strictly utilize your personal data under the following circumstances, aligning with legal compliance:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>To register you as a new Tutor or Student within the SkillBridge ecosystem.</li>
            <li>To process and seamlessly manage your course bookings, session scheduling, and integrated payments.</li>
            <li>To manage our relationship with you, including notifying you about critical changes to our terms or privacy policy.</li>
            <li>To administer, protect, and optimize our platform (including rigorous troubleshooting, data analysis, and system security testing).</li>
            <li>To securely deliver highly relevant and personalized educational content and recommendations.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">4. Data Security & Retention</h2>
          <p>
            We have implemented robust, enterprise-grade security measures designed to proactively prevent your personal data from being accidentally lost, used, accessed in an unauthorized way, altered, or categorically disclosed. Access to your personal data is strictly limited to authorized employees, certified agents, contractors, and essential third parties who require standard business access. We will only retain your personal data for precisely as long as reasonably necessary to fulfill the operational purposes we initially collected it for, including for the purposes of satisfying any strict legal, regulatory, tax, accounting or subsequent reporting requirements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mt-10 mb-4 text-primary">5. Your Legal Rights</h2>
          <p>Under definitive data protection laws, you fundamentally possess rights including:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Request Access:</strong> Obtain a copy of the personal data we hold about you.</li>
            <li><strong>Request Correction:</strong> Rectify any incomplete or inaccurate data we possess.</li>
            <li><strong>Request Erasure:</strong> Ask us to securely delete or remove personal data where there is no valid foundational reason for us to actively continue processing it.</li>
            <li><strong>Object to Processing:</strong> Challenge processing based categorically on our legitimate interests.</li>
          </ul>
        </section>

        <section className="bg-muted p-6 rounded-lg mt-12 border">
          <h2 className="text-xl font-bold mb-2">6. Contact Us</h2>
          <p className="mb-0">
            If you have any questions, concerns, or legal inquiries regarding this highly structured Privacy Policy, please contact our dedicated Data Privacy Officer at <Link href="mailto:arefinrounok@gmail.com" className="text-primary hover:underline font-semibold">arefinrounok@gmail.com</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
