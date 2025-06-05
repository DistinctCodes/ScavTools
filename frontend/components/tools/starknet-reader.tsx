"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export function StarknetReader() {
  const [contractAddress, setContractAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [contractData, setContractData] = useState<any>(null)
  const [error, setError] = useState("")

  const fetchContractData = async () => {
    setLoading(true)
    setError("")

    try {
      // In a real implementation, this would connect to StarkNet
      // For this demo, we'll simulate the response
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock data
      setContractData({
        address: contractAddress,
        name: "MockERC20",
        symbol: "MOCK",
        totalSupply: "1000000000000000000000000",
        decimals: 18,
        functions: [
          { name: "balanceOf", inputs: ["address"], outputs: ["uint256"] },
          { name: "transfer", inputs: ["address", "uint256"], outputs: ["bool"] },
          { name: "approve", inputs: ["address", "uint256"], outputs: ["bool"] },
          { name: "transferFrom", inputs: ["address", "address", "uint256"], outputs: ["bool"] },
        ],
        events: [
          { name: "Transfer", params: ["address indexed from", "address indexed to", "uint256 value"] },
          { name: "Approval", params: ["address indexed owner", "address indexed spender", "uint256 value"] },
        ],
      })
    } catch (err) {
      setError("Failed to fetch contract data")
      setContractData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>StarkNet Contract Reader</CardTitle>
          <Badge className="bg-purple-600 hover:bg-purple-700">StarkNet</Badge>
        </div>
        <CardDescription>Read and interact with StarkNet smart contracts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="contract-address">Contract Address</Label>
          <div className="flex gap-2">
            <Input
              id="contract-address"
              placeholder="0x..."
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              className="font-mono"
            />
            <Button onClick={fetchContractData} disabled={!contractAddress || loading}>
              {loading ? "Loading..." : "Read Contract"}
            </Button>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        {contractData && (
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="functions">Functions</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Contract Address</Label>
                  <p className="font-mono text-sm break-all">{contractData.address}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Name</Label>
                  <p>{contractData.name}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Symbol</Label>
                  <p>{contractData.symbol}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Decimals</Label>
                  <p>{contractData.decimals}</p>
                </div>
                <div className="space-y-1 col-span-2">
                  <Label className="text-xs text-muted-foreground">Total Supply</Label>
                  <p className="font-mono">{contractData.totalSupply}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="functions" className="space-y-4">
              <div className="space-y-2">
                {contractData.functions.map((func: any, index: number) => (
                  <div key={index} className="p-3 bg-muted rounded-md">
                    <p className="font-mono text-sm">
                      {func.name}({func.inputs.join(", ")}) → {func.outputs.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <div className="space-y-2">
                {contractData.events.map((event: any, index: number) => (
                  <div key={index} className="p-3 bg-muted rounded-md">
                    <p className="font-mono text-sm">
                      {event.name}({event.params.join(", ")})
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}

        <div className="text-sm text-muted-foreground">
          <p>Note: This tool would connect to StarkNet in a production environment to fetch real contract data.</p>
        </div>
      </CardContent>
    </Card>
  )
}
