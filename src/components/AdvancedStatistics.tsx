import { ClassValue } from "clsx";
import { Component, For } from "solid-js";
import { cn } from "../utils/cn";
import { STATISTICS } from "../data/data";

interface Props extends Partial<Omit<HTMLElement, "className">> {
  className?: ClassValue;
}

export const AdvancedStatistics: Component<Props> = (props) => {
  return (
    <section
      class={cn("padding-container bg-neutral-100 py-14", [props.className])}
    >
      <header class="mb-24 text-center">
        <h2 class="text-3xl mb-6 font-bold">Advanced Statistics</h2>
        <p class="mx-auto max-w-[525px] leading-relaxed text-violet-100">
          Track how your links are performing across the web with our advanced
          statistics dashboard.
        </p>
      </header>
      <section
        class={cn(
          "relative mb-14 grid place-items-center gap-x-8 gap-y-20 text-center lg:grid-cols-3",
          "before:absolute before:left-1/2 before:top-1/2 before:h-full before:w-2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-cyan lg:text-left lg:before:h-2 lg:before:w-full",
        )}
      >
        <For each={STATISTICS}>
          {(stat, index) => {
            const isFirst = index() === 0;
            const isLast = index() + 1 === STATISTICS.length;
            return (
              <article
                class={cn(
                  "relative max-w-80 rounded-soft bg-white p-8 shadow-sm lg:max-w-full",
                  {
                    "lg:-mt-[5.5rem]": isFirst,
                    "lg:mt-[5.5rem]": isLast,
                  },
                )}
              >
                <figure class="absolute left-1/2 top-0 flex aspect-square size-[5.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet lg:left-[unset] lg:translate-x-0">
                  <img
                    src={stat.img}
                    class="m-auto size-10"
                    alt=""
                    aria-hidden="true"
                  />
                </figure>
                <h3 class="mb-4 mt-8 text-2xl font-semibold">{stat.title}</h3>
                <p class="font-normal text-violet-100">{stat.text}</p>
              </article>
            );
          }}
        </For>
      </section>
    </section>
  );
};
