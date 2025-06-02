"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"

interface MobileNavProps {
  isAuthenticated: boolean
}

export function MobileNav({ isAuthenticated }: MobileNavProps) {
  const pathname = usePathname()
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category)
  }

  const frontendTools = [
    { name: "Box Shadow Generator", path: "/tools/box-shadow" },
    { name: "Hash Generator", path: "/tools/hash-generator" },
    { name: "Regex Tester", path: "/tools/regex-tester" },
    { name: "JWT Decoder", path: "/tools/jwt-decoder" },
    { name: "Base64 Tool", path: "/tools/base64" },
    { name: "JSON Formatter", path: "/tools/json-formatter" },
  ]

  const web3Tools = [
    { name: "Address Shortener", path: "/tools/address-shortener" },
    { name: "StarkNet Reader", path: "/tools/starknet-reader" },
  ]

  const utilityTools = [
    { name: "Web Screenshot Tool", path: "/tools/web-screenshot" },
    { name: "PDF Generator", path: "/tools/pdf-generator" },
    { name: "Uptime Monitor", path: "/tools/uptime-monitor" },
    { name: "Code Snippet Saver", path: "/tools/code-snippets" },
  ]

  return (
    <div className="flex flex-col h-full py-6">
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="text-xl font-bold">
          ScavTools
        </Link>
        <ModeToggle />
      </div>

      <nav className="flex flex-col space-y-4">
        <Link
          href="/"
          className={`text-sm font-medium transition-colors hover:text-primary ${
            pathname === "/" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          Home
        </Link>

        <div>
          <button
            onClick={() => toggleCategory("frontend")}
            className="flex items-center justify-between w-full text-sm font-medium transition-colors hover:text-primary"
          >
            <span>Frontend Tools</span>
            {openCategory === "frontend" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {openCategory === "frontend" && (
            <div className="mt-2 ml-4 flex flex-col space-y-2">
              {frontendTools.map((tool) => (
                <Link
                  key={tool.path}
                  href={tool.path}
                  className={`text-sm transition-colors hover:text-primary ${
                    pathname === tool.path ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {tool.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => toggleCategory("web3")}
            className="flex items-center justify-between w-full text-sm font-medium transition-colors hover:text-primary"
          >
            <span>Web3 Tools</span>
            {openCategory === "web3" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {openCategory === "web3" && (
            <div className="mt-2 ml-4 flex flex-col space-y-2">
              {web3Tools.map((tool) => (
                <Link
                  key={tool.path}
                  href={tool.path}
                  className={`text-sm transition-colors hover:text-primary ${
                    pathname === tool.path ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {tool.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => toggleCategory("utility")}
            className="flex items-center justify-between w-full text-sm font-medium transition-colors hover:text-primary"
          >
            <span>Utility Tools</span>
            {openCategory === "utility" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {openCategory === "utility" && (
            <div className="mt-2 ml-4 flex flex-col space-y-2">
              {utilityTools.map((tool) => (
                <Link
                  key={tool.path}
                  href={tool.path}
                  className={`text-sm transition-colors hover:text-primary ${
                    pathname === tool.path ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {tool.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link
          href="/about"
          className={`text-sm font-medium transition-colors hover:text-primary ${
            pathname === "/about" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          About
        </Link>
        <Link
          href="/contact"
          className={`text-sm font-medium transition-colors hover:text-primary ${
            pathname === "/contact" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          Contact
        </Link>
      </nav>

      <Separator className="my-6" />

      {isAuthenticated ? (
        <div className="flex flex-col space-y-2">
          <Link href="/dashboard">
            <Button variant="outline" className="w-full justify-start">
              Dashboard
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant="outline" className="w-full justify-start">
              Settings
            </Button>
          </Link>
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => {
              localStorage.removeItem("token")
              // Add your logout logic here
            }}
          >
            Logout
          </Button>
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          <Link href="/login">
            <Button variant="outline" className="w-full">
              Login
            </Button>
          </Link>
          <Link href="/login?register=true">
            <Button className="w-full">Register</Button>
          </Link>
        </div>
      )}

      <div className="mt-auto">
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <Link href="/privacy" className="hover:text-primary">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-primary">
            Terms
          </Link>
        </div>
      </div>
    </div>
  )
}
