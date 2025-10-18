import { Code2, Copy, Loader2, Download, FileCode, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PreviewPanelProps {
  code?: string;
  isGenerating?: boolean;
  onRefine?: () => void;
}

const PreviewPanel = ({ code, isGenerating, onRefine }: PreviewPanelProps) => {
  const { toast } = useToast();

  const copyCode = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      toast({
        title: "Copied!",
        description: "Code copied to clipboard",
      });
    }
  };

  const downloadCode = (format: string) => {
    if (!code) return;
    
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `component.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: `Component saved as .${format}`,
    });
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-background via-card to-background">
        <div className="flex flex-col items-center space-y-6 animate-slide-up">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-accent/20 animate-pulse" />
            <Loader2 className="w-10 h-10 text-accent animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-lg font-medium">Generating your component...</p>
            <p className="text-sm text-muted-foreground">AI is crafting beautiful code</p>
          </div>
        </div>
      </div>
    );
  }

  if (!code) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-background via-card to-background">
        <div className="flex flex-col items-center space-y-4 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/30 to-primary/30 flex items-center justify-center shadow-[var(--shadow-glow)]">
            <Code2 className="w-10 h-10 text-accent" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-lg font-medium">Ready to create</p>
            <p className="text-sm text-muted-foreground">
              Your component & code will appear here
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <Tabs defaultValue="preview" className="flex-1 flex flex-col">
        <div className="border-b border-border px-4 flex items-center justify-between">
          <TabsList className="bg-transparent">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button onClick={copyCode} variant="outline" size="sm" className="hover:bg-accent/10">
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hover:bg-accent/10">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover">
                <DropdownMenuItem onClick={() => downloadCode("html")}>
                  <FileCode className="w-4 h-4 mr-2" />
                  Download as .html
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => downloadCode("txt")}>
                  <FileCode className="w-4 h-4 mr-2" />
                  Download as .txt
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {onRefine && (
              <Button onClick={onRefine} variant="outline" size="sm" className="hover:bg-accent/10">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refine
              </Button>
            )}
          </div>
        </div>
        
        <TabsContent value="preview" className="flex-1 p-4 m-0">
          <div className="w-full h-full bg-background rounded-lg border-2 border-border overflow-hidden shadow-[var(--shadow-elegant)] transition-all duration-300 hover:border-accent/50">
            <iframe
              srcDoc={code}
              title="Component Preview"
              className="w-full h-full border-0"
              sandbox="allow-scripts"
              style={{ minHeight: '600px' }}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="code" className="flex-1 p-4 m-0 flex flex-col">
          <div className="flex-1 bg-muted/50 p-6 rounded-lg border border-border overflow-auto font-mono text-sm backdrop-blur-sm">
            <pre className="text-foreground">
              <code>{code}</code>
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PreviewPanel;
