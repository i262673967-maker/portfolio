import type { ComponentType } from "react";
import type { DemoKey, Project } from "@/lib/data";
import type { DemoProps } from "./_shared";
import ElectricianDemo from "./ElectricianDemo";
import SalonDemo from "./SalonDemo";
import PlumberDemo from "./PlumberDemo";
import RenovationDemo from "./RenovationDemo";
import RestaurantDemo from "./RestaurantDemo";

export const demoRegistry: Record<DemoKey, ComponentType<DemoProps>> = {
  /* Atlas is an editorial studio site, not a service brochure, so it owns a
     layout rather than sharing the local-service one. */
  renovation: RenovationDemo,
  /* FlowRight is a bright concept site, so it gets its own layout rather than
     a recoloured copy of the dark local-service one. */
  plumber: PlumberDemo,
  /* VoltWise is a spec sheet, not a brochure: numbered rows, hairlines and one
     yellow. Nothing reads the local-service layout any more. */
  electrician: ElectricianDemo,
  /* Maison Lune is a soft, light beauty studio — a service menu and a booking
     flow, not a storefront — so it owns its own layout. */
  salon: SalonDemo,
  restaurant: RestaurantDemo,
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
