"use client";

import { useEffect, useRef, useState } from "react";
import { Demo } from "@/demos";
import DemoSkeleton from "./DemoSkeleton";
import type { DemoKey, Project } from "@/lib/data";

/* A concept website inside a device frame is decoration until someone looks at
   it, and prerendering four of them put ~110 KB of borrowed markup and dozens of
   borrowed headings on the homepage. The frame ships as a palette skeleton, and
   the real site is mounted only once that frame is close to the viewport — so a
   phone never renders the off-screen frames at all.

   `armed` is module-level because switching project or device re-keys the frame
   and remounts this component. Once the visitor has looked at one preview, every
   later mount starts already showing the site instead of flashing the skeleton. */
let armed = false;

export default function LazyDemo({ demo, project }: { demo: DemoKey; project: Project }) {
  const host = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(armed);

  useEffect(() => {
    if (show) return;
    const el = host.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          armed = true;
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show]);

  return (
    <div ref={host} className="h-full w-full">
      {show ? <Demo demo={demo} project={project} /> : <DemoSkeleton project={project} />}
    </div>
  );
}
