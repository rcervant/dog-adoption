"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import signIn from "@/actions/signIn";
import { toast } from "./ui/use-toast";
import { SEARCH_PATH } from "@/lib/constants";

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

const SignInForm = () => {
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
      const res = await signIn(userCredentials) || null;
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
                p-6
                "
        >
          <div className="text-2xl font-semibold">Welcome</div>
        </div>
        <div className="relative p-6 ">
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="pb-4">
                  <FormLabel className="text-xl">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Summer" {...field} />
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
                    <Input placeholder="summer@pup.com" {...field} />
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
              disabled={form.formState.isSubmitting}
            >
              Sign in
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
