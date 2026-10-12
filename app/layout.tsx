import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/store/cart-provider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const vibes = Great_Vibes({
  variable: "--font-vibes",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Pratiksha's Craft",
    template: "%s · Pratiksha's Craft",
  },
  description:
    "Pipe cleaners are more than a craft material — they are a world of creativity. Handmade blooms from Pratiksha's Craft.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${cormorant.variable} ${vibes.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
