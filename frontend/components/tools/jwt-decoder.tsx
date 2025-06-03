"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function JwtDecoder() {
  const [jwt, setJwt] = useState("")
  const [decodedHeader, setDecodedHeader] = useState<any>(null)
  const [decodedPayload, setDecodedPayload] = useState<any>(null)
  const [error, setError] = useState("")

  const decodeJwt = () => {
    try {
      setError("")

      if (!jwt) {
        setDecodedHeader(null)
        setDecodedPayload(null)
        return
      }

      const parts = jwt.split(".")
      if (parts.length !== 3) {
        throw new Error("Invalid JWT format. Expected 3 parts separated by dots.")
      }

      // Decode header
      const headerBase64 = parts[0]
      const headerJson = atob(headerBase64.replace(/-/g, "+").replace(/_/g, "/"))
      const header = JSON.parse(headerJson)
      setDecodedHeader(header)

      // Decode payload
      const payloadBase64 = parts[1]
      const payloadJson = atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"))
      const payload = JSON.parse(payloadJson)
      setDecodedPayload(payload)

      // Check if token is expired
      if (payload.exp) {
        const expiryDate = new Date(payload.exp * 1000)
        const now = new Date()
        if (now > expiryDate) {
          setError(`Token expired on ${expiryDate.toLocaleString()}`)
        }
      }
    } catch (err) {
      setError((err as Error).message)
      setDecodedHeader(null)
      setDecodedPayload(null)
    }
  }

  const formatJson = (obj: any) => {
    return JSON.stringify(obj, null, 2)
  }

  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader>
        <CardTitle>JWT Decoder</CardTitle>
        <CardDescription>Decode and verify JSON Web Tokens</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Textarea
            placeholder="Paste your JWT here..."
            value={jwt}
            onChange={(e) => setJwt(e.target.value)}
            className="font-mono text-sm min-h-24"
          />
          <Button onClick={decodeJwt} disabled={!jwt}>
            Decode
          </Button>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        {(decodedHeader || decodedPayload) && (
          <Tabs defaultValue="payload">
            <TabsList>
              <TabsTrigger value="payload">Payload</TabsTrigger>
              <TabsTrigger value="header">Header</TabsTrigger>
            </TabsList>

            <TabsContent value="payload">
              <div className="bg-muted p-4 rounded-md overflow-x-auto">
                <pre className="text-sm">{decodedPayload ? formatJson(decodedPayload) : "No payload data"}</pre>
              </div>
              {decodedPayload?.exp && (
                <div className="mt-4 text-sm">
                  <p>
                    <strong>Expires:</strong> {new Date(decodedPayload.exp * 1000).toLocaleString()}
                  </p>
                  {decodedPayload.iat && (
                    <p>
                      <strong>Issued At:</strong> {new Date(decodedPayload.iat * 1000).toLocaleString()}
                    </p>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="header">
              <div className="bg-muted p-4 rounded-md overflow-x-auto">
                <pre className="text-sm">{decodedHeader ? formatJson(decodedHeader) : "No header data"}</pre>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}
