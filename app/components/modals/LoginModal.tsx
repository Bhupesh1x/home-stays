"use client";

import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

import { useModal } from "@/app/hooks/use-modal-hook";

import Modal from "./Modal";
import Button from "../shared/Button";
import Heading from "../shared/Heading";
import Input from "../shared/input/Input";

function LoginModal() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, type, onClose } = useModal();

  const isModalOpen = isOpen && type === "login";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const notify = toast.loading("Logging you in...");

    const result = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    setIsLoading(false);

    if (result?.ok) {
      toast.success("Logged In", {
        id: notify,
      });
      router.refresh();
      reset();
      onClose();
    }

    if (result?.error) {
      toast.error(result.error, {
        id: notify,
      });
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subTitle="Login to your account!" />
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
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className="flex items-center justify-center mt-2">
        <p>Already have an account?</p>
        <p className="pl-1 text-neutral-800 hover:underline font-bold cursor-pointer">
          Log in
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      title="Login"
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

export default LoginModal;