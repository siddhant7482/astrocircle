"use client";

import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import MainNav from "./MainNav";

const Sidebar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Mobile Navigation */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          <div className="h-full flex flex-col">
            <div className="p-6">
              <h2 className="text-xl font-semibold">AstroGuide</h2>
              <p className="text-sm text-muted-foreground">Cosmic Insights</p>
            </div>
            <MainNav />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-col w-72 min-h-screen border-r bg-background">
        <div className="p-6">
          <h2 className="text-xl font-semibold">AstroGuide</h2>
          <p className="text-sm text-muted-foreground">Cosmic Insights</p>
        </div>
        <MainNav />
      </div>
    </>
  );
};

export default Sidebar; 