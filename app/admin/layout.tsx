import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Painel do blog", template: "%s | Painel do blog" },
  robots: { index: false, follow: false },
};

/** Header, rodapé e WhatsApp do site somem aqui (ver SiteChrome no layout raiz). */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#f4f4e6]">{children}</div>;
}
