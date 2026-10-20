"use client";

import "@mdxeditor/editor/style.css";
import "./rich-editor.css";
import { useRef, useState } from "react";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  Button,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  MDXEditor,
  NestedLexicalEditor,
  Separator,
  UndoRedo,
  diffSourcePlugin,
  headingsPlugin,
  imagePlugin,
  insertJsx$,
  jsxPlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  useLexicalNodeRemove,
  useMdastNodeUpdater,
  usePublisher,
  type JsxComponentDescriptor,
  type JsxEditorProps,
  type MdastJsx,
} from "@mdxeditor/editor";
import { toast } from "sonner";
import { enviarImagem } from "./preparar-imagem";

// ---------- textos em português ----------

const PT_BR: Record<string, string> = {
  "toolbar.undo": "Desfazer {{shortcut}}",
  "toolbar.redo": "Refazer {{shortcut}}",
  "toolbar.bold": "Negrito",
  "toolbar.removeBold": "Remover negrito",
  "toolbar.italic": "Itálico",
  "toolbar.removeItalic": "Remover itálico",
  "toolbar.bulletedList": "Lista com marcadores",
  "toolbar.numberedList": "Lista numerada",
  "toolbar.link": "Inserir link",
  "toolbar.image": "Inserir imagem",
  "toolbar.table": "Inserir tabela",
  "toolbar.thematicBreak": "Inserir linha divisória",
  "toolbar.richText": "Editor visual",
  "toolbar.source": "Código (avançado)",
  "toolbar.blockTypeSelect.placeholder": "Tipo de texto",
  "toolbar.blockTypeSelect.selectBlockTypeTooltip": "Escolher tipo de texto",
  "toolbar.blockTypes.paragraph": "Parágrafo",
  "toolbar.blockTypes.quote": "Citação",
  "toolbar.blockTypes.heading": "Título {{level}}",
  "createLink.url": "Endereço (URL)",
  "createLink.urlPlaceholder": "Cole o endereço do link",
  "createLink.text": "Texto do link",
  "createLink.textTooltip": "Texto que aparece no artigo",
  "createLink.title": "Título do link",
  "createLink.titleTooltip": "Aparece ao passar o mouse",
  "createLink.saveTooltip": "Salvar link",
  "createLink.cancelTooltip": "Cancelar",
  "linkPreview.edit": "Editar link",
  "linkPreview.remove": "Remover link",
  "linkPreview.copyToClipboard": "Copiar",
  "linkPreview.copied": "Copiado!",
  "dialog.close": "Fechar",
  "dialogControls.save": "Salvar",
  "dialogControls.cancel": "Cancelar",
  "uploadImage.dialogTitle": "Inserir imagem",
  "uploadImage.dialogDescription":
    "Envie uma imagem do computador ou cole o endereço de uma imagem.",
  "uploadImage.uploadInstructions": "Enviar do computador:",
  "uploadImage.addViaUrlInstructions": "Ou use o endereço de uma imagem:",
  "uploadImage.autoCompletePlaceholder": "Endereço da imagem",
  "uploadImage.alt": "Descrição (para quem não enxerga a imagem):",
  "uploadImage.title": "Título:",
  "uploadImage.width": "Largura:",
  "uploadImage.height": "Altura:",
  "imageEditor.editImage": "Editar imagem",
  "imageEditor.deleteImage": "Remover imagem",
  "table.deleteTable": "Remover tabela",
  "table.insertRowAbove": "Inserir linha acima",
  "table.insertRowBelow": "Inserir linha abaixo",
  "table.deleteRow": "Remover linha",
  "table.insertColumnLeft": "Inserir coluna à esquerda",
  "table.insertColumnRight": "Inserir coluna à direita",
  "table.deleteColumn": "Remover coluna",
  "table.rowMenu": "Opções da linha",
  "table.columnMenu": "Opções da coluna",
  "table.textAlignment": "Alinhamento",
  "table.alignLeft": "Esquerda",
  "table.alignCenter": "Centro",
  "table.alignRight": "Direita",
};

