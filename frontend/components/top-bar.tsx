"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, ChevronDown, User, LogOut, Settings } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { MobileNav } from "./mobile-nav"

export function TopBar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if user is authenticated (replace with your auth logic)
  useEffect(() => {
    // Example: Check if token exists in localStorage
    const token = localStorage.getItem("token")
    setIsAuthenticated(!!token)
  }, [])

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-background"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">ScavTools</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>

          {/* Tools Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-sm font-medium transition-colors hover:text-primary">
              Tools <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/tools">All Tools</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/tools/box-shadow">Box Shadow</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/tools/hash-generator">Hash Generator</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/tools/regex-tester">Regex Tester</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/tools/jwt-decoder">JWT Decoder</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/tools/base64">Base64 Tool</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/tools/json-formatter">JSON Formatter</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/tools/address-shortener">Address Shortener</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/tools/starknet-reader">StarkNet Reader</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/tools/web-screenshot">Web Screenshot</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/tools/pdf-generator">PDF Generator</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/tools/uptime-monitor">Uptime Monitor</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/tools/code-snippets">Code Snippets</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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

        {/* Right Side - Auth & Theme */}
        <div className="flex items-center space-x-4">
          <ModeToggle />

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    localStorage.removeItem("token")
                    setIsAuthenticated(false)
                    // Add your logout logic here
                  }}
                  className="flex items-center"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/login?register=true">Register</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <MobileNav isAuthenticated={isAuthenticated} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
