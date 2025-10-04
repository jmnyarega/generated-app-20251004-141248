import { Info } from 'lucide-react';
export function ApiKeyDisclaimer() {
  return (
    <div className="px-4 py-2 text-xs text-center text-muted-foreground bg-background/50 rounded-lg border border-dashed">
      <Info className="inline-block w-4 h-4 mr-1.5 align-text-bottom" />
      AI features require API keys. After deploying, you must configure your own keys for the AI to function.
    </div>
  );
}