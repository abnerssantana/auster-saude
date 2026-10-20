"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import { ArrowLeft, ExternalLink, Eye, ImagePlus, Save } from "lucide-react";
import { toast } from "sonner";
import { salvarPostAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AUTORES, CATEGORIAS, slugify } from "@/lib/blog/config";
import type { Post } from "@/lib/blog/posts";
import { ajudaClass, campoClass, painelClass, rotuloClass } from "./estilos";
import { enviarImagem } from "./preparar-imagem";

// O editor visual só roda no navegador.
const RichEditor = dynamic(() => import("./rich-editor"), {
  ssr: false,
  loading: () => (
    <div className="h-[580px] animate-pulse rounded-md border border-input bg-card" />
  ),
});

const LIMITE_RESUMO = 160;

function hojeNoNavegador() {
  return new Intl.DateTimeFormat("en-CA").format(new Date());
}

type Props = {
  post: Post;
  novo?: boolean;
  criado?: boolean;
};

export function PostEditor({ post, novo = false, criado = false }: Props) {
  const [estado, salvar, salvando] = useActionState(salvarPostAction, undefined);

  const [titulo, setTitulo] = useState(post.titulo);
  const [slug, setSlug] = useState(post.slug);
  const [slugManual, setSlugManual] = useState(!novo);
  const [resumo, setResumo] = useState(post.resumo);
  const [status, setStatus] = useState(post.status);
  const [data, setData] = useState(post.data);
  const [capa, setCapa] = useState(post.capa);
  const [corpo, setCorpo] = useState(post.corpo);
  const [enviandoCapa, setEnviandoCapa] = useState(false);
  const [sujo, setSujo] = useState(false);

  // Versão e situação voltam a cada gravação; a versão é o que detecta
  // edição simultânea.
  const versao = estado?.versao ?? post.versao;
  const statusSalvo = estado?.status ?? post.status;

  useEffect(() => {
    if (criado) toast.success("Artigo criado.");
  }, [criado]);

  // Gravou: some o aviso de alterações não salvas. Ajuste feito na
  // renderização (e não num efeito) quando chega um resultado novo da action.
  const [estadoVisto, setEstadoVisto] = useState(estado);
  if (estado !== estadoVisto) {
    setEstadoVisto(estado);
    if (estado?.ok) setSujo(false);
  }

  useEffect(() => {
    if (estado?.ok) toast.success(estado.ok);
    if (estado?.erro) toast.error(estado.erro, { duration: 10000 });
  }, [estado]);

  // Fechar a aba com texto não salvo pede confirmação.
  useEffect(() => {
    if (!sujo) return;
    const avisar = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", avisar);
    return () => window.removeEventListener("beforeunload", avisar);
  }, [sujo]);

  async function trocarCapa(arquivo: File) {
    setEnviandoCapa(true);
    try {
      setCapa(await enviarImagem(arquivo));
      setSujo(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao enviar a imagem.");
    } finally {
      setEnviandoCapa(false);
    }
  }

  return (
    <form
      // Envio manual: com `action` direto, o React limpa o formulário depois
      // de salvar e o texto sumiria da tela.
      onSubmit={(event) => {
        event.preventDefault();
        const dados = new FormData(event.currentTarget);
        startTransition(() => salvar(dados));
      }}
      onChange={() => setSujo(true)}
      className="mx-auto max-w-[1140px] px-5 py-8"
    >
      <input type="hidden" name="versao" value={novo ? "" : versao} />
      <input type="hidden" name="corpo" value={corpo} />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            aria-label="Voltar para a lista"
            className="flex size-9 items-center justify-center rounded-full text-brand-800/70 transition-colors hover:bg-muted hover:text-brand-800"
          >
            <ArrowLeft aria-hidden className="size-5" />
          </Link>
          <h1 className="text-[28px] text-brand-800">
            {novo ? "Novo artigo" : "Editar artigo"}
          </h1>
          {sujo ? (
            <span className="text-xs text-muted-foreground">Alterações não salvas</span>
          ) : null}
        </div>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex flex-col gap-5">
          <div>
            <label htmlFor="titulo" className={rotuloClass}>
              Título
            </label>
            <input
              id="titulo"
              name="titulo"
              required
              value={titulo}
              onChange={(event) => {
                setTitulo(event.target.value);
                if (!slugManual) setSlug(slugify(event.target.value));
              }}
              placeholder="Ex.: Como médico PJ paga menos imposto de forma legal"
              className={`${campoClass} font-heading text-[22px] font-semibold`}
            />
          </div>

          <div>
            <label htmlFor="resumo" className={rotuloClass}>
              Resumo
            </label>
            <textarea
              id="resumo"
              name="resumo"
              rows={3}
              value={resumo}
              onChange={(event) => setResumo(event.target.value)}
              placeholder="Uma ou duas frases sobre o que o leitor vai aprender."
              className={campoClass}
            />
            <p
              className={
                resumo.length > LIMITE_RESUMO
                  ? `${ajudaClass} text-clay!`
                  : ajudaClass
              }
            >
              Aparece no Google, nos cards do blog e no topo do artigo.{" "}
              {resumo.length}/{LIMITE_RESUMO} caracteres
              {resumo.length > LIMITE_RESUMO ? " — o Google corta o excedente." : "."}
            </p>
          </div>

          <div>
            <p className={rotuloClass}>Texto</p>
            <RichEditor
              markdown={post.corpo}
              onChange={(valor) => {
                setCorpo(valor);
                if (valor.trim() !== post.corpo.trim()) setSujo(true);
              }}
            />
            <p className={ajudaClass}>
              Use a barra para títulos de seção, negrito, listas, links, imagens,
              tabelas e caixas de destaque.
            </p>
          </div>
        </div>

        <aside className="flex flex-col gap-4 lg:sticky lg:top-20">
          <div className={`${painelClass} flex flex-col gap-4`}>
            <div>
              <label htmlFor="status" className={rotuloClass}>
                Situação
              </label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={(event) => {
                  const novoStatus = event.target.value as Post["status"];
                  setStatus(novoStatus);
                  // Publicar um rascunho é publicar hoje.
                  if (novoStatus === "publicado" && statusSalvo === "rascunho") {
                    setData(hojeNoNavegador());
                  }
                }}
                className={campoClass}
              >
                <option value="rascunho">Rascunho — só no painel</option>
                <option value="publicado">Publicado — visível no site</option>
              </select>
            </div>

            <Button type="submit" size="xl" disabled={salvando || enviandoCapa} className="w-full">
              {salvando ? (
                <Spinner data-icon="inline-start" aria-hidden />
              ) : (
                <Save data-icon="inline-start" aria-hidden />
              )}
              {salvando
                ? "Salvando..."
                : status === "rascunho"
                  ? "Salvar rascunho"
                  : statusSalvo === "publicado"
                    ? "Salvar alterações"
                    : "Publicar"}
            </Button>

            {!novo ? (
              statusSalvo === "publicado" ? (
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  <ExternalLink aria-hidden className="size-4" /> Ver no site
                </Link>
              ) : (
                <Link
                  href={`/admin/posts/${post.slug}/previa`}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  <Eye aria-hidden className="size-4" /> Prévia (versão salva)
                </Link>
              )
            ) : null}
          </div>

          <div className={`${painelClass} flex flex-col gap-4`}>
            <div>
              <label htmlFor="slug" className={rotuloClass}>
                Endereço
              </label>
              <input
                id="slug"
                name="slug"
                required
                value={slug}
                readOnly={!novo}
                onChange={(event) => {
                  setSlugManual(true);
                  setSlug(slugify(event.target.value));
                }}
                className={novo ? campoClass : `${campoClass} bg-muted text-muted-foreground`}
              />
              <p className={`${ajudaClass} break-all`}>
                /blog/{slug || "…"}
                {novo ? "" : " — não muda depois de criado, para não quebrar links."}
              </p>
            </div>

            <div>
              <label htmlFor="data" className={rotuloClass}>
                Data de publicação
              </label>
              <input
                id="data"
                name="data"
                type="date"
                required
                value={data}
                onChange={(event) => setData(event.target.value)}
                className={campoClass}
              />
            </div>

            <div>
              <label htmlFor="categoria" className={rotuloClass}>
                Categoria
              </label>
              <select
                id="categoria"
                name="categoria"
                required
                defaultValue={post.categoria}
                className={campoClass}
              >
                <option value="" disabled>
                  Escolha…
                </option>
                {CATEGORIAS.map((categoria) => (
                  <option key={categoria.slug} value={categoria.slug}>
                    {categoria.nome}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="autor" className={rotuloClass}>
                Assinado por
              </label>
              <select id="autor" name="autor" defaultValue={post.autor} className={campoClass}>
                {AUTORES.map((autor) => (
                  <option key={autor.id} value={autor.id}>
                    {autor.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={`${painelClass} flex flex-col gap-3`}>
            <p className={rotuloClass}>Imagem de capa</p>
            {capa ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={capa}
                alt=""
                className="aspect-[16/9] w-full rounded-lg bg-muted object-cover"
              />
            ) : (
              <p className="text-xs text-muted-foreground">
                Sem capa, o card do artigo usa o fundo verde da marca.
              </p>
            )}
            <input type="hidden" name="capa" value={capa} />
            <label
              className={`inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-input bg-background text-sm font-semibold text-brand-800 transition-colors hover:bg-muted ${enviandoCapa ? "pointer-events-none opacity-60" : ""}`}
            >
              {enviandoCapa ? <Spinner aria-hidden /> : <ImagePlus aria-hidden className="size-4" />}
              {enviandoCapa ? "Enviando..." : capa ? "Trocar imagem" : "Enviar imagem"}
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                disabled={enviandoCapa}
                onChange={(event) => {
                  const arquivo = event.target.files?.[0];
                  if (arquivo) trocarCapa(arquivo);
                  event.target.value = "";
                }}
              />
            </label>
            {capa ? (
              <>
                <div>
                  <label htmlFor="capaAlt" className={rotuloClass}>
                    Descrição da imagem
                  </label>
                  <input
                    id="capaAlt"
                    name="capaAlt"
                    defaultValue={post.capaAlt}
                    placeholder="Ex.: Médica analisando planilha de impostos"
                    className={campoClass}
                  />
                  <p className={ajudaClass}>
                    Lida por quem não enxerga a imagem e pelo Google.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCapa("");
                    setSujo(true);
                  }}
                  className="self-start text-xs font-semibold text-destructive hover:underline"
                >
                  Remover capa
                </button>
              </>
            ) : (
              <input type="hidden" name="capaAlt" value="" />
            )}
          </div>
        </aside>
      </div>
    </form>
  );
}