/** O H1 é o título do artigo; no texto, os níveis viram nomes que dizem o papel. */
const NIVEIS_DE_TITULO: Record<string, string> = {
  "2": "Título de seção",
  "3": "Subtítulo",
  "4": "Tópico",
};

function traduzir(
  chave: string,
  padrao: string,
  valores?: Record<string, unknown>,
) {
  if (chave === "toolbar.blockTypes.heading") {
    const nome = NIVEIS_DE_TITULO[String(valores?.level)];
    if (nome) return nome;
  }
  let texto = PT_BR[chave] ?? padrao;
  for (const [nome, valor] of Object.entries(valores ?? {})) {
    texto = texto.replace(`{{${nome}}}`, String(valor));
  }
  return texto;
}

// ---------- componentes do blog: Destaque e Figura ----------
// Mesmos nomes e props de components/blog/mdx-components.tsx.

function atributo(no: MdastJsx, nome: string) {
  for (const attr of no.attributes) {
    if (attr.type === "mdxJsxAttribute" && attr.name === nome) {
      return typeof attr.value === "string" ? attr.value : "";
    }
  }
  return "";
}

function useDefinirAtributo(no: MdastJsx) {
  const atualizar = useMdastNodeUpdater<MdastJsx>();
  return (nome: string, valor: string) => {
    const outros = no.attributes.filter(
      (attr) => !(attr.type === "mdxJsxAttribute" && attr.name === nome),
    );
    atualizar({
      attributes: valor
        ? [...outros, { type: "mdxJsxAttribute", name: nome, value: valor }]
        : outros,
    });
  };
}

const TIPOS_DESTAQUE = [
  { valor: "info", rotulo: "Informação (menta)" },
  { valor: "dica", rotulo: "Dica (branco)" },
  { valor: "atencao", rotulo: "Atenção (terracota)" },
];

function DestaqueEditor({ mdastNode }: JsxEditorProps) {
  const definir = useDefinirAtributo(mdastNode);
  const remover = useLexicalNodeRemove();
  const tipo = atributo(mdastNode, "tipo") || "info";

  return (
    <div className={`destaque-editor destaque-${tipo}`}>
      <div className="destaque-editor-barra">
        <input
          className="destaque-editor-titulo"
          placeholder="Título do destaque (opcional)"
          defaultValue={atributo(mdastNode, "titulo")}
          onBlur={(event) => definir("titulo", event.target.value)}
        />
        <select value={tipo} onChange={(event) => definir("tipo", event.target.value)}>
          {TIPOS_DESTAQUE.map((opcao) => (
            <option key={opcao.valor} value={opcao.valor}>
              {opcao.rotulo}
            </option>
          ))}
        </select>
        <button type="button" onClick={remover}>
          Remover
        </button>
      </div>
      <NestedLexicalEditor<MdastJsx>
        block
        getContent={(no) => no.children as never}
        getUpdatedMdastNode={(no, filhos) => ({ ...no, children: filhos as never })}
      />
    </div>
  );
}

function FiguraEditor({ mdastNode }: JsxEditorProps) {
  const definir = useDefinirAtributo(mdastNode);
  const remover = useLexicalNodeRemove();
  const [src, setSrc] = useState(atributo(mdastNode, "src"));

  return (
    <figure className="figura-editor">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {src ? <img src={src} alt={atributo(mdastNode, "alt")} /> : null}
      <div className="figura-editor-campos">
        <label>
          Legenda (aparece embaixo da imagem)
          <input
            defaultValue={atributo(mdastNode, "legenda")}
            onBlur={(event) => definir("legenda", event.target.value)}
          />
        </label>
        <label>
          Descrição da imagem (para quem não enxerga)
          <input
            defaultValue={atributo(mdastNode, "alt")}
            onBlur={(event) => definir("alt", event.target.value)}
          />
        </label>
        <label>
          Endereço da imagem
          <input
            value={src}
            onChange={(event) => setSrc(event.target.value)}
            onBlur={(event) => definir("src", event.target.value)}
          />
        </label>
        <button type="button" onClick={remover}>
          Remover imagem
        </button>
      </div>
    </figure>
  );
}

