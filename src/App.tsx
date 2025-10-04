import { HomePage } from '@/pages/HomePage';
import { Toaster } from "@/components/ui/sonner"
function App() {
  return (
    <>
      <HomePage />
      <Toaster richColors theme="system" />
    </>
  )
}
export default App;