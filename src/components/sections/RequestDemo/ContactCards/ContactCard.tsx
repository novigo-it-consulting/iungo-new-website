import type { ContactCardData } from "./contactCards.constants";
import {
  contactCardBaseClassName,
  contactCardContactClassName,
  contactCardDescriptionClassName,
  contactCardTitleClassName,
  getContactCardVariantClassNames,
} from "./contactCard.styles";

type ContactCardProps = ContactCardData;

export default function ContactCard({
  id,
  variant,
  title,
  contact,
  description,
}: Readonly<ContactCardProps>) {
  const variantClassNames = getContactCardVariantClassNames(variant);

  return (
    <article
      data-request-demo-contact-card={id}
      className={`${contactCardBaseClassName} ${variantClassNames.card}`}
    >
      <h2 className={`${contactCardTitleClassName} ${variantClassNames.title}`}>
        {title}
      </h2>

      <a
        href={contact.href}
        className={`${contactCardContactClassName} ${variantClassNames.contact}`}
      >
        {contact.label}
      </a>

      <p
        className={`${contactCardDescriptionClassName} ${variantClassNames.description}`}
      >
        {description}
      </p>
    </article>
  );
}
