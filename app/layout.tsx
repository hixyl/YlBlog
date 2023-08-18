import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/public/gradient-dark.min.css";
import Global from "@/components/Global/global";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "流年石刻",
  description: "流年似水,石刻永恒",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <link
        rel="icon"
        href="/favicon.png?<generated>"
        type="image/<generated>"
        sizes="<generated>"
      />
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-N3DJ3JTVT2" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-N3DJ3JTVT2');
        `}
      </Script>
      <body className={inter.className}>
        {children}
        <Global />
      </body>
    </html>
  );
}
