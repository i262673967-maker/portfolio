"use client";

import { useSyncExternalStore } from "react";
import { Demo } from "@/demos";
import DemoSkeleton from "./DemoSkeleton";
import type { DemoKey, Project } from "@/lib/data";

const neverSubscribes = () => () => {};
const onClient = () => true;
const onServer = () => false;

/* A concept website inside a device frame is decoration until someone looks at
   it, and prerendering four of them put ~110 KB of borrowed markup and dozens of
   borrowed headings on the homepage. The frame ships as a palette skeleton and
   the real site renders on the client, so switching project or device never
   shows the skeleton again. */
export default function LazyDemo({ demo, project }: { demo: DemoKey; project: Project }) {
  const show = useSyncExternalStore(neverSubscribes, onClient, onServer);
  return show ? <Demo demo={demo} project={project} /> : <DemoSkeleton project={project} />;
}
