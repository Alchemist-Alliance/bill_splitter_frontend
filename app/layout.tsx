import { Poppins } from "next/font/google";
import "./globals.css";
import { OfflineHeader } from "@/components";

const poppins = Poppins({ weight: ["600", "700", "900"], subsets: ["latin"] });

export const metadata = {
  title: "Billicious",
  description: "yes daddy ahh, Rawnit madarchod",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col min-w-screen h-screen bg-background ${poppins.className}`}
        suppressHydrationWarning={true}
      >
        <OfflineHeader />
        {children}
      </body>
    </html>
  );
}
