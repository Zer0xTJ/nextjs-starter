"use client";
import "tw-elements/dist/css/tw-elements.min.css";
import "./globals.css";

export const metadata = {
  title: "Starter",
  description: "A starter nextjs app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* responsive */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-darker max-h-[100vh] layout-scroll">
        <div>{children}</div>
        <span>Footers</span>
      </body>
    </html>
  );
}
