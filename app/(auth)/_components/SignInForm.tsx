"use client";

import { SEARCH_PATH, SIGN_IN } from "@/lib/constants";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/base/form";
import { Button } from "@/components/base/button";
import { Input } from "@/components/base/input";
import { toast } from "@/components/base/use-toast";

import { useRouter } from "next/navigation";
import signIn from "@/actions/signIn";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name is too short.",
    })
    .max(255, {
      message: "Name is too long.",
    }),

  email: z
    .string()
    .min(5, {
      message: "Email is too short.",
    })
    .email({
      message: "Email is invalid.",
    })
    .max(255, {
      message: "Email is too long.",
    }),
});

interface SignInFormProps {
  value: string;
}

const SignInForm = ({ value = SIGN_IN }: SignInFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = async (userCredentials: z.infer<typeof formSchema>) => {
    try {
      const res = await signIn(userCredentials);
      if (!res) {
        throw new Error("Invalid credentials.");
      }

      router.push(SEARCH_PATH);
      router.refresh();
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: "Invalid credentials.",
      });
      console.log(error, "error: /sign-in");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="
              translate
              relative
              flex
              h-auto
              w-full 
              flex-col 
              rounded-lg 
              border-0 
              bg-slate-100 
              shadow-lg 
              outline-none 
              focus:outline-none
              md:h-auto 
              lg:h-auto
            "
      >
        <div
          className="
                relative 
                flex 
                items-center
                justify-center
                rounded-t
                border-b-[1px]
                p-4
                "
        >
          <div className="text-2xl font-semibold">
            {value === SIGN_IN ? "Welcome Back" : "Welcome aboard!"}
          </div>
        </div>
        <div className="relative p-6 ">
          <div>
            <FormDescription className="text-md text-center">
              {value === SIGN_IN
                ? "Sign in to your account"
                : "Let's create your account"}
            </FormDescription>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="pb-4">
                  <FormLabel className="text-xl">Name</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="sign-in-name-input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="pt-4">
                  <FormLabel className="text-xl">Email</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="sign-in-email-input" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 p-6">
          <div className="flex w-full flex-col items-center gap-4">
            <Button
              className="w-full"
              type="submit"
              data-testid="sign-in-button"
              disabled={form.formState.isSubmitting}
            >
              {value === SIGN_IN ? "Sign In" : "Create Account"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
