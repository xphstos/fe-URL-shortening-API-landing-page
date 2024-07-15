import { createForm, valiForm } from "@modular-forms/solid";
import { ClassValue } from "clsx";
import { Component, createSignal, For, Show } from "solid-js";
import * as v from "valibot";
import { Button } from "./Button";
import { cn } from "../utils/cn";
import { createStore } from "solid-js/store";
import { URL } from "./URL";
import { IconLoading } from "./icons/Loading";
import { makePersisted } from "@solid-primitives/storage";

type Props = {
  className?: ClassValue;
};

const FormSchema = v.object({
  url: v.pipe(
    v.string(),
    v.nonEmpty("Please add a link"),
    v.url("Please enter a valid URL"),
  ),
});

type URLForm = v.InferOutput<typeof FormSchema>;
type ShortenURL = {
  long_url: string;
  short_url: string;
};

export const URLShortener: Component<Props> = (props) => {
  const [store, setStore] = makePersisted(
    createStore<{
      shortenedURLs: ShortenURL[];
    }>({
      shortenedURLs: [],
    }),
    { name: "shortenedURLs" },
  );
  const [isSubmitting, setIsSubmitting] = createSignal(false);

  const [, { Form, Field }] = createForm<URLForm>({
    validate: valiForm(FormSchema),
    validateOn: "blur",
  });

  const handleSubmit = async ({ url }: URLForm) => {
    setIsSubmitting(true);
    const longURL = encodeURI(url);
    const URLParams = new URLSearchParams({ url: longURL });

    const response = await fetch(`https://spoo.me/?${URLParams}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to shorten URL");
    }

    const shortenedURL = await response.json();
    setIsSubmitting(false);
    setStore("shortenedURLs", (prev) => [
      ...prev,
      {
        long_url: url,
        short_url: shortenedURL.short_url,
      },
    ]);
  };

  return (
    <>
      <section
        class={cn(
          "padding-container bg-shorten pb-4 pt-14",
          {
            "pb-14": store.shortenedURLs.length === 0,
          },
          [props.className],
        )}
        style={{
          "--background-position":
            store.shortenedURLs.length === 0 ? "0rem" : "1rem",
        }}
        aria-title="URL Shortener"
      >
        <Form
          onSubmit={handleSubmit}
          class="bg-shorten-form flex flex-col gap-6 rounded-soft p-6 md:flex-row md:items-start md:p-14"
        >
          <Field name="url">
            {(field, props) => (
              <div class="relative flex-auto">
                <input
                  class={cn(
                    "-ring-offset-2 min-h-14 w-full min-w-1 rounded-soft border-none px-4 outline-transparent ring-2 ring-neutral-100 hocus:ring-cyan",
                    {
                      "text-error ring-error hocus:ring-error": field.error,
                    },
                  )}
                  placeholder="Shorten a link here..."
                  {...props}
                  type="text"
                  required
                />
                {field.error && (
                  <div class="left-0 top-full w-full pt-2 text-md italic text-error md:absolute">
                    {field.error}
                  </div>
                )}
              </div>
            )}
          </Field>
          <Button
            variant="soft"
            size="large"
            type="submit"
            disabled={isSubmitting()}
          >
            {isSubmitting() ? (
              <IconLoading className="animate-spin" />
            ) : (
              "Shorten It!"
            )}
          </Button>
        </Form>
      </section>
      <Show when={store.shortenedURLs.length > 0}>
        <section
          class={cn("padding-container grid gap-4 bg-neutral-100 pb-14 pt-4")}
          aria-title="Shortened URLs"
        >
          <For each={store.shortenedURLs}>
            {({ short_url, long_url }) => {
              return <URL shortURL={short_url} longURL={long_url} />;
            }}
          </For>
        </section>
      </Show>
    </>
  );
};
