"use client";

import axios from "axios";
import { toast } from "react-hot-toast";

import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

import { useModal } from "@/app/hooks/use-modal-hook";

import Modal from "./Modal";
import Button from "../shared/Button";
import Heading from "../shared/Heading";
import Input from "../shared/input/Input";

function RegisterModal() {
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, type, onClose, onOpen } = useModal();

  const isModalOpen = isOpen && type === "register";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post("/api/register", data);
      reset();
      onClose();
    } catch (error) {
      console.log("err", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const toogle = useCallback(() => {
    onClose();
    onOpen("login");
  }, [onClose, onOpen]);

  const bodyContent = (
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
        type="email"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        min={4}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="flex items-center justify-center mt-2">
        <p>Already have an account?</p>
        <p
          className="pl-1 text-neutral-800 hover:underline font-bold cursor-pointer"
          onClick={toogle}
        >
          Log in
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      title="Register"
      actionLabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
      isOpen={isModalOpen}
      disabled={isLoading}
      onClose={onClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;
