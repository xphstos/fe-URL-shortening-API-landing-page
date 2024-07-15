import { ClassValue } from "clsx";
import { cn } from "../utils/cn";
import { Component, mergeProps, splitProps, JSX } from "solid-js";

interface Button
  extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  className?: ClassValue;
  variant?: "soft" | "rounded" | "icon";
  size?: "medium" | "large";
}

export const Button: Component<Button> = (props) => {
  const defaultProps = mergeProps(
    {
      variant: "soft",
      size: "medium",
      className: "",
    },
    props,
  );
  const [local, styles, rest] = splitProps(
    defaultProps,
    ["variant", "size", "type"],
    ["className"],
  );

  return (
    <button
      class={cn(
        "inline-flex min-h-10 cursor-pointer items-center justify-center bg-cyan px-6 py-2 text-md font-bold text-white transition-colors hocus-visible:bg-cyan/75",
        {
          "rounded-soft": local.variant === "soft",
          "rounded-full": local.variant === "rounded",
          "aspect-square min-h-8 rounded-soft bg-transparent p-0 hocus-visible:bg-violet-100/10":
            local.variant === "icon",
          "min-h-14 px-10 text-lg": local.size === "large",
        },
        [styles.className],
      )}
      {...rest}
    />
  );
};
