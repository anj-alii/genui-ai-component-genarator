import { useState, useEffect } from "react";
import Header from "@/components/Header";
import GeneratorForm from "@/components/GeneratorForm";
import PreviewPanel from "@/components/PreviewPanel";
import { useToast } from "@/hooks/use-toast";

interface HistoryItem {
  prompt: string;
  framework: string;
  code: string;
  timestamp: number;
}

const Index = () => {
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const { toast } = useToast();

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("genui-history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleGenerate = async (prompt: string, framework: string) => {
    setIsGenerating(true);
    
    try {
      // Get your Gemini API key from https://aistudio.google.com/apikey
      const GEMINI_API_KEY = "AIzaSyBQ617QnssWFdYgrGpluDBiQd5ThlpQjGk";

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Generate a ${framework} component based on this description: ${prompt}. Return ONLY the code without any explanations, markdown formatting, or code block markers. Just the raw HTML/CSS/JS code that can be rendered directly.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      let code = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      
      // Remove markdown code blocks if present
      code = code.replace(/```html\n?/g, '').replace(/```\n?/g, '').trim();
      
      setGeneratedCode(code);
      
      // Save to history
      const newHistoryItem: HistoryItem = {
        prompt,
        framework,
        code,
        timestamp: Date.now(),
      };
      const updatedHistory = [newHistoryItem, ...history].slice(0, 10); // Keep last 10
      setHistory(updatedHistory);
      localStorage.setItem("genui-history", JSON.stringify(updatedHistory));
      
      toast({
        title: "Component Generated!",
        description: "Your component has been generated successfully.",
      });
    } catch (error) {
      console.error("Error generating component:", error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate component. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 border-r border-border overflow-y-auto">
          <GeneratorForm onGenerate={handleGenerate} />
        </div>
        <div className="w-1/2 overflow-y-auto">
          <PreviewPanel code={generatedCode} isGenerating={isGenerating} />
        </div>
      </div>
    </div>
  );
};

export default Index;
