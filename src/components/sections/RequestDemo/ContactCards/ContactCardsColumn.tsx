import ContactCard from "./ContactCard";
import type { ContactCardData } from "./contactCards.constants";
import { contactCardsColumnClassName } from "./contactCard.styles";

type ContactCardsColumnProps = {
  label: string;
  cards: readonly ContactCardData[];
};

export default function ContactCardsColumn({
  label,
  cards,
}: Readonly<ContactCardsColumnProps>) {
  return (
    <aside
      data-request-demo-contact-cards
      data-demo-contact-card
      aria-label={label}
      className={contactCardsColumnClassName}
    >
      {cards.map((card) => (
        <ContactCard key={card.id} {...card} />
      ))}
    </aside>
  );
}
