// import "./globals.css";
import { Providers } from "@/app/providers";

export const metadata = {
  title: "Inventory Dashboard POC",
  description: "POC using Next.js, TS, TanStack Query & Table",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
