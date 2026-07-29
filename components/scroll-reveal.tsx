"use client";

import { useEffect } from "react";

/**
 * Revela os elementos marcados com data-reveal conforme entram na viewport.
 * Substitui o Lenis + script inline do Elementor: sem dependência externa e
 * sem sequestrar o scroll nativo.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // só esconde o conteúdo depois que o JS assume — sem JS, tudo fica visível
    document.documentElement.setAttribute("data-reveal-ready", "");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );

    for (const el of document.querySelectorAll("[data-reveal]")) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
      document.documentElement.removeAttribute("data-reveal-ready");
    };
  }, []);

  return null;
}
