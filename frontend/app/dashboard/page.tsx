"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [isLoading, user, router])

  if (isLoading) {
    return (
      <div className="container flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user.name}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Recent Tools</CardTitle>
            <CardDescription>Tools you've used recently</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No recent tools yet</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Saved Settings</CardTitle>
            <CardDescription>Your saved tool configurations</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No saved settings yet</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="text-muted-foreground">Name:</span> {user.name}
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span> {user.email}
              </div>
              <div>
                <span className="text-muted-foreground">Role:</span> {user.role}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
