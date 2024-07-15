import { ClassValue } from "clsx";
import { cn } from "../utils/cn";
import { Logo } from "./Logo";
import { Component, For } from "solid-js";
import { FOOTER_LINKS, SOCIAL } from "../data/data";
import { ButtonLink } from "./ButtonLink";
import { IconFacebook } from "./icons/Facebook";
import { IconTwitter } from "./icons/Twitter";
import { IconInstagram } from "./icons/Instagram";
import { IconPinterest } from "./icons/Pinterest";

type Props = {
  className?: ClassValue;
};

export const Footer: Component<Props> = (props) => {
  const Icons = {
    Facebook: <IconFacebook className="m-auto size-4 shrink-0" />,
    Twitter: <IconTwitter className="m-auto size-4 shrink-0" />,
    Pinterest: <IconPinterest className="m-auto size-4 shrink-0" />,
    Instagram: <IconInstagram className="m-auto size-4 shrink-0" />,
  };

  return (
    <footer
      class={cn(
        "padding-container flex flex-col items-center gap-10 bg-violet-900 py-14 text-white lg:flex-row lg:items-start lg:justify-between lg:gap-20 lg:py-16",
        [props.className],
      )}
    >
      <a href="/" aria-label="logo, link to homepage">
        <Logo class="text-white" />
      </a>
      <div class="flex flex-auto flex-col justify-between gap-8 text-center lg:flex-row lg:justify-end lg:gap-20 lg:text-left">
        <For each={FOOTER_LINKS}>
          {(link) => (
            <div>
              <h3 class="mb-6 text-md font-bold">{link.label}</h3>
              <ul role="list">
                <For each={link.links}>
                  {(sublink) => (
                    <li>
                      <a
                        class="block py-2 text-md font-medium text-violet-100 transition-colors hocus:text-white"
                        href={sublink.href}
                      >
                        {sublink.label}
                      </a>
                    </li>
                  )}
                </For>
              </ul>
            </div>
          )}
        </For>
      </div>
      <ul role="list" class="flex items-center justify-center gap-2">
        <For each={SOCIAL}>
          {(link) => (
            <li>
              <ButtonLink href={link.href} variant="icon">
                {Icons[link.label as keyof typeof Icons]}
              </ButtonLink>
            </li>
          )}
        </For>
      </ul>
    </footer>
  );
};
