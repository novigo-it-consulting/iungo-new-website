import OrganizerCapabilityCard from "./OrganizerCapabilityCard";
import { ORGANIZER_CAPABILITIES } from "./organizerCapabilities.constants";

export default function OrganizerCapabilitiesGrid() {
  return (
    <ul className="m-0 grid w-full min-w-0 list-none grid-cols-1 auto-rows-fr gap-4 p-0 md:grid-cols-2 xl:grid-cols-3">
      {ORGANIZER_CAPABILITIES.map((capability) => (
        <OrganizerCapabilityCard
          key={capability.id}
          title={capability.title}
          description={capability.description}
          icon={capability.icon}
        />
      ))}
    </ul>
  );
}
