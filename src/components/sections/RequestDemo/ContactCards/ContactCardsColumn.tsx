import ContactCard from "./ContactCard";
import { REQUEST_DEMO_CONTACT_CARDS } from "./contactCards.constants";
import { contactCardsColumnClassName } from "./contactCard.styles";

export default function ContactCardsColumn() {
  return (
    <aside
      data-request-demo-contact-cards
      aria-label="Canais de contato"
      className={contactCardsColumnClassName}
    >
      {REQUEST_DEMO_CONTACT_CARDS.map((card) => (
        <ContactCard key={card.id} {...card} />
      ))}
    </aside>
  );
}
