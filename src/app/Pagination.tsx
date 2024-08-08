"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const MAX_PAGE_LENGTH = 100;

export default function Pagination({
  initialPage,
  initialResult,
}: {
  initialPage: number;
  initialResult: number;
}) {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const pages = Array(MAX_PAGE_LENGTH);
  const pageRenderSize = width <= 768 ? 2 : 3;

  function handleWidthChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWidthChange);

    return () => {
      window.removeEventListener("resize", handleWidthChange);
    };
  }, []);

  return (
    <section className="fixed bottom-0 w-screen p-2.5 flex justify-center items-center gap-x-2 bg-zinc-900">
      {/* Prev button */}
      <Link
        href={`/?page=${
          initialPage - 1 < 1 ? initialPage : initialPage - 1
        }&results=${initialResult}`}
        className={cn(
          "px-1.5 md:px-2.5 md:py-1 rounded-lg bg-zinc-800",
          "bg-white text-black"
        )}
      >
        Prev
      </Link>

      {/* N first pages */}
      {Array.from(pages)
        .slice(0, width <= 768 ? 1 : 3)
        .map((_, i) => (
          <Link
            key={`fisrt-${i}`}
            className={cn("px-1.5 md:px-2.5 md:py-1 rounded-lg bg-zinc-800", {
              "bg-white text-black": initialPage == i + 1,
            })}
            href={`/?page=${i + 1}&results=${initialResult}`}
          >
            {i + 1}
          </Link>
        ))}

      {/* Middle left delimiter */}
      {initialPage > 3 && <div key={"middle-start-delimiter"}>...</div>}

      {/* Middle pages */}
      {initialPage > 3 &&
        initialPage < pages.length &&
        Array.from(Array(pageRenderSize)).map((_, i) => {
          const currPage = initialPage + i - 1;

          if (currPage == pages.length || currPage == 3) return null;

          return (
            <Link
              key={`middle-${i}`}
              className={cn("px-1.5 md:px-2.5 md:py-1 rounded-lg bg-zinc-800", {
                "bg-white text-black": initialPage == currPage,
              })}
              href={`/?page=${currPage}&results=${initialResult}`}
            >
              {currPage}
            </Link>
          );
        })}

      {/* Middle right delimiter */}
      {initialPage != pages.length - 1 && (
        <div key={"middle-end-delimiter"}>...</div>
      )}

      {/* Last page */}
      <Link
        className={cn("px-1.5 md:px-2.5 md:py-1 rounded-lg bg-zinc-800", {
          "bg-white text-black": initialPage == pages.length,
        })}
        href={`/?page=${pages.length}&results=${initialResult}`}
      >
        {pages.length}
      </Link>

      {/* Next button */}
      <Link
        href={`/?page=${
          initialPage + 1 > pages.length ? initialPage : initialPage + 1
        }&results=${initialResult}`}
        className={cn(
          "px-1.5 md:px-2.5 md:py-1 rounded-lg bg-zinc-800",
          "bg-white text-black"
        )}
      >
        Next
      </Link>
    </section>
  );
}
