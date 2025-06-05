"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Activity, Clock, Globe, AlertTriangle, CheckCircle, Trash2, Plus, RefreshCw } from "lucide-react"

// Types
interface Monitor {
  id: string
  name: string
  url: string
  active: boolean
  interval: number
  timeout: number
  expectedStatusCode: number
  uptimePercentage: number | null
  averageResponseTime: number | null
  lastCheckedAt: string | null
  isDown: boolean
  createdAt: string
  updatedAt: string
}

interface Check {
  id: string
  monitorId: string
  success: boolean
  statusCode: number | null
  responseTime: number | null
  error: string | null
  createdAt: string
}

interface Incident {
  id: string
  monitorId: string
  startedAt: string
  resolvedAt: string | null
  duration: number | null
  reason: string | null
}

export function UptimeMonitorTool() {
  const { toast } = useToast()
  const [monitors, setMonitors] = useState<Monitor[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMonitor, setSelectedMonitor] = useState<Monitor | null>(null)
  const [checks, setChecks] = useState<Check[]>([])
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    active: true,
    interval: 300, // 5 minutes
    timeout: 5000, // 5 seconds
    expectedStatusCode: 200,
  })

  // Fetch monitors on component mount
  useEffect(() => {
    fetchMonitors()
  }, [])

  // Fetch monitor details when a monitor is selected
  useEffect(() => {
    if (selectedMonitor) {
      fetchChecks(selectedMonitor.id)
      fetchIncidents(selectedMonitor.id)
    }
  }, [selectedMonitor])

  // Fetch all monitors
  const fetchMonitors = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/uptime/monitors")

      if (!response.ok) {
        throw new Error("Failed to fetch monitors")
      }

      const data = await response.json()
      setMonitors(data)
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Fetch checks for a monitor
  const fetchChecks = async (monitorId: string) => {
    try {
      const response = await fetch(`/api/uptime/monitors/${monitorId}/checks`)

      if (!response.ok) {
        throw new Error("Failed to fetch checks")
      }

      const data = await response.json()
      setChecks(data)
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  // Fetch incidents for a monitor
  const fetchIncidents = async (monitorId: string) => {
    try {
      const response = await fetch(`/api/uptime/monitors/${monitorId}/incidents`)

      if (!response.ok) {
        throw new Error("Failed to fetch incidents")
      }

      const data = await response.json()
      setIncidents(data)
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  // Create a new monitor
  const createMonitor = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/uptime/monitors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to create monitor")
      }

      const newMonitor = await response.json()
      setMonitors([newMonitor, ...monitors])

      // Reset form
      setFormData({
        name: "",
        url: "",
        active: true,
        interval: 300,
        timeout: 5000,
        expectedStatusCode: 200,
      })

      toast({
        title: "Success",
        description: "Monitor created successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  // Delete a monitor
  const deleteMonitor = async (id: string) => {
    if (!confirm("Are you sure you want to delete this monitor?")) {
      return
    }

    try {
      const response = await fetch(`/api/uptime/monitors/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete monitor")
      }

      setMonitors(monitors.filter((m) => m.id !== id))

      if (selectedMonitor?.id === id) {
        setSelectedMonitor(null)
      }

      toast({
        title: "Success",
        description: "Monitor deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  // Manually trigger a check
  const triggerCheck = async (id: string) => {
    try {
      const response = await fetch(`/api/uptime/monitors/${id}/check`, {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to trigger check")
      }

      // Refresh monitor data
      fetchMonitors()

      if (selectedMonitor?.id === id) {
        fetchChecks(id)
      }

      toast({
        title: "Success",
        description: "Check triggered successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  // Format duration
  const formatDuration = (seconds: number) => {
    if (seconds < 60) {
      return `${Math.round(seconds)} seconds`
    } else if (seconds < 3600) {
      return `${Math.round(seconds / 60)} minutes`
    } else {
      return `${Math.round(seconds / 3600)} hours`
    }
  }

  // Format interval
  const formatInterval = (seconds: number) => {
    if (seconds === 60) return "1 minute"
    if (seconds === 300) return "5 minutes"
    if (seconds === 900) return "15 minutes"
    if (seconds === 1800) return "30 minutes"
    if (seconds === 3600) return "1 hour"
    return `${seconds} seconds`
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Ping & Uptime Monitor</h1>
        <p className="text-muted-foreground">Monitor website uptime and get notified when services go down</p>
      </div>

      <Tabs defaultValue="monitors">
        <TabsList className="mb-4">
          <TabsTrigger value="monitors">Monitors</TabsTrigger>
          <TabsTrigger value="create">Create Monitor</TabsTrigger>
          {selectedMonitor && <TabsTrigger value="details">Monitor Details</TabsTrigger>}
        </TabsList>

        {/* Monitors List Tab */}
        <TabsContent value="monitors">
          <div className="grid gap-4">
            {loading ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center h-40">
                    <p>Loading monitors...</p>
                  </div>
                </CardContent>
              </Card>
            ) : monitors.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-center h-40 text-center">
                    <Globe className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No monitors yet</h3>
                    <p className="text-muted-foreground">Create your first monitor to start tracking uptime</p>
                    <Button className="mt-4" onClick={() => document.querySelector('[data-value="create"]')?.click()}>
                      <Plus className="mr-2 h-4 w-4" /> Create Monitor
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              monitors.map((monitor) => (
                <Card key={monitor.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center">
                          {monitor.name}
                          {monitor.active ? (
                            <Badge variant={monitor.isDown ? "destructive" : "outline"} className="ml-2">
                              {monitor.isDown ? "Down" : "Up"}
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="ml-2">
                              Paused
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          <a href={monitor.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {monitor.url}
                          </a>
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => triggerCheck(monitor.id)}
                          title="Run check now"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => deleteMonitor(monitor.id)}
                          title="Delete monitor"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Uptime</p>
                        <p className="font-medium">
                          {monitor.uptimePercentage !== null ? `${monitor.uptimePercentage.toFixed(2)}%` : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Response Time</p>
                        <p className="font-medium">
                          {monitor.averageResponseTime !== null
                            ? `${monitor.averageResponseTime.toFixed(0)} ms`
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Check Interval</p>
                        <p className="font-medium">{formatInterval(monitor.interval)}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      className="w-full justify-start p-2 h-auto"
                      onClick={() => setSelectedMonitor(monitor)}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* Create Monitor Tab */}
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Monitor</CardTitle>
              <CardDescription>Add a new website or service to monitor</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={createMonitor} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Monitor Name</Label>
                  <Input
                    id="name"
                    placeholder="My Website"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    placeholder="https://example.com"
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="interval">Check Interval</Label>
                  <Select
                    value={formData.interval.toString()}
                    onValueChange={(value) => setFormData({ ...formData, interval: Number.parseInt(value) })}
                  >
                    <SelectTrigger id="interval">
                      <SelectValue placeholder="Select interval" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="60">Every 1 minute</SelectItem>
                      <SelectItem value="300">Every 5 minutes</SelectItem>
                      <SelectItem value="900">Every 15 minutes</SelectItem>
                      <SelectItem value="1800">Every 30 minutes</SelectItem>
                      <SelectItem value="3600">Every hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="timeout">Timeout (ms)</Label>
                  <Input
                    id="timeout"
                    type="number"
                    min="1000"
                    max="30000"
                    step="1000"
                    value={formData.timeout}
                    onChange={(e) => setFormData({ ...formData, timeout: Number.parseInt(e.target.value) })}
                  />
                  <p className="text-xs text-muted-foreground">Maximum time to wait for response (1000-30000 ms)</p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="expectedStatusCode">Expected Status Code</Label>
                  <Input
                    id="expectedStatusCode"
                    type="number"
                    min="100"
                    max="599"
                    value={formData.expectedStatusCode}
                    onChange={(e) => setFormData({ ...formData, expectedStatusCode: Number.parseInt(e.target.value) })}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                  />
                  <Label htmlFor="active">Active</Label>
                </div>

                <Button type="submit" className="w-full">
                  Create Monitor
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monitor Details Tab */}
        {selectedMonitor && (
          <TabsContent value="details">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        {selectedMonitor.name}
                        {selectedMonitor.active ? (
                          <Badge variant={selectedMonitor.isDown ? "destructive" : "outline"} className="ml-2">
                            {selectedMonitor.isDown ? "Down" : "Up"}
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="ml-2">
                            Paused
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        <a
                          href={selectedMonitor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {selectedMonitor.url}
                        </a>
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => triggerCheck(selectedMonitor.id)}>
                      <RefreshCw className="mr-2 h-4 w-4" /> Run Check
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Uptime</p>
                      <p className="text-2xl font-bold">
                        {selectedMonitor.uptimePercentage !== null
                          ? `${selectedMonitor.uptimePercentage.toFixed(2)}%`
                          : "N/A"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Response Time</p>
                      <p className="text-2xl font-bold">
                        {selectedMonitor.averageResponseTime !== null
                          ? `${selectedMonitor.averageResponseTime.toFixed(0)} ms`
                          : "N/A"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Check Interval</p>
                      <p className="text-2xl font-bold">{formatInterval(selectedMonitor.interval)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Last Checked</p>
                      <p className="text-2xl font-bold">
                        {selectedMonitor.lastCheckedAt
                          ? new Date(selectedMonitor.lastCheckedAt).toLocaleTimeString()
                          : "Never"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Recent Checks */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Checks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {checks.length === 0 ? (
                      <div className="text-center py-6">
                        <Clock className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                        <p>No checks performed yet</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {checks.map((check) => (
                          <div key={check.id} className="flex items-start space-x-3 pb-3 border-b last:border-0">
                            {check.success ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            ) : (
                              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                            )}
                            <div className="flex-1 space-y-1">
                              <div className="flex justify-between">
                                <p className="font-medium">
                                  {check.success ? "Successful" : "Failed"}
                                  {check.statusCode && ` (${check.statusCode})`}
                                </p>
                                <p className="text-sm text-muted-foreground">{formatDate(check.createdAt)}</p>
                              </div>
                              {check.responseTime && (
                                <p className="text-sm">Response time: {check.responseTime.toFixed(0)} ms</p>
                              )}
                              {check.error && <p className="text-sm text-red-500">{check.error}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Incidents */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Incidents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {incidents.length === 0 ? (
                      <div className="text-center py-6">
                        <Activity className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                        <p>No incidents recorded</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {incidents.map((incident) => (
                          <div key={incident.id} className="pb-3 border-b last:border-0">
                            <div className="flex justify-between items-start mb-1">
                              <div className="flex items-center">
                                <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                                <p className="font-medium">Downtime Incident</p>
                              </div>
                              <Badge variant={incident.resolvedAt ? "outline" : "destructive"}>
                                {incident.resolvedAt ? "Resolved" : "Ongoing"}
                              </Badge>
                            </div>
                            <p className="text-sm mb-1">Started: {formatDate(incident.startedAt)}</p>
                            {incident.resolvedAt && (
                              <p className="text-sm mb-1">Resolved: {formatDate(incident.resolvedAt)}</p>
                            )}
                            {incident.duration && (
                              <p className="text-sm mb-1">Duration: {formatDuration(incident.duration)}</p>
                            )}
                            {incident.reason && (
                              <p className="text-sm text-muted-foreground">Reason: {incident.reason}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
