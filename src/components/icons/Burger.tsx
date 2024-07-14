import { Component } from "solid-js";
import { cn } from "../../utils/cn";
import { ClassValue } from "clsx";

export const IconBurger: Component<{ className?: ClassValue }> = (props) => {
  return (
    <svg
      class={cn([props.className])}
      width="32"
      height="18"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 18"
    >
      <g fill="currentColor" fill-rule="evenodd">
        <path d="M0 0h32v2H0zM0 8h32v2H0zM0 16h32v2H0z" />
      </g>
    </svg>
  );
};
