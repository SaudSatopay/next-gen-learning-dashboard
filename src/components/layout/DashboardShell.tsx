import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { TopBar } from "@/components/layout/TopBar";

/**
 * Top-level responsive shell: sticky sidebar + scrolling main column + mobile
 * bottom nav. Server component — the interactive nav pieces are client islands.
 * The flex layout lets the sidebar collapse without any shared state (main
 * simply reflows).
 */
export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex-1 px-5 pb-28 pt-6 sm:px-8 md:pb-10">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
