import type { ComponentType } from "react";
import type { DemoKey, Project } from "@/lib/data";
import type { DemoProps } from "./_shared";
import SalonDemo from "./SalonDemo";
import PlumberDemo from "./PlumberDemo";
import RestaurantDemo from "./RestaurantDemo";
import DentalDemo from "./DentalDemo";

export const demoRegistry: Record<DemoKey, ComponentType<DemoProps>> = {
  /* BlueLine is a bright concept site built from a supplied design, so it gets its
     own layout rather than a recoloured copy of the dark local-service one. */
  plumber: PlumberDemo,
  restaurant: RestaurantDemo,
  /* Maison Lune is a soft, light beauty studio — a service menu and a booking
     flow, not a storefront — so it owns its own layout. */
  salon: SalonDemo,
  /* Rowanwood is a printed leaflet: a status board, a hairline treatment index
     and a two-column section rhythm. It shares nothing with the other three. */
  dental: DentalDemo,
};

/* preview=true (the default) means the concept is shown as a preview inside a
   device frame or card, so it must not own the page's <h1>. Only the standalone
   /demos/[slug] route renders it as the document's main heading. */
export function Demo({
  demo,
  project,
  preview = true,
}: {
  demo: DemoKey;
  project: Project;
  preview?: boolean;
}) {
  const Cmp = demoRegistry[demo];
  return <Cmp project={project} preview={preview} />;
}
