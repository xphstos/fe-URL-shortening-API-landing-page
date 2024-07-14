import { createForm, valiForm } from "@modular-forms/solid";
import { ClassValue } from "clsx";
import { Component } from "solid-js";
import * as v from "valibot";
import { Button } from "./Button";
import { cn } from "../utils/cn";

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

export const URLShortener: Component<Props> = (props) => {
  const [, { Form, Field }] = createForm<URLForm>({
    validate: valiForm(FormSchema),
    validateOn: "blur",
  });

  const handleSubmit = async ({ url }: URLForm) => {
    const CORSProxy = "https://corsproxy.io/?";
    const APIURL = "https://cleanuri.com/api/v1/shorten";
    const longURL = encodeURI(url);
    // const URLParams = new URLSearchParams({ url: longURL });

    const response = await fetch(`${CORSProxy}${APIURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: longURL }),
    });

    if (!response.ok) {
      throw new Error("Failed to shorten URL");
    }

    const shortenedURL = await response.json();
    console.log(shortenedURL);
  };

  return (
    <section
      class={cn("padding-container bg-shorten py-14", [props.className])}
      aria-title="URL Shortener"
    >
      <Form
        onSubmit={handleSubmit}
        class="bg-shorten-form flex items-start gap-6 rounded-soft p-14"
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
                <div class="absolute left-0 top-full w-full pt-2 text-md italic text-error">
                  {field.error}
                </div>
              )}
            </div>
          )}
        </Field>
        <Button variant="soft" size="large" type="submit">
          Shorten It!
        </Button>
      </Form>
    </section>
  );
};
