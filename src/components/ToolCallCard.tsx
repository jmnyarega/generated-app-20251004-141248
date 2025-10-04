import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Wrench, Search, Code } from 'lucide-react';
import type { ToolCall } from '../../worker/types';
const getToolIcon = (toolName: string) => {
  if (toolName.toLowerCase().includes('search') || toolName.toLowerCase().includes('browse')) {
    return <Search className="w-4 h-4 text-primary" />;
  }
  if (toolName.toLowerCase().includes('code') || toolName.toLowerCase().includes('run')) {
    return <Code className="w-4 h-4 text-primary" />;
  }
  return <Wrench className="w-4 h-4 text-primary" />;
};
export function ToolCallCard({ toolCall }: { toolCall: ToolCall }) {
  const resultString = JSON.stringify(toolCall.result, null, 2);
  return (
    <Accordion type="single" collapsible className="w-full bg-secondary/50 rounded-lg my-2 border">
      <AccordionItem value={toolCall.id} className="border-b-0">
        <AccordionTrigger className="px-4 py-2 text-sm font-medium hover:no-underline">
          <div className="flex items-center gap-2">
            {getToolIcon(toolCall.name)}
            <span className="font-mono text-primary">{toolCall.name}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-3">
          <pre className="text-xs bg-background p-3 rounded-md overflow-x-auto">
            <code>{resultString}</code>
          </pre>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}