"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Monitor, Smartphone, Tablet, Download, RefreshCw, Trash2, RefreshCcw, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

// Define device presets
const devicePresets = {
  desktop: { width: 1920, height: 1080 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 667 },
}

type Screenshot = {
  id: string
  url: string
  title: string
  settings: {
    width: number
    height: number
    fullPage: boolean
    hideAds: boolean
    waitTime: number
  }
  isPublic: boolean
  createdAt: string
}

type ScreenshotResponse = {
  success: boolean
  id?: string
  error?: string
}

export function WebScreenshotTool() {
  const [url, setUrl] = useState("")
  const [isValidUrl, setIsValidUrl] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [screenshotResult, setScreenshotResult] = useState<ScreenshotResponse | null>(null)
  const [selectedDevice, setSelectedDevice] = useState("desktop")
  const [customWidth, setCustomWidth] = useState(1280)
  const [customHeight, setCustomHeight] = useState(800)
  const [fullPage, setFullPage] = useState(false)
  const [hideAds, setHideAds] = useState(true)
  const [waitTime, setWaitTime] = useState(1)
  const [isPublic, setIsPublic] = useState(false)
  const [recentScreenshots, setRecentScreenshots] = useState<Screenshot[]>([])
  const [activeTab, setActiveTab] = useState("new")

  // Load recent screenshots on component mount
  useEffect(() => {
    fetchRecentScreenshots()
  }, [])

  const fetchRecentScreenshots = async () => {
    try {
      const response = await fetch("/api/screenshots?limit=5", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        setRecentScreenshots(data)
      }
    } catch (error) {
      console.error("Failed to fetch recent screenshots:", error)
    }
  }

  // Validate URL
  const validateUrl = (input: string) => {
    try {
      new URL(input)
      return true
    } catch (e) {
      return false
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setUrl(input)

    if (input === "") {
      setIsValidUrl(true)
      return
    }

    // Simple validation - must start with http:// or https://
    setIsValidUrl(validateUrl(input))
  }

  const handleDeviceChange = (value: string) => {
    setSelectedDevice(value)
    if (value !== "custom") {
      const preset = devicePresets[value as keyof typeof devicePresets]
      setCustomWidth(preset.width)
      setCustomHeight(preset.height)
    }
  }

  const captureScreenshot = async () => {
    if (!url || !isValidUrl) {
      setIsValidUrl(false)
      return
    }

    setIsLoading(true)
    setScreenshotResult(null)

    try {
      // Prepare the request payload
      const payload = {
        url,
        width: customWidth,
        height: customHeight,
        fullPage,
        hideAds,
        waitTime,
        isPublic,
      }

      // Make API request to the backend
      const response = await fetch("/api/screenshots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok) {
        setScreenshotResult({
          success: true,
          id: data.id,
        })
        // Refresh the recent screenshots list
        fetchRecentScreenshots()
        // Switch to the view tab
        setActiveTab("view")
      } else {
        setScreenshotResult({
          success: false,
          error: data.message || "Failed to capture screenshot",
        })
      }
    } catch (error) {
      setScreenshotResult({
        success: false,
        error: "An unexpected error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const downloadScreenshot = (id: string) => {
    const a = document.createElement("a")
    a.href = `/api/screenshots/${id}/image`
    a.download = `screenshot-${id}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const deleteScreenshot = async (id: string) => {
    try {
      const response = await fetch(`/api/screenshots/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        // Remove from the recent screenshots list
        setRecentScreenshots(recentScreenshots.filter((s) => s.id !== id))
        // If we're viewing the deleted screenshot, go back to the new tab
        if (screenshotResult?.id === id) {
          setScreenshotResult(null)
          setActiveTab("new")
        }
      }
    } catch (error) {
      console.error("Failed to delete screenshot:", error)
    }
  }

  const recaptureScreenshot = async (id: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/screenshots/${id}/recapture`, {
        method: "POST",
      })

      const data = await response.json()

      if (response.ok) {
        // Refresh the recent screenshots list
        fetchRecentScreenshots()
        // Update the current view
        setScreenshotResult({
          success: true,
          id: data.id,
        })
      }
    } catch (error) {
      console.error("Failed to recapture screenshot:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Web Screenshot Tool</CardTitle>
          <CardDescription>Capture screenshots of any website with customizable options</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="new">New Screenshot</TabsTrigger>
              <TabsTrigger value="view">View Screenshots</TabsTrigger>
            </TabsList>

            <TabsContent value="new" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">Website URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={handleUrlChange}
                    className={!isValidUrl ? "border-red-500" : ""}
                  />
                  <Button onClick={captureScreenshot} disabled={isLoading}>
                    {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : "Capture"}
                  </Button>
                </div>
                {!isValidUrl && (
                  <p className="text-sm text-red-500">Please enter a valid URL (e.g., https://example.com)</p>
                )}
              </div>

              <Tabs defaultValue="device" className="mt-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="device">Device</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
                </TabsList>
                <TabsContent value="device" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Device Type</Label>
                    <div className="flex gap-2">
                      <Select value={selectedDevice} onValueChange={handleDeviceChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select device" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="desktop">
                            <div className="flex items-center">
                              <Monitor className="mr-2 h-4 w-4" />
                              <span>Desktop (1920×1080)</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="tablet">
                            <div className="flex items-center">
                              <Tablet className="mr-2 h-4 w-4" />
                              <span>Tablet (768×1024)</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="mobile">
                            <div className="flex items-center">
                              <Smartphone className="mr-2 h-4 w-4" />
                              <span>Mobile (375×667)</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="custom">Custom Size</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {selectedDevice === "custom" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="width">Width (px): {customWidth}</Label>
                        <Input
                          id="width"
                          type="number"
                          min="320"
                          max="2560"
                          value={customWidth}
                          onChange={(e) => setCustomWidth(Number.parseInt(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height">Height (px): {customHeight}</Label>
                        <Input
                          id="height"
                          type="number"
                          min="320"
                          max="2560"
                          value={customHeight}
                          onChange={(e) => setCustomHeight(Number.parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="advanced" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="fullPage">Capture Full Page</Label>
                      <p className="text-sm text-muted-foreground">Capture the entire scrollable page</p>
                    </div>
                    <Switch id="fullPage" checked={fullPage} onCheckedChange={setFullPage} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="hideAds">Hide Ads</Label>
                      <p className="text-sm text-muted-foreground">Attempt to hide common ad elements</p>
                    </div>
                    <Switch id="hideAds" checked={hideAds} onCheckedChange={setHideAds} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="waitTime">
                        Wait Time: {waitTime} second{waitTime !== 1 ? "s" : ""}
                      </Label>
                    </div>
                    <Slider
                      id="waitTime"
                      min={0}
                      max={10}
                      step={1}
                      value={[waitTime]}
                      onValueChange={(value) => setWaitTime(value[0])}
                    />
                    <p className="text-sm text-muted-foreground">
                      Wait time before taking screenshot (for pages with animations or lazy loading)
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="isPublic">Make Public</Label>
                      <p className="text-sm text-muted-foreground">Allow others to view this screenshot</p>
                    </div>
                    <Switch id="isPublic" checked={isPublic} onCheckedChange={setIsPublic} />
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="view">
              {screenshotResult?.success && screenshotResult.id ? (
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-md border">
                    <img
                      src={`/api/screenshots/${screenshotResult.id}/image`}
                      alt="Website Screenshot"
                      className="w-full object-contain"
                    />
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setActiveTab("new")}>
                      New Screenshot
                    </Button>
                    <div className="space-x-2">
                      <Button variant="outline" onClick={() => recaptureScreenshot(screenshotResult.id!)}>
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Recapture
                      </Button>
                      <Button variant="outline" onClick={() => deleteScreenshot(screenshotResult.id!)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                      <Button onClick={() => downloadScreenshot(screenshotResult.id!)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Recent Screenshots</h3>
                  {recentScreenshots.length > 0 ? (
                    <div className="grid gap-4">
                      {recentScreenshots.map((screenshot) => (
                        <Card key={screenshot.id} className="overflow-hidden">
                          <div className="grid grid-cols-[1fr_2fr] gap-4">
                            <div className="aspect-video overflow-hidden bg-muted">
                              <img
                                src={`/api/screenshots/${screenshot.id}/image`}
                                alt={screenshot.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="p-4">
                              <h4 className="font-medium">{screenshot.title}</h4>
                              <p className="text-sm text-muted-foreground truncate">{screenshot.url}</p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                <Badge variant="outline">
                                  <Monitor className="mr-1 h-3 w-3" />
                                  {screenshot.settings.width}×{screenshot.settings.height}
                                </Badge>
                                {screenshot.settings.fullPage && <Badge variant="outline">Full Page</Badge>}
                                {screenshot.isPublic && <Badge>Public</Badge>}
                                <Badge variant="outline">
                                  <Clock className="mr-1 h-3 w-3" />
                                  {formatDate(screenshot.createdAt)}
                                </Badge>
                              </div>
                              <div className="mt-4 flex justify-end space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setScreenshotResult({
                                      success: true,
                                      id: screenshot.id,
                                    })
                                  }}
                                >
                                  View
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => downloadScreenshot(screenshot.id)}>
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-md bg-muted p-8 text-center">
                      <p className="text-muted-foreground">No screenshots yet. Capture your first one!</p>
                      <Button className="mt-4" onClick={() => setActiveTab("new")}>
                        New Screenshot
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {screenshotResult?.success === false && (
                <div className="rounded-md bg-red-50 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                  <p>{screenshotResult.error}</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
