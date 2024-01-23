"use client";



import { zodResolver } from "@hookform/resolvers/zod";
import { ThreadValidation } from "@/lib/validations/thread"
import { useState } from "react";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import {createThread} from "@/lib/actions/thread.actions"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import Image from "next/image";
import { ChangeEvent } from "react";

interface Props {
    userId: string;
  }

function PostThread({userId}:Props) {
    const [file, setFile] = useState<File[]>([]);
    const { startUpload } = useUploadThing("media");
    const router = useRouter();
    const pathname = usePathname();
  
    const form = useForm({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
          thread: "",
          accountId:userId,

        },
      });
      const onSubmit = async (values:z.infer<typeof ThreadValidation>) => {
        await createThread({
            text:values.thread,
            author:userId,
            communityId:null,
            path:pathname


        });
        router.push("/");
      }

    return (
        <Form {...form}>
        <form className="flex flex-col justify-start gap-10 mt-10"
        onSubmit={form.handleSubmit(onSubmit)}
        >
            <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-3">
              <FormLabel className="text-base-semibold">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea  
                rows={15}
                className="account-form_input no-focus"
                {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500">
          Post Threading
        </Button>
            </form>
        </Form>
    )}

export default PostThread;