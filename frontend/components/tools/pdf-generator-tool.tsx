"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, Download, Plus, Trash2, MoveUp, MoveDown, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"

// Define the schema for PDF settings
const pdfSettingsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().optional(),
  pageSize: z.string().default("A4"),
  orientation: z.string().default("portrait"),
  margins: z.object({
    top: z.number().min(0).max(100).default(40),
    right: z.number().min(0).max(100).default(40),
    bottom: z.number().min(0).max(100).default(40),
    left: z.number().min(0).max(100).default(40),
  }),
  headerEnabled: z.boolean().default(false),
  footerEnabled: z.boolean().default(false),
  headerText: z.string().optional(),
  footerText: z.string().optional(),
})

// Define the schema for content blocks
const contentBlockSchema = z.object({
  id: z.string(),
  type: z.enum(["text", "heading", "image", "table", "code", "html"]),
  content: z.string(),
  options: z.record(z.any()).optional(),
})

// Define the types based on the schemas
type PdfSettings = z.infer<typeof pdfSettingsSchema>
type ContentBlock = z.infer<typeof contentBlockSchema>

export function PdfGeneratorTool() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([
    {
      id: "block-1",
      type: "heading",
      content: "Document Title",
      options: { level: 1 },
    },
    {
      id: "block-2",
      type: "text",
      content: "This is a sample paragraph. Edit or replace this text with your content.",
      options: {},
    },
  ])
  const [activeTab, setActiveTab] = useState("content")

  // Initialize the form with default values
  const form = useForm<PdfSettings>({
    resolver: zodResolver(pdfSettingsSchema),
    defaultValues: {
      title: "Untitled Document",
      author: "",
      pageSize: "A4",
      orientation: "portrait",
      margins: {
        top: 40,
        right: 40,
        bottom: 40,
        left: 40,
      },
      headerEnabled: false,
      footerEnabled: false,
      headerText: "",
      footerText: "",
    },
  })

  // Function to add a new content block
  const addContentBlock = (type: ContentBlock["type"]) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type,
      content: "",
      options: {},
    }

    // Set default content based on type
    switch (type) {
      case "heading":
        newBlock.content = "New Heading"
        newBlock.options = { level: 2 }
        break
      case "text":
        newBlock.content = "New paragraph text..."
        break
      case "code":
        newBlock.content = "// Your code here"
        newBlock.options = { language: "javascript" }
        break
      case "html":
        newBlock.content = "<div>Custom HTML content</div>"
        break
      case "table":
        newBlock.content = JSON.stringify([
          ["Header 1", "Header 2", "Header 3"],
          ["Row 1, Cell 1", "Row 1, Cell 2", "Row 1, Cell 3"],
          ["Row 2, Cell 1", "Row 2, Cell 2", "Row 2, Cell 3"],
        ])
        break
      case "image":
        newBlock.content = ""
        newBlock.options = { alt: "Image description", width: 400 }
        break
    }

    setContentBlocks([...contentBlocks, newBlock])
  }

  // Function to update a content block
  const updateContentBlock = (id: string, data: Partial<ContentBlock>) => {
    setContentBlocks(contentBlocks.map((block) => (block.id === id ? { ...block, ...data } : block)))
  }

  // Function to remove a content block
  const removeContentBlock = (id: string) => {
    setContentBlocks(contentBlocks.filter((block) => block.id !== id))
  }

  // Function to move a block up or down
  const moveBlock = (id: string, direction: "up" | "down") => {
    const index = contentBlocks.findIndex((block) => block.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === contentBlocks.length - 1)) {
      return
    }

    const newBlocks = [...contentBlocks]
    const newIndex = direction === "up" ? index - 1 : index + 1
    const [movedBlock] = newBlocks.splice(index, 1)
    newBlocks.splice(newIndex, 0, movedBlock)
    setContentBlocks(newBlocks)
  }

  // Function to generate the PDF
  const generatePdf = async () => {
    try {
      setIsGenerating(true)
      setPdfUrl(null)

      const settings = form.getValues()

      const response = await fetch("/api/tools/pdf-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          settings,
          contentBlocks,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate PDF")
      }

      const data = await response.json()
      setPdfUrl(data.pdfUrl)
      toast.success("PDF generated successfully!")
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast.error("Failed to generate PDF. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  // Render content block based on type
  const renderContentBlock = (block: ContentBlock) => {
    switch (block.type) {
      case "heading":
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Select
                value={String(block.options?.level || 1)}
                onValueChange={(value) =>
                  updateContentBlock(block.id, {
                    options: { ...block.options, level: Number(value) },
                  })
                }
              >
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">H1</SelectItem>
                  <SelectItem value="2">H2</SelectItem>
                  <SelectItem value="3">H3</SelectItem>
                  <SelectItem value="4">H4</SelectItem>
                </SelectContent>
              </Select>
              <Input
                value={block.content}
                onChange={(e) => updateContentBlock(block.id, { content: e.target.value })}
                placeholder="Heading text"
                className="flex-1"
              />
            </div>
          </div>
        )

      case "text":
        return (
          <Textarea
            value={block.content}
            onChange={(e) => updateContentBlock(block.id, { content: e.target.value })}
            placeholder="Enter your text here..."
            className="min-h-[100px]"
          />
        )

      case "code":
        return (
          <div className="space-y-2">
            <Select
              value={block.options?.language || "javascript"}
              onValueChange={(value) =>
                updateContentBlock(block.id, {
                  options: { ...block.options, language: value },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="php">PHP</SelectItem>
                <SelectItem value="ruby">Ruby</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
                <SelectItem value="swift">Swift</SelectItem>
                <SelectItem value="kotlin">Kotlin</SelectItem>
                <SelectItem value="sql">SQL</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
                <SelectItem value="css">CSS</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="xml">XML</SelectItem>
                <SelectItem value="markdown">Markdown</SelectItem>
                <SelectItem value="bash">Bash</SelectItem>
                <SelectItem value="plaintext">Plain Text</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              value={block.content}
              onChange={(e) => updateContentBlock(block.id, { content: e.target.value })}
              placeholder="// Your code here"
              className="min-h-[150px] font-mono text-sm"
            />
          </div>
        )

      case "html":
        return (
          <Textarea
            value={block.content}
            onChange={(e) => updateContentBlock(block.id, { content: e.target.value })}
            placeholder="<div>Your HTML here</div>"
            className="min-h-[150px] font-mono text-sm"
          />
        )

      case "table":
        return (
          <Textarea
            value={block.content}
            onChange={(e) => updateContentBlock(block.id, { content: e.target.value })}
            placeholder='[["Header 1", "Header 2"], ["Cell 1", "Cell 2"]]'
            className="min-h-[150px] font-mono text-sm"
          />
        )

      case "image":
        return (
          <div className="space-y-2">
            <Input
              value={block.content}
              onChange={(e) => updateContentBlock(block.id, { content: e.target.value })}
              placeholder="Image URL"
            />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor={`${block.id}-alt`}>Alt Text</Label>
                <Input
                  id={`${block.id}-alt`}
                  value={block.options?.alt || ""}
                  onChange={(e) =>
                    updateContentBlock(block.id, {
                      options: { ...block.options, alt: e.target.value },
                    })
                  }
                  placeholder="Image description"
                />
              </div>
              <div>
                <Label htmlFor={`${block.id}-width`}>Width (px)</Label>
                <Input
                  id={`${block.id}-width`}
                  type="number"
                  value={block.options?.width || 400}
                  onChange={(e) =>
                    updateContentBlock(block.id, {
                      options: { ...block.options, width: Number(e.target.value) },
                    })
                  }
                  placeholder="Width in pixels"
                />
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="container py-6 space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">PDF Generator</h1>
        <p className="text-muted-foreground">
          Create customized PDF documents with various content types and formatting options.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="settings">Document Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4 pt-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => addContentBlock("heading")}>
                  <Plus className="h-4 w-4 mr-1" /> Heading
                </Button>
                <Button variant="outline" size="sm" onClick={() => addContentBlock("text")}>
                  <Plus className="h-4 w-4 mr-1" /> Text
                </Button>
                <Button variant="outline" size="sm" onClick={() => addContentBlock("image")}>
                  <Plus className="h-4 w-4 mr-1" /> Image
                </Button>
                <Button variant="outline" size="sm" onClick={() => addContentBlock("table")}>
                  <Plus className="h-4 w-4 mr-1" /> Table
                </Button>
                <Button variant="outline" size="sm" onClick={() => addContentBlock("code")}>
                  <Plus className="h-4 w-4 mr-1" /> Code
                </Button>
                <Button variant="outline" size="sm" onClick={() => addContentBlock("html")}>
                  <Plus className="h-4 w-4 mr-1" /> HTML
                </Button>
              </div>

              <div className="space-y-4">
                {contentBlocks.map((block, index) => (
                  <Card key={block.id}>
                    <CardHeader className="py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium capitalize">{block.type}</span>
                          <span className="text-xs text-muted-foreground">Block {index + 1}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveBlock(block.id, "up")}
                            disabled={index === 0}
                          >
                            <MoveUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveBlock(block.id, "down")}
                            disabled={index === contentBlocks.length - 1}
                          >
                            <MoveDown className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => removeContentBlock(block.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>{renderContentBlock(block)}</CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="pt-4">
              <Form {...form}>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Document Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Untitled Document" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="author"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Author</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="pageSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Page Size</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select page size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="A4">A4</SelectItem>
                              <SelectItem value="Letter">Letter</SelectItem>
                              <SelectItem value="Legal">Legal</SelectItem>
                              <SelectItem value="Tabloid">Tabloid</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="orientation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Orientation</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select orientation" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="portrait">Portrait</SelectItem>
                              <SelectItem value="landscape">Landscape</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Margins</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="margins.top"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Top Margin (mm)</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <Slider
                                  min={0}
                                  max={100}
                                  step={1}
                                  value={[field.value]}
                                  onValueChange={(value) => field.onChange(value[0])}
                                />
                                <span className="w-10 text-right">{field.value}</span>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="margins.right"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Right Margin (mm)</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <Slider
                                  min={0}
                                  max={100}
                                  step={1}
                                  value={[field.value]}
                                  onValueChange={(value) => field.onChange(value[0])}
                                />
                                <span className="w-10 text-right">{field.value}</span>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="margins.bottom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bottom Margin (mm)</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <Slider
                                  min={0}
                                  max={100}
                                  step={1}
                                  value={[field.value]}
                                  onValueChange={(value) => field.onChange(value[0])}
                                />
                                <span className="w-10 text-right">{field.value}</span>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="margins.left"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Left Margin (mm)</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <Slider
                                  min={0}
                                  max={100}
                                  step={1}
                                  value={[field.value]}
                                  onValueChange={(value) => field.onChange(value[0])}
                                />
                                <span className="w-10 text-right">{field.value}</span>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="headerEnabled"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Header</FormLabel>
                              <FormDescription>Add a header to each page</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="footerEnabled"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Footer</FormLabel>
                              <FormDescription>Add a footer to each page</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    {form.watch("headerEnabled") && (
                      <FormField
                        control={form.control}
                        name="headerText"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Header Text</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Header text (supports variables: {pageNumber}, {totalPages}, {title})"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              You can use {"{pageNumber}"}, {"{totalPages}"}, and {"{title}"} as variables
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {form.watch("footerEnabled") && (
                      <FormField
                        control={form.control}
                        name="footerText"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Footer Text</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Footer text (supports variables: {pageNumber}, {totalPages}, {title})"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              You can use {"{pageNumber}"}, {"{totalPages}"}, and {"{title}"} as variables
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </form>
              </Form>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end">
            <Button onClick={generatePdf} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Generate PDF
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>PDF Preview</CardTitle>
              <CardDescription>Generated PDF will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              {pdfUrl ? (
                <div className="space-y-4">
                  <div className="aspect-[1/1.414] bg-muted rounded-md flex items-center justify-center overflow-hidden">
                    <iframe src={pdfUrl} className="w-full h-full" title="PDF Preview" />
                  </div>
                  <Button className="w-full" asChild>
                    <a href={pdfUrl} download="document.pdf">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </a>
                  </Button>
                </div>
              ) : (
                <div className="aspect-[1/1.414] bg-muted rounded-md flex items-center justify-center">
                  <div className="text-center p-4">
                    <FileText className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {isGenerating ? "Generating PDF..." : "Click 'Generate PDF' to create your document"}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
