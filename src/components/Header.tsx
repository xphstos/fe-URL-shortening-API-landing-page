import { ClassValue } from "clsx";
import { cn } from "../utils/cn";
import { For, createEffect, createSignal, onCleanup } from "solid-js";
import { Logo } from "./Logo";
import { LINKS } from "../data/data";
import { ButtonLink } from "./ButtonLink";
import { MobileMenu } from "./MobileMenu";

type Props = {
  className?: ClassValue;
};

export const Header = (props: Props) => {
  let ref!: HTMLHeadElement;
  const [isScrolling, setIsScrolling] = createSignal(false);

  const setElementHeight = () => {
    document.documentElement.style.setProperty(
      "--header-height",
      Math.ceil(ref.getBoundingClientRect().height) + "px",
    );
  };

  const handleScroll = () => {
    const { scrollY } = window;

    if (scrollY >= ref.getBoundingClientRect().height) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
    setElementHeight();
  };

  createEffect(() => {
    setElementHeight();
  });

  window.addEventListener("resize", setElementHeight);
  window.addEventListener("scroll", handleScroll);

  onCleanup(() => {
    window.removeEventListener("resize", setElementHeight);
    window.removeEventListener("scroll", handleScroll);
  });

  return (
    <header
      ref={ref}
      class={cn(
        "padding-container sticky top-0 z-10 bg-white pb-6 pt-12 transition-all",
        {
          "pt-6": isScrolling(),
        },
        [props.className],
      )}
    >
      <nav>
        <ul role="list" class="gap flex items-center">
          <li class="me-8">
            <a href="/" aria-label="logo, link to homepage">
              <Logo class="text-violet-900" />
            </a>
          </li>
          <For each={LINKS}>
            {(link, index) => {
              const isLast = LINKS.length === index() + 1;

              return (
                <li
                  class={cn("hidden lg:block", {
                    "ms-auto": isLast,
                  })}
                >
                  <a
                    href={link.href}
                    class="text-bold p-3 text-md text-violet-100 transition-colors hocus:text-violet-900"
                  >
                    {link.label}
                  </a>
                </li>
              );
            }}
          </For>
          <li class="ms-8 hidden lg:block">
            <ButtonLink href="#1" variant="rounded">
              Sign Up
            </ButtonLink>
          </li>
          <li class="ms-auto block lg:hidden">
            <MobileMenu />
          </li>
        </ul>
      </nav>
    </header>
  );
};
