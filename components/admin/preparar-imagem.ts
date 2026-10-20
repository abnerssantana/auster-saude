import { enviarImagemAction } from "@/app/admin/actions";

/** Mais largo que a coluna do artigo (720px) em tela de alta densidade. */
const LARGURA_MAXIMA = 1600;

/** Os mesmos de enviarImagemAction. */
const FORMATOS_ACEITOS = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

function carregar(arquivo: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(arquivo);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("O navegador não conseguiu abrir esta imagem. Use JPG ou PNG."));
    };
    img.src = url;
  });
}

/**
 * Reduz a foto no navegador antes de enviar. Foto de celular passa fácil de
 * 5 MB, acima do que a Vercel aceita numa requisição (4,5 MB) — e do que faz
 * sentido servir num artigo. GIF vai como está, para não perder a animação.
 */
async function preparar(arquivo: File) {
  const img = await carregar(arquivo);
  const { naturalWidth: largura, naturalHeight: altura } = img;

  // HEIC do iPhone e afins: o Safari abre, o servidor não aceita — converte.
  const formatoAceito = FORMATOS_ACEITOS.includes(arquivo.type);
  const pequena = largura <= LARGURA_MAXIMA && arquivo.size <= 1024 * 1024;
  if (arquivo.type === "image/gif" || (pequena && formatoAceito)) {
    return { arquivo, largura, altura };
  }

  const escala = Math.min(1, LARGURA_MAXIMA / largura);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(largura * escala);
  canvas.height = Math.round(altura * escala);
  canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);

  // PNG pode ter transparência; o resto vira JPEG, bem menor para foto.
  const tipo = arquivo.type === "image/png" ? "image/png" : "image/jpeg";
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, tipo, 0.85),
  );
  if (!blob) return { arquivo, largura, altura };

  const nome = arquivo.name.replace(/\.[^.]+$/, tipo === "image/png" ? ".png" : ".jpg");
  return {
    arquivo: new File([blob], nome, { type: tipo }),
    largura: canvas.width,
    altura: canvas.height,
  };
}

/** Reduz, envia e devolve o endereço da imagem no site. Lança com a mensagem para a tela. */
export async function enviarImagem(original: File) {
  const { arquivo, largura, altura } = await preparar(original);

  const dados = new FormData();
  dados.append("imagem", arquivo);
  dados.append("largura", String(largura));
  dados.append("altura", String(altura));

  const resultado = await enviarImagemAction(dados);
  if (!resultado.url) throw new Error(resultado.erro ?? "Erro ao enviar a imagem.");
  return resultado.url;
}
