import { ReactNode } from "react";
import "../app/globals.css";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <head>
        <title>Supabase Compliance Checker</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
