import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Lightbulb, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GeneratorFormProps {
  onGenerate: (prompt: string, framework: string) => void;
}

const allPrompts = [
  "Modern pricing card with gradient background",
  "Responsive hero section with animated text",
  "Feature grid with icons and hover effects",
  "Contact form with validation styling",
  "Animated navigation menu with dropdown",
  "Blog card with image and tags",
  "Testimonial slider with ratings",
  "FAQ accordion with smooth animations",
  "Product showcase with zoom effect",
  "Newsletter signup with gradient button",
  "Team member grid with social links",
  "Statistics counter with icons",
  "Timeline component with milestones",
  "Image gallery with lightbox",
  "Login form with social auth buttons",
  "Dashboard card with chart placeholder",
];

const GeneratorForm = ({ onGenerate }: GeneratorFormProps) => {
  const [framework, setFramework] = useState("html-css");
  const [prompt, setPrompt] = useState("");
  const [examplePrompts, setExamplePrompts] = useState<string[]>([]);

  useEffect(() => {
    // Shuffle and select 4 random prompts on mount
    const shuffled = [...allPrompts].sort(() => Math.random() - 0.5);
    setExamplePrompts(shuffled.slice(0, 4));
  }, []);

  const handleGenerate = () => {
    if (prompt.trim()) {
      onGenerate(prompt, framework);
    }
  };

  const handleClear = () => {
    setPrompt("");
  };

  const useExample = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="flex flex-col h-full p-8 space-y-6 animate-fade-in">
      <div className="space-y-3">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
          AI Component Generator
        </h2>
        <p className="text-muted-foreground">
          Describe your component and let AI code it for you instantly.
        </p>
      </div>

      <div className="space-y-4 flex-1">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-accent" />
            Example Prompts
          </label>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((example, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="cursor-pointer hover:bg-accent/10 hover:border-accent transition-all duration-200"
                onClick={() => useExample(example)}
              >
                {example}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Framework</label>
          <Select value={framework} onValueChange={setFramework}>
            <SelectTrigger className="bg-input border-border hover:border-accent/50 transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="html-css">HTML + CSS</SelectItem>
              <SelectItem value="html-tailwind">HTML + Tailwind CSS</SelectItem>
              <SelectItem value="html-bootstrap">HTML + Bootstrap</SelectItem>
              <SelectItem value="html-css-js">HTML + CSS + JS</SelectItem>
              <SelectItem value="html-tailwind-bootstrap">
                HTML + Tailwind + Bootstrap
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 flex-1 flex flex-col">
          <label className="text-sm font-medium">Describe your component</label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., Create a modern pricing table with three tiers, gradient backgrounds, and animated hover effects..."
            className="flex-1 min-h-[300px] bg-input border-border resize-none focus:border-accent/50 transition-colors"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleClear}
          variant="outline"
          className="flex-1 h-14 text-lg border-border hover:border-destructive hover:text-destructive transition-all"
          disabled={!prompt}
        >
          <Trash2 className="mr-2 h-5 w-5" />
          Clear
        </Button>
        <Button
          onClick={handleGenerate}
          className="flex-[2] h-14 text-lg bg-gradient-to-r from-accent to-primary hover:shadow-[var(--shadow-glow)] transition-all duration-300"
          disabled={!prompt.trim()}
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Generate
        </Button>
      </div>
    </div>
  );
};

export default GeneratorForm;
