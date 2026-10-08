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
   later mount starts already showing the site instead of flashing the skeleton.

   `eager` skips the wait entirely. The preview in the work section and on a case
   study is the thing the visitor came to look at, so a skeleton there is a flash
   they would actually see; the hero frames are decoration, and they keep the
   deferred mount.

   `idle` holds off even on watching for the frame until the main thread is free.
   The two small hero frames sit inside the LCP window already, so mounting them
   on the first observer tick put two full concept sites — and their hydration —
   in front of the hero text that the visitor came to read. */
let armed = false;

export default function LazyDemo({
  demo,
  project,
  eager = false,
  idle = false,
}: {
  demo: DemoKey;
  project: Project;
  eager?: boolean;
  idle?: boolean;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(armed || eager);

  useEffect(() => {
    if (show) return;
    let dead = false;
    let io: IntersectionObserver | null = null;

    const watch = () => {
      if (dead) return;
      const el = host.current;
      if (!el || typeof IntersectionObserver === "undefined") {
        setShow(true);
        return;
      }
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            armed = true;
            setShow(true);
            io?.disconnect();
          }
        },
        { rootMargin: "300px 0px" },
      );
      io.observe(el);
    };

    /* The timeout keeps a permanently busy page from never showing the frame. */
    let handle: number | undefined;
    if (idle && typeof requestIdleCallback === "function") {
      handle = requestIdleCallback(watch, { timeout: 2500 });
    } else if (idle) {
      handle = window.setTimeout(watch, 1500);
    } else {
      watch();
    }

    return () => {
      dead = true;
      io?.disconnect();
      if (handle !== undefined) {
        if (typeof cancelIdleCallback === "function") cancelIdleCallback(handle);
        else clearTimeout(handle);
      }
    };
  }, [show, idle]);

  return (
    <div ref={host} className="h-full w-full">
      {show ? <Demo demo={demo} project={project} /> : <DemoSkeleton project={project} />}
    </div>
  );
}
