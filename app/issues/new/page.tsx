"use client";
import React from "react";
import { Text, TextField } from "@radix-ui/themes";
import { lexendDeca } from "@/app/ui/fonts";
import { Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import {toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from "@/app/ValidationSchemas";
import {z} from 'zod'

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {

  const { register, control, handleSubmit, formState:{ errors }} = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const router = useRouter();
  const [Error, setError] = useState("");
  return (
    <>
    <form className="max-w-xl space-y-3" onSubmit={handleSubmit(async (data) => {
      try {
        await axios.post('/api/issues', data);
        router.push('/issues');
      } catch (error) {
        setError('Fill the form completely !');
        toast.error("You did not complete form !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      }
    })}>
      <TextField.Root>
        <TextField.Input
          className={`${lexendDeca.className}`}
          placeholder="Title"
          {...register("title")} />
      </TextField.Root>

        {/* Validating with zod */}
  {errors.title && <Text color="red" as="p">{errors.title.message}</Text>}
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
        
        {/* Validating with zod */}
        {errors.description && <Text color="red">{errors.description.message}</Text>}

      <Button className={`${lexendDeca.className}`}>Submit New Issue</Button>
    </form>
      <ToastContainer />
      </>
  );
};

export default NewIssuePage;
