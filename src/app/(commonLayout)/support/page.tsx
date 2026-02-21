import { Metadata } from 'next';
import { Mail, Phone, MapPin, LifeBuoy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Support | Skill Bridge',
  description: 'Get help and support for your Skill Bridge account.',
};

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <LifeBuoy className="h-16 w-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">How can we help?</h1>
        <p className="text-lg text-muted-foreground">
          Our support team is here to assist you with any questions or issues you might have.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="border shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Email Support</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Send us an email anytime and we'll get back to you within 24 hours.
            </p>
            <Link href="mailto:arefinrounok@gmail.com" className="font-medium text-primary hover:underline">
              arefinrounok@gmail.com
            </Link>
          </CardContent>
        </Card>

        <Card className="border shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Phone className="h-6 w-6 text-foreground" />
            </div>
            <h3 className="font-bold text-lg mb-2">Phone Support</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Available Monday to Friday, 9am to 6pm EST.
            </p>
            <Link href="tel:+8801711111111" className="font-medium hover:underline">
              +8801711111111
            </Link>
          </CardContent>
        </Card>

        <Card className="border shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="font-bold text-lg mb-2">Write to us</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drop by our office or send us a letter.
            </p>
            <address className="text-sm not-italic text-muted-foreground">
              123 Education Lane<br />
              Tech District<br />
              Dhaka 1207
            </address>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted/30 rounded-2xl p-8 border">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-lg mb-2">How do I book a session?</h4>
            <p className="text-muted-foreground">Navigate to the Tutors page, select a tutor you like, and click on their available time slots to book a session.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2">Can I cancel my booking?</h4>
            <p className="text-muted-foreground">Yes, you can cancel your booking up to 24 hours before the session starts from your dashboard.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2">How do I become a tutor?</h4>
            <p className="text-muted-foreground">Register an account and then navigate to the Tutor Dashboard to set up your profile and availability.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
