"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { initFirebase } from "@/firebase";
import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import Button from "@/UI/button";
interface FormValues {
  sampleText: string;
}

const PDFViewerComponent = () => {
  const app = initFirebase();
  const auth = getAuth(app);
  const functions = getFunctions(app);
  const functionRef = httpsCallable(functions, "generatePoem");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<FormValues>();

  async function handleSubmitPoem(data: FormValues) {
    setLoading(true);
    const sampleText = data.sampleText;

    const response = (await functionRef({
      userId: auth.currentUser?.uid,
      userName: auth.currentUser?.displayName,
      sampleText,
    })) as any;
    setResponse(response.data.POEM);
    setLoading(false);
  }

  return (
    <div className="p-4 flex flex-col gap-8 max-w-3xl mx-auto">
      <div className="w-full flex flex-col  ">
        {response ? (
          <div className="flex flex-col h-full">
            <h1 className="text-center font-medium">
              Your Poem is ready and published!
            </h1>
            <div className="p-4 bg-white  w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6">
              <p className="text-gray-600">{response}</p>
            </div>

            <div className="w-full flex flex-col justify-center items-center mt-4">
              <Link
                href={`/view/${auth.currentUser?.uid}`}
                className="rounded-md bg-gray-800 px-2.5 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                See Published Poems
              </Link>
              <button
                type="button"
                className="text-gray-600 mt-2 underline text-sm font-medium hover:text-gray-500"
                onClick={() => {
                  setResponse("");
                }}
              >
                Create Another
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(handleSubmitPoem)}>
            <div className="">
              <label
                htmlFor="company-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Poem Starter Text
              </label>
              <div className="mt-2">
                <textarea
                  {...register("sampleText", { required: true })}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  placeholder="strolling through the mountains on a sunny day"
                />
              </div>
              <div className="w-full flex justify-center items-center mt-4">
                <Button
                  type="submit"
                  loading={loading}
                  className="rounded-md bg-gray-800 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                  Turn Into Poem
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PDFViewerComponent;
