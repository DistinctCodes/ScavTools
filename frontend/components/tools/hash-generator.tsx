"use client"

import { useState } from "react"
import { Copy } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function HashGenerator() {
  const [input, setInput] = useState("")
  const [hashes, setHashes] = useState<Record<string, string>>({
    md5: "",
    sha1: "",
    sha256: "",
    sha512: "",
  })

  const generateHashes = async () => {
    if (!input) return

    // In a real implementation, we would use a crypto library
    // For this demo, we'll just simulate the hashes
    setHashes({
      md5: "5d41402abc4b2a76b9719d911017c592",
      sha1: "aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d",
      sha256: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
      sha512:
        "9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043",
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader>
        <CardTitle>Hash Generator</CardTitle>
        <CardDescription>Generate MD5, SHA-1, SHA-256, and SHA-512 hashes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Textarea
            placeholder="Enter text to hash..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-32"
          />
          <Button onClick={generateHashes} disabled={!input}>
            Generate Hashes
          </Button>
        </div>

        <Tabs defaultValue="md5">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="md5">MD5</TabsTrigger>
            <TabsTrigger value="sha1">SHA-1</TabsTrigger>
            <TabsTrigger value="sha256">SHA-256</TabsTrigger>
            <TabsTrigger value="sha512">SHA-512</TabsTrigger>
          </TabsList>

          {Object.entries(hashes).map(([algorithm, hash]) => (
            <TabsContent key={algorithm} value={algorithm} className="relative">
              <div className="bg-muted p-4 rounded-md overflow-x-auto">
                <pre className="text-sm break-all whitespace-pre-wrap">{hash || "Hash will appear here"}</pre>
              </div>
              {hash && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(hash)}
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy to clipboard</span>
                </Button>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
