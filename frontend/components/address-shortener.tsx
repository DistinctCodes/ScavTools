"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AddressShortener() {
  const [address, setAddress] = useState("")
  const [shortAddress, setShortAddress] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const shortenAddress = () => {
    try {
      setError("")

      // Validate Ethereum address format
      if (!address.match(/^0x[a-fA-F0-9]{40}$/)) {
        throw new Error("Invalid Ethereum address format")
      }

      // Create shortened version (first 6 and last 4 characters)
      const shortened = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
      setShortAddress(shortened)
    } catch (err) {
      setError((err as Error).message)
      setShortAddress("")
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader>
        <CardTitle>Contract Address Shortener</CardTitle>
        <CardDescription>Create shortened versions of blockchain addresses</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="address">Ethereum Address</Label>
          <Input
            id="address"
            placeholder="0x..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="font-mono"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <Button onClick={shortenAddress} disabled={!address}>
          Shorten Address
        </Button>

        {shortAddress && (
          <div className="p-4 bg-muted rounded-md">
            <div className="flex items-center justify-between">
              <p className="font-mono">{shortAddress}</p>
              <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        <div className="text-sm text-muted-foreground">
          <p>
            Note: In a production environment, this tool would connect to a backend service to store and retrieve
            shortened addresses.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
