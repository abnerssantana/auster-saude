import { AvatarStack } from "@/components/avatar-stack";

type Props = {
  title: string;
  children: React.ReactNode;
};

/** Moldura comum das duas páginas de formulário: título, prova social e o form. */
export function FormPageShell({ title, children }: Props) {
  return (
    <section className="section-dark bg-noise relative isolate overflow-hidden text-cream">
      <div className="relative z-10 px-[5vw] py-[10vw] md:py-16">
        <div className="mx-auto max-w-[1140px]">
          <div className="mx-auto flex max-w-[776px] flex-col gap-6">
            <h1 className="text-center text-[34px] md:text-[44px]">{title}</h1>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <AvatarStack />
              <p className="text-[16px] text-cream/85 md:text-[18px]">
                Centenas de médicos já tomaram essa decisão
              </p>
            </div>

            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
