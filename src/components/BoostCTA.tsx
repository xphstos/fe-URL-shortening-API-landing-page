import { ClassValue } from "clsx";
import { Component } from "solid-js";
import { ButtonLink } from "./ButtonLink";
import { cn } from "../utils/cn";

interface Props extends Partial<Omit<HTMLElement, "className">> {
  className?: ClassValue;
}

export const BoostCTA: Component<Props> = (props) => {
  return (
    <section
      class={cn("padding-container bg-boost py-20 text-center md:py-14", [
        props.className,
      ])}
    >
      <h2 class="text-3xl mb-5 font-bold text-white">Boost your links today</h2>
      <ButtonLink href="#1" variant="rounded" size="large">
        Get started
      </ButtonLink>
    </section>
  );
};
