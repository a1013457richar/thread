import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import '../globals.css'
export const metadata = {
  title: "Threads",
  description: "a next.js 13 meta threads",
};
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark,
    }}>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
            {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
