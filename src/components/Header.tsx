import { Sun, Moon, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Header = () => {
  const [isDark, setIsDark] = useState(true);
  const [showAccountDialog, setShowAccountDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="flex items-center justify-between px-8 py-6 border-b border-border">
      <h1 className="text-2xl font-bold text-accent">GenUI</h1>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="hover:bg-secondary"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover:bg-secondary"
          onClick={() => setShowAccountDialog(true)}
        >
          <User className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover:bg-secondary"
          onClick={() => setShowSettingsDialog(true)}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      <Dialog open={showAccountDialog} onOpenChange={setShowAccountDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Account</DialogTitle>
            <DialogDescription>
              Account management features will be available here.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              App settings and preferences will be available here.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
