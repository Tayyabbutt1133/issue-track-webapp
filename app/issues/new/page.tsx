"use client";
import React from "react";
import { TextField } from "@radix-ui/themes";
import { lexendDeca } from "@/app/ui/fonts";
import { Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {

  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();
  // console.log(register("title"));
  return (
    <form className="max-w-xl space-y-3" onSubmit={handleSubmit( async (data) => {
      await axios.post('/api/issues', data);
      router.push('/issues');
    })}>
      <TextField.Root>
        <TextField.Input
          className={`${lexendDeca.className}`}
          placeholder="Title"
          {...register("title")} />
      </TextField.Root>

      {/* we need to connect SimpleMDE with controller to make that bridge pass data */}
      <Controller
        name="description"
        control={control}
        render={({ field: { onChange, onBlur} }) => (
          <SimpleMDE
            onChange={onChange} // send value to hook form
            onBlur={onBlur} // notify when input is touched/blur
          />
        )} {...register} />
      
      <Button className={`${lexendDeca.className}`}>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
