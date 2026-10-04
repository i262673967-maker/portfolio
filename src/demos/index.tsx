import type { ComponentType } from "react";
import type { DemoKey, Project } from "@/lib/data";
import type { DemoProps } from "./_shared";
import LocalServiceDemo from "./LocalServiceDemo";
import EcommerceDemo from "./EcommerceDemo";
import PlumberDemo from "./PlumberDemo";
import RestaurantDemo from "./RestaurantDemo";

export const demoRegistry: Record<DemoKey, ComponentType<DemoProps>> = {
  renovation: LocalServiceDemo,
  /* FlowRight is a bright concept site, so it gets its own layout rather than
     a recoloured copy of the dark local-service one. */
  plumber: PlumberDemo,
  electrician: LocalServiceDemo,
  ecommerce: EcommerceDemo,
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
