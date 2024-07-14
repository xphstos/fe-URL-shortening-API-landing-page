import { Component, For, Show, createSignal } from "solid-js";
import { IconBurger } from "./icons/Burger";
import { LINKS } from "../data/data";
import { ButtonLink } from "./ButtonLink";
import { IconClose } from "./icons/Close";

export const MobileMenu: Component = () => {
  const [open, setOpen] = createSignal(false);
  let dialogRef!: HTMLDialogElement;

  const toggleMenu = () => {
    setOpen((v) => !v);
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        class="flex aspect-square size-12 rounded-soft transition-colors hocus:bg-violet-100/20"
      >
        <Show when={open()} fallback={<IconBurger className="m-auto size-6" />}>
          <IconClose className="m-auto size-4" />
        </Show>
      </button>
      <dialog
        ref={dialogRef}
        open={open()}
        class="fixed inset-[var(--header-height)_1.5rem_auto] z-10 w-auto rounded-soft bg-violet p-6 text-violet-100 shadow-md"
      >
        <ul role="list">
          <For each={LINKS}>
            {(link, index) => {
              const isLast = LINKS.length === index() + 1;

              return (
                <>
                  {isLast && <li class="my-4 block h-px bg-violet-100/30" />}
                  <li class="">
                    <a
                      class="block py-4 text-center text-white transition-colors hocus:text-violet-100"
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  </li>
                </>
              );
            }}
          </For>
          <li>
            <ButtonLink variant="rounded" className="w-full" href="#1">
              Sign Up
            </ButtonLink>
          </li>
        </ul>
      </dialog>
    </>
  );
};
