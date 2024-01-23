"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { usePathname, useRouter } from "next/navigation";
import * as z from "zod";
import { CommentValidation } from "@/lib/validations/thread";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";

const Comment = ({
  threadId,
  currentUserImg,
  currentUserId,
}: {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToThread(
      threadId,
      values.thread,
      JSON.parse(currentUserId),
      pathname
    );
    form.reset()
  };

  return (
    <Form {...form}>
      <form className="comment-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex items-center w-full gap-3">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="user"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent ">
                <Input
                  type="text"
                  placeholder="Comment..."
                  className="text-light-1 outline-none no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="comment-form_btn">
          REPLY
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
