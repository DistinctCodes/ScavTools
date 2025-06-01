import Link from "next/link";
import {
  ArrowRight,
  Code,
  Github,
  Zap,
  Lock,
  Wrench,
  Rocket,
  Globe,
  Shield,
  Brain,
  PuzzleIcon as PuzzlePiece,
  Quote,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Developer Tools Reimagined
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  High-quality tools for developers
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  ScavTools provides fast, reliable developer utilities in one
                  place. From frontend helpers to blockchain tools.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/tools">
                    Explore Tools
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                How It Works
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground">
                Get started with ScavTools in three simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Lock className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold">Log In</h3>
                <p className="text-sm text-muted-foreground">
                  Unlock full tool access with a secure account
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Wrench className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold">Use Tools</h3>
                <p className="text-sm text-muted-foreground">
                  Access all tools directly in your browser with no downloads
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Rocket className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold">Power Projects</h3>
                <p className="text-sm text-muted-foreground">
                  Enhance your workflow with developer-focused features
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why ScavTools Section */}
        <section className="w-full py-12 md:py-24 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Why ScavTools
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground">
                Powerful reasons to make ScavTools your go-to developer toolkit
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {/* Reason 1 */}
              <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg border bg-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">No Installations</h3>
                <p className="text-sm text-muted-foreground">
                  Use tools directly in your browser without any downloads or
                  setup
                </p>
              </div>

              {/* Reason 2 */}
              <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg border bg-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Secure Access</h3>
                <p className="text-sm text-muted-foreground">
                  Login-protected usage ensures your tools and data remain
                  secure
                </p>
              </div>

              {/* Reason 3 */}
              <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg border bg-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Brain className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">StarkNet Support</h3>
                <p className="text-sm text-muted-foreground">
                  Specialized web3 tools with native StarkNet blockchain
                  integration
                </p>
              </div>

              {/* Reason 4 */}
              <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg border bg-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <PuzzlePiece className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Growing Collection</h3>
                <p className="text-sm text-muted-foreground">
                  Continuously expanding toolkit with new developer utilities
                </p>
              </div>
            </div>

            {/* Technology Badge Row */}
            <div className="mt-16 flex flex-col items-center">
              <p className="text-sm text-muted-foreground mb-6">Powered by</p>
              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                <div className="flex items-center space-x-2 rounded-full bg-muted px-4 py-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="text-sm font-medium">NestJS</span>
                </div>
                <div className="flex items-center space-x-2 rounded-full bg-muted px-4 py-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="text-sm font-medium">PostgreSQL</span>
                </div>
                <div className="flex items-center space-x-2 rounded-full bg-muted px-4 py-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm font-medium">StarkNet</span>
                </div>
                <div className="flex items-center space-x-2 rounded-full bg-muted px-4 py-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2L2 19h20L12 2z" fill="currentColor" />
                  </svg>
                  <span className="text-sm font-medium">Next.js</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 bg-muted/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                What Developers Say
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground">
                Hear from the developers who use ScavTools every day
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Testimonial 1 */}
              <div className="flex flex-col p-6 rounded-xl border bg-card shadow-sm">
                <div className="flex items-center mb-4 text-primary">
                  <Quote className="h-8 w-8 mr-2" />
                </div>
                <blockquote className="text-lg font-medium mb-4">
                  "I ditched 3 Chrome extensions thanks to ScavTools."
                </blockquote>
                <div className="mt-auto">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      FD
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-semibold">Frontend Dev</p>
                      <p className="text-xs text-muted-foreground">
                        React Specialist
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="flex flex-col p-6 rounded-xl border bg-card shadow-sm">
                <div className="flex items-center mb-4 text-primary">
                  <Quote className="h-8 w-8 mr-2" />
                </div>
                <blockquote className="text-lg font-medium mb-4">
                  "Finally, a tool that understands blockchain devs."
                </blockquote>
                <div className="mt-auto">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      SB
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-semibold">StarkNet Builder</p>
                      <p className="text-xs text-muted-foreground">
                        Smart Contract Developer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Features
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Everything you need to streamline your development workflow.
                </p>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12">
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">Fast & Reliable</h3>
                  <p className="text-muted-foreground">
                    All tools run in your browser for instant results.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Code className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">Developer-First</h3>
                  <p className="text-muted-foreground">
                    Built by developers, for developers.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Github className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">Open Source</h3>
                  <p className="text-muted-foreground">
                    Contribute and help improve our tools.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Login Prompt / Join Section */}
        <section className="w-full py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-3xl mx-auto">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-foreground/10">
                <Users className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Join 500+ developers using ScavTools for their daily work.
              </h2>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6 h-auto font-semibold"
              >
                <Link href="/register">
                  Create a Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
