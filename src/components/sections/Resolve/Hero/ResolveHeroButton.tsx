import PrimaryLink from "@/components/ui/PrimaryLink";
import { SOLICITAR_DEMONSTRACAO_HREF } from "@/constants/routes";

export default function ResolveHeroButton() {
  return (
    <PrimaryLink href={SOLICITAR_DEMONSTRACAO_HREF}>
      Solicitar Demonstração
    </PrimaryLink>
  );
}
