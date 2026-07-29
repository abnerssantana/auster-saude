"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CtaWhatsapp } from "@/components/cta-whatsapp";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { NAV_LINKS, WHATSAPP_URL } from "@/lib/site";
import logo from "@/public/images/logo-auster.svg";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1140px] items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          aria-label="Auster Saúde — página inicial"
          className="shrink-0"
        >
          <Image
            src={logo}
            alt="Auster Saúde"
            preload
            className="h-[30px] w-auto md:h-[52px]"
          />
        </Link>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            size="lg"
            className="rounded-full px-5 max-sm:h-8 max-sm:px-3 max-sm:text-xs"
            nativeButton={false}
            render={
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            <WhatsappIcon data-icon="inline-start" />
            FALE CONOSCO
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Abrir menu"
              className="flex size-10 items-center justify-center rounded-full text-foreground lg:hidden"
            >
              {open ? <X aria-hidden /> : <Menu aria-hidden />}
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <SheetTitle className="px-5 pt-5 text-brand-800">Menu</SheetTitle>
              <nav aria-label="Navegação principal (mobile)">
                <ul className="flex flex-col gap-1 px-3 pt-4">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto px-5 pb-6">
                <CtaWhatsapp className="w-full" withArrow>
                  Converse com o consultor
                </CtaWhatsapp>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
