import Link from "next/link";
import { ArrowRight, Code, Github, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      </div>

      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} ScavTools. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm">
            <Link
              href="/about"
              className="text-muted-foreground hover:underline"
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="text-muted-foreground hover:underline"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:underline"
            >
              Terms
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:underline"
            >
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