const descritores: JsxComponentDescriptor[] = [
  {
    name: "Destaque",
    kind: "flow",
    props: [
      { name: "titulo", type: "string" },
      { name: "tipo", type: "string" },
    ],
    hasChildren: true,
    Editor: DestaqueEditor,
  },
  {
    name: "Figura",
    kind: "flow",
    props: [
      { name: "src", type: "string" },
      { name: "alt", type: "string" },
      { name: "legenda", type: "string" },
    ],
    hasChildren: false,
    Editor: FiguraEditor,
  },
];

function BotaoDestaque() {
  const inserir = usePublisher(insertJsx$);
  return (
    <Button
      title="Inserir caixa de destaque"
      onClick={() =>
        inserir({
          name: "Destaque",
          kind: "flow",
          props: { titulo: "Importante", tipo: "info" },
          children: [
            {
              type: "paragraph",
              children: [{ type: "text", value: "Escreva aqui o texto do destaque." }],
            },
          ],
        })
      }
    >
      <span className="botao-texto">+ Destaque</span>
    </Button>
  );
}

function BotaoFigura() {
  const inserir = usePublisher(insertJsx$);
  const entrada = useRef<HTMLInputElement>(null);
  const [enviando, setEnviando] = useState(false);

  async function escolher(arquivo: File) {
    setEnviando(true);
    try {
      const src = await enviarImagem(arquivo);
      inserir({ name: "Figura", kind: "flow", props: { src, alt: "", legenda: "" } });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Erro ao enviar a imagem.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <>
      <Button
        title="Inserir imagem com legenda"
        disabled={enviando}
        onClick={() => entrada.current?.click()}
      >
        <span className="botao-texto">
          {enviando ? "Enviando..." : "+ Imagem com legenda"}
        </span>
      </Button>
      <input
        ref={entrada}
        type="file"
        accept="image/*"
        hidden
        onChange={(event) => {
          const arquivo = event.target.files?.[0];
          if (arquivo) escolher(arquivo);
          event.target.value = "";
        }}
      />
    </>
  );
}

// ---------- editor ----------

type Props = {
  markdown: string;
  onChange: (markdown: string) => void;
};

export default function RichEditor({ markdown, onChange }: Props) {
  const [erro, setErro] = useState<string | null>(null);

  return (
    <div className="rich-editor">
      {erro ? (
        <p className="rich-editor-erro">
          Parte do texto não pôde ser exibida no editor visual. Use o botão
          “Código (avançado)” na barra para corrigir. Detalhe: {erro}
        </p>
      ) : null}
      <MDXEditor
        markdown={markdown}
        onChange={(valor) => onChange(valor)}
        onError={({ error }) => setErro(error)}
        translation={traduzir}
        contentEditableClassName="rich-editor-conteudo"
        plugins={[
          // Título 1 fica de fora: o H1 da página é o título do artigo.
          headingsPlugin({ allowedHeadingLevels: [2, 3, 4] }),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          tablePlugin(),
          imagePlugin({ imageUploadHandler: enviarImagem }),
          jsxPlugin({ jsxComponentDescriptors: descritores }),
          markdownShortcutPlugin(),
          diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: markdown }),
          toolbarPlugin({
            toolbarContents: () => (
              <DiffSourceToggleWrapper options={["rich-text", "source"]}>
                <UndoRedo />
                <Separator />
                <BlockTypeSelect />
                <BoldItalicUnderlineToggles options={["Bold", "Italic"]} />
                <Separator />
                <ListsToggle options={["bullet", "number"]} />
                <Separator />
                <CreateLink />
                <InsertImage />
                <InsertTable />
                <InsertThematicBreak />
                <Separator />
                <BotaoDestaque />
                <BotaoFigura />
              </DiffSourceToggleWrapper>
            ),
          }),
        ]}
      />
    </div>
  );
}
