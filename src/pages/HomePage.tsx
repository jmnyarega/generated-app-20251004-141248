import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { SessionSidebar } from "@/components/SessionSidebar";
import { ChatView } from "@/components/ChatView";
import { cn } from "@/lib/utils";
import { useState } from "react";
export function HomePage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="h-screen w-screen bg-background text-foreground font-sans">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full w-full"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
        }}
      >
        <ResizablePanel
          defaultSize={20}
          minSize={15}
          maxSize={25}
          collapsible
          collapsedSize={0}
          onCollapse={() => setIsCollapsed(true)}
          onExpand={() => setIsCollapsed(false)}
          className={cn("transition-all duration-300 ease-in-out", isCollapsed && "min-w-[0px] w-0")}
        >
          {!isCollapsed && <SessionSidebar />}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80}>
          <ChatView />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}