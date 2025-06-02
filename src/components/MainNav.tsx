"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayoutDashboard, FileText } from "lucide-react";

const MainNav = () => {
  const pathname = usePathname();

  const routes = [
    {
      href: `/`,
      label: "Dashboard",
      icon: LayoutDashboard,
      active: pathname === `/`,
    },
    {
      href: `/reports`,
      label: "Reports",
      icon: FileText,
      active: pathname === `/reports`,
    },
  ];

  return (
    <ScrollArea className="my-4 flex-1">
      <div className="flex flex-col gap-2 p-2">
        {routes.map((route) => (
          <Button
            key={route.href}
            asChild
            variant={route.active ? "secondary" : "ghost"}
            className="justify-start gap-2"
          >
            <Link href={route.href}>
              <route.icon className="h-5 w-5" />
              {route.label}
            </Link>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default MainNav; 