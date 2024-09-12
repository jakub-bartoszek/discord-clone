import "./globals.css";

import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Open_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { QueryProvider } from "@/components/providers/query-provider";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
 title: "Discord clone",
 description:
  "Connect, chat, and collaborate seamlessly with a powerful Discord clone built with Next.js 14. Join servers, engage in real-time conversations, and customize your experience to suit your community's needs. Available on desktop and mobile.",
 icons: {
  icon: "/discord-icon.png"
 }
};

export default function RootLayout({
 children
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <ClerkProvider>
   <html
    lang="en"
    suppressHydrationWarning
   >
    <body
     className={cn(
      font.className,
      "bg-gradient-to-bl from-[#2a0a51] to-[#150d26] text-white"
     )}
    >
     <SocketProvider>
      <ModalProvider />
      <QueryProvider>{children}</QueryProvider>
     </SocketProvider>
    </body>
   </html>
  </ClerkProvider>
 );
}
