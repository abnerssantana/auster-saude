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

    const observeWithin = (root: ParentNode) => {
      for (const el of root.querySelectorAll("[data-reveal]:not(.is-visible)")) {
        observer.observe(el);
      }
    };
    observeWithin(document);

    /*
     * Este componente vive no layout raiz e não remonta na navegação
     * client-side: a página nova chega como nós inseridos no DOM. Sem isto,
     * quem trocava de página pelo menu via tudo com data-reveal (as imagens,
     * principalmente) preso em opacity 0 até recarregar.
     */
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof Element)) continue;
          if (node.matches("[data-reveal]:not(.is-visible)")) observer.observe(node);
          observeWithin(node);
        }
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
      document.documentElement.removeAttribute("data-reveal-ready");
    };
  }, []);

  return null;
}
