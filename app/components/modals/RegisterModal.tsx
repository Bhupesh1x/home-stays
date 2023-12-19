"use client";

import axios from "axios";

import { useMemo, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

import { useRegisterModal } from "@/app/hooks/use-register-hook";

import Modal from "./Modal";
import Heading from "../shared/Heading";
import Input from "../shared/input/Input";

function RegisterModal() {
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onClose } = useRegisterModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await axios.post("/api/register", data);
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <Heading title="Welcome to HomeStays" subTitle="Create an account!" />
        <Input
          id="name"
          label="Name"
          register={register}
          errors={errors}
          required
        />
        <Input
          id="email"
          label="Email"
          register={register}
          errors={errors}
          required
        />
        <Input
          id="password"
          type="password"
          label="Password"
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }, [errors, register]);

  return (
    <Modal
      title="Register"
      actionLabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
      isOpen={isOpen}
      disabled={isLoading}
      onClose={onClose}
      body={bodyContent}
    />
  );
}

export default RegisterModal;
