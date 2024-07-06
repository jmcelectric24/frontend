import { BillStateProvider } from "./context"

export default function BillLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <BillStateProvider>

   
        {children}
      </BillStateProvider>
      
    )
  }