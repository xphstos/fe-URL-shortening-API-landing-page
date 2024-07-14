import { ClassValue } from "clsx";
import { cn } from "../utils/cn";
import { Component, mergeProps } from "solid-js";

interface ButtonLink extends Partial<Omit<HTMLAnchorElement, "className">> {
  className?: ClassValue;
  variant?: "soft" | "rounded" | "icon";
  size?: "medium" | "large";
  children: any;
}

export const ButtonLink: Component<ButtonLink> = (props) => {
  const defaultProps = mergeProps({ variant: "soft", size: "medium" }, props);

  return (
    <a
      href={props.href}
      class={cn(
        "inline-flex min-h-10 cursor-pointer items-center justify-center bg-cyan px-6 py-2 text-md font-bold text-white transition-colors hocus:bg-cyan/75",
        {
          "rounded-soft": defaultProps.variant === "soft",
          "rounded-full": defaultProps.variant === "rounded",
          "aspect-square min-h-8 rounded-soft bg-transparent p-0 hocus:bg-violet-100/10":
            defaultProps.variant === "icon",
          "min-h-14 px-10 text-lg": defaultProps.size === "large",
        },
        [props.className],
      )}
    >
      {props.children}
    </a>
  );
};
