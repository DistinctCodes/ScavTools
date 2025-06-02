"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Code,
  Home,
  Grid,
  Settings,
  LogIn,
  LogOut,
  User,
  Box,
  Hash,
  FileJson,
  Key,
  FileCode,
  Blocks,
  Monitor,
  FileText,
  Activity,
  Code2,
} from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const frontendTools = [
  { name: "Box Shadow", icon: Box, path: "/tools/box-shadow" },
  { name: "Hash Generator", icon: Hash, path: "/tools/hash-generator" },
  { name: "Regex Tester", icon: Code, path: "/tools/regex-tester" },
  { name: "JWT Decoder", icon: Key, path: "/tools/jwt-decoder" },
  { name: "Base64 Encoder/Decoder", icon: FileCode, path: "/tools/base64" },
  { name: "JSON Formatter", icon: FileJson, path: "/tools/json-formatter" },
]

const web3Tools = [
  { name: "Contract Address Shortener", icon: Hash, path: "/tools/address-shortener" },
  { name: "StarkNet Contract Reader", icon: Blocks, path: "/tools/starknet-reader" },
]

const utilityTools = [
  { name: "Web Screenshot Tool", icon: Monitor, path: "/tools/web-screenshot" },
  { name: "PDF Generator", icon: FileText, path: "/tools/pdf-generator" },
  { name: "Uptime Monitor", icon: Activity, path: "/tools/uptime-monitor" },
  { name: "Code Snippet Saver", icon: Code2, path: "/tools/code-snippets" },
]

export function AppSidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-2">
        <Link href="/" className="flex items-center gap-2">
          <Code className="h-6 w-6" />
          <span className="text-xl font-bold">ScavTools</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"}>
                  <Link href="/">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/tools"}>
                  <Link href="/tools">
                    <Grid className="h-4 w-4" />
                    <span>Explore Tools</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {user && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                    <Link href="/dashboard">
                      <User className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              {user?.role === "admin" && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/admin"}>
                    <Link href="/admin">
                      <Settings className="h-4 w-4" />
                      <span>Admin</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Frontend Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {frontendTools.map((tool) => (
                <SidebarMenuItem key={tool.path}>
                  <SidebarMenuButton asChild isActive={pathname === tool.path}>
                    <Link href={tool.path}>
                      <tool.icon className="h-4 w-4" />
                      <span>{tool.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Web3 Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {web3Tools.map((tool) => (
                <SidebarMenuItem key={tool.path}>
                  <SidebarMenuButton asChild isActive={pathname === tool.path}>
                    <Link href={tool.path}>
                      <tool.icon className="h-4 w-4" />
                      <span>{tool.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Utility Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {utilityTools.map((tool) => (
                <SidebarMenuItem key={tool.path}>
                  <SidebarMenuButton asChild isActive={pathname === tool.path}>
                    <Link href={tool.path}>
                      <tool.icon className="h-4 w-4" />
                      <span>{tool.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between">
          <ModeToggle />
          {user ? (
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
          )}
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
