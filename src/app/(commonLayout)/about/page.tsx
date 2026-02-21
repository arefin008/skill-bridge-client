import { Metadata } from 'next';
import Image from 'next/image';
import { Target, Users, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Skill Bridge',
  description: 'Learn more about Skill Bridge and our mission.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      {/* Hero Section */}
      <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-foreground">
          Bridging the gap between <span className="text-primary block md:inline">knowledge and ambition</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          We believe that quality education should be accessible to everyone. Our platform connects passionate educators with eager learners worldwide.
        </p>
      </div>

      {/* Stats/Feature Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="bg-card border rounded-2xl p-8 text-center shadow-sm">
          <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-3">Community First</h3>
          <p className="text-muted-foreground leading-relaxed">
            Built for learners and educators to thrive together in a supportive digital environment.
          </p>
        </div>
        
        <div className="bg-card border rounded-2xl p-8 text-center shadow-sm">
          <div className="mx-auto bg-secondary w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <BookOpen className="h-8 w-8 text-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-3">Quality Education</h3>
          <p className="text-muted-foreground leading-relaxed">
            Our strict verification ensures you get the best learning experience from qualified experts.
          </p>
        </div>

        <div className="bg-card border rounded-2xl p-8 text-center shadow-sm">
          <div className="mx-auto bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Target className="h-8 w-8 text-accent-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-3">Goal Oriented</h3>
          <p className="text-muted-foreground leading-relaxed">
            Structured learning paths designed to help you achieve your personal and professional milestones.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-muted/40 rounded-3xl p-8 md:p-12 border overflow-hidden relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Skill Bridge started with a simple idea: what if finding the perfect tutor was as easy as booking a ride?
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Founded in 2026, we built a platform that removes the friction from modern learning. Whether you're trying to ace an exam, learn a new programming language, or pick up a new hobby, we have the right mentor for you.
            </p>
          </div>
          <div className="relative h-64 md:h-full min-h-[300px] rounded-2xl overflow-hidden shadow-lg border">
            {/* Visual Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 flex items-center justify-center">
              <span className="text-4xl font-black text-foreground/20">SKILL BRIDGE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
