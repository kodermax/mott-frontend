"use client";

import type { FullNameForm } from "@mott/validators";
import { useRouter } from "next/navigation";

import { Button } from "@mott/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "@mott/ui/form";
import { Input } from "@mott/ui/input";
import { fullNameSchema } from "@mott/validators";

import { useLoginFormContext } from "~/components/forms/login-form-context";
import { paths } from "~/routes/paths";

export default function FullNamePage() {
  const router = useRouter();
  const form = useForm({
    schema: fullNameSchema,
    mode: "onSubmit",
  });

  const { updateFormValues } = useLoginFormContext();

  const onSubmit = async (data: FullNameForm) => {
    const isStepValid = await form.trigger();

    if (!isStepValid) {
      return;
    }

    updateFormValues(data);
    router.push(paths.onboarding.welcome);
  };

  const handleBack = () => {
    router.push(paths.login.accessCode);
  };

  return (
    <>
      <div className="mb-24">
        <h1 className="text-2xl font-bold tracking-tight">Your Name</h1>
        <h2 className="text-lg font-medium tracking-tight text-neutral-400">
          Please enter your name so we can personalize your experience.
        </h2>
      </div>

      <Form {...form}>
        <form
          className="flex w-full max-w-2xl flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-600">
                  Full name
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Full Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="lg"
            variant="primary"
            aria-label="Continue"
            className="mt-14"
          >
            Continue
          </Button>
        </form>
      </Form>
      <Button
        size="lg"
        variant="ghost"
        aria-label="Back"
        className="mt-2 w-full"
        onClick={handleBack}
      >
        Back
      </Button>
    </>
  );
}
