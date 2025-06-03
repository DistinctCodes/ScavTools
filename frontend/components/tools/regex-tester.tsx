"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export function RegexTester() {
  const [pattern, setPattern] = useState("")
  const [flags, setFlags] = useState("g")
  const [testString, setTestString] = useState("")
  const [matches, setMatches] = useState<string[]>([])
  const [isValid, setIsValid] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  // Flags state
  const [globalFlag, setGlobalFlag] = useState(true)
  const [caseInsensitiveFlag, setCaseInsensitiveFlag] = useState(false)
  const [multilineFlag, setMultilineFlag] = useState(false)
  const [dotAllFlag, setDotAllFlag] = useState(false)

  // Update flags when checkboxes change
  useEffect(() => {
    let newFlags = ""
    if (globalFlag) newFlags += "g"
    if (caseInsensitiveFlag) newFlags += "i"
    if (multilineFlag) newFlags += "m"
    if (dotAllFlag) newFlags += "s"
    setFlags(newFlags)
  }, [globalFlag, caseInsensitiveFlag, multilineFlag, dotAllFlag])

  // Test the regex when pattern, flags, or test string changes
  useEffect(() => {
    if (!pattern || !testString) {
      setMatches([])
      setIsValid(true)
      setErrorMessage("")
      return
    }

    try {
      const regex = new RegExp(pattern, flags)
      setIsValid(true)
      setErrorMessage("")

      const matchResults = []
      let match

      if (globalFlag) {
        while ((match = regex.exec(testString)) !== null) {
          matchResults.push(match[0])
          if (!globalFlag) break
        }
      } else {
        match = regex.exec(testString)
        if (match) matchResults.push(match[0])
      }

      setMatches(matchResults)
    } catch (error) {
      setIsValid(false)
      setErrorMessage((error as Error).message)
      setMatches([])
    }
  }, [pattern, flags, testString, globalFlag])

  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader>
        <CardTitle>Regex Tester</CardTitle>
        <CardDescription>Test and debug regular expressions with real-time feedback</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="pattern">Regular Expression</Label>
          <div className="flex">
            <div className="flex items-center bg-muted px-3 rounded-l-md border border-r-0 border-input">/</div>
            <Input
              id="pattern"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern..."
              className="rounded-none border-x-0"
            />
            <div className="flex items-center bg-muted px-3 rounded-r-md border border-l-0 border-input">/{flags}</div>
          </div>
          {!isValid && <p className="text-sm text-destructive">{errorMessage}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Switch id="global" checked={globalFlag} onCheckedChange={setGlobalFlag} />
            <Label htmlFor="global">Global (g)</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="case-insensitive" checked={caseInsensitiveFlag} onCheckedChange={setCaseInsensitiveFlag} />
            <Label htmlFor="case-insensitive">Case Insensitive (i)</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="multiline" checked={multilineFlag} onCheckedChange={setMultilineFlag} />
            <Label htmlFor="multiline">Multiline (m)</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="dotall" checked={dotAllFlag} onCheckedChange={setDotAllFlag} />
            <Label htmlFor="dotall">Dot All (s)</Label>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="test-string">Test String</Label>
          <Textarea
            id="test-string"
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test against the regex..."
            className="min-h-32"
          />
        </div>

        <div className="space-y-2">
          <Label>Matches ({matches.length})</Label>
          <div className="bg-muted p-4 rounded-md min-h-24 max-h-48 overflow-y-auto">
            {matches.length > 0 ? (
              <ul className="space-y-1">
                {matches.map((match, index) => (
                  <li key={index} className="text-sm">
                    <span className="font-mono">{match}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No matches found</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
