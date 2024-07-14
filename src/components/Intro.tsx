import { ClassValue } from "clsx";
import { Component } from "solid-js";
import { cn } from "../utils/cn";
import { ButtonLink } from "./ButtonLink";

type Props = {
  className?: ClassValue;
};

export const Intro: Component<Props> = (props) => {
  return (
    <section
      class={cn([
        "lg:padding-container grid items-center gap-8 overflow-hidden py-8 pb-16 [--padding-inline:2rem] lg:grid-cols-2 lg:gap-16",
        props.className,
      ])}
    >
      <figure class="padding-container-bleed-end relative aspect-[733/482] w-[140%] overflow-clip lg:order-2 lg:min-h-[482px] lg:w-auto lg:px-0">
        <img
          src="/illustration-working.svg"
          class="left-0 top-1/2 h-auto w-[120%] lg:absolute lg:h-full lg:w-auto lg:-translate-y-1/2 lg:object-center"
          alt=""
        />
      </figure>
      <header class="padding-container text-center lg:px-0 lg:text-left">
        <h1 class="text-super mb-2 font-bold leading-[1.125]">
          More than just shorter links
        </h1>
        <p class="mb-8 text-balance text-violet-100">
          Build your brand’s recognition and get detailed insights on how your
          links are performing.
        </p>
        <ButtonLink variant="rounded" size="large">
          Get Started
        </ButtonLink>
      </header>
    </section>
  );
};
