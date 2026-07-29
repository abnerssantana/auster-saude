import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import { SOCIAL_PROOF } from "@/lib/content";

/** Avatares sobrepostos da prova social ("centenas de médicos..."). */
export function AvatarStack({ className }: { className?: string }) {
  return (
    <AvatarGroup className={className}>
      {SOCIAL_PROOF.avatars.map((src) => (
        <Avatar key={src} size="lg" className="md:size-12">
          <AvatarImage src={src} alt="" />
          <AvatarFallback>Dr</AvatarFallback>
        </Avatar>
      ))}
    </AvatarGroup>
  );
}
