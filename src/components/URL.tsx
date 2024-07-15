import { ClassValue } from "clsx";
import { Component } from "solid-js";
import { cn } from "../utils/cn";
import { Button } from "./Button";
import { writeClipboard } from "@solid-primitives/clipboard";
import { createSignal } from "solid-js";

interface Props extends Partial<Omit<HTMLElement, "className">> {
  className?: ClassValue;
  longURL: string;
  shortURL: string;
}

export const URL: Component<Props> = (props) => {
  const [copied, setCopied] = createSignal(false);

  const handleCopy = () => {
    writeClipboard(props.shortURL);
    setCopied((prev) => !prev);

    setTimeout(() => {
      setCopied((prev) => !prev);
    }, 2000);
  };

  return (
    <article
      class={cn(
        "grid overflow-hidden rounded-soft bg-white p-4 pt-1 text-lg shadow-sm md:flex md:items-center md:justify-between md:gap-6 md:pt-4",
        [props.className],
      )}
    >
      <div class="flex-1 items-center justify-between gap-4 overflow-hidden md:flex">
        <div class="flex-1 truncate border-b border-b-neutral-100 py-4 md:border-none md:p-0">
          {props.longURL}
        </div>
        <div class="shrink-0 py-4 text-cyan md:p-0">{props.shortURL}</div>
      </div>
      <Button
        variant="soft"
        type="button"
        onclick={handleCopy}
        className={cn("md:min-width-28 flex basis-28", {
          "hocus-visible:bg-violent bg-violet": copied(),
        })}
        disabled={copied()}
      >
        {copied() ? "Copied!" : "Copy"}
      </Button>
    </article>
  );
};
