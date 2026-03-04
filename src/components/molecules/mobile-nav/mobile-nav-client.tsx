"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

type NavItem = {
  uid: string;
  name: string;
  url_path: string;
  children: NavItem[];
};

export function MobileNavClient({ navItems }: { navItems: NavItem[] }) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {},
  );

  const toggleItem = (uid: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [uid]: !prev[uid],
    }));
  };

  return (
    <nav className="flex flex-col">
      {navItems.map((item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedItems[item.uid];

        return (
          <div key={item.uid} className="border-b border-border/50">
            <div className="flex items-center justify-between py-4 px-6">
              <Link
                href={`/${item.url_path}`}
                className="text-base font-medium flex-1"
              >
                {item.name}
              </Link>
              {hasChildren && (
                <button
                  onClick={() => toggleItem(item.uid)}
                  className="p-2 -mr-2 text-muted-foreground"
                  aria-label="Toggle sub-menu"
                >
                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
              )}
            </div>
            {hasChildren && isExpanded && (
              <div className="bg-accent/10 pb-4 px-6 flex flex-col gap-4">
                {item.children.map((child: NavItem) => (
                  <Link
                    key={child.uid}
                    href={`/${child.url_path}`}
                    className="text-sm font-medium text-foreground/70 hover:text-foreground pl-4 border-l-2 border-border/50"
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
