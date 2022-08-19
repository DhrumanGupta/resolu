import MetaDecorator from "components/MetaDecorator";
import type { NextPage } from "next";
import InputGroup from "components/InputGroup";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import TextAreaInputGroup from "components/TextAreaInputGroup";
import { PrimaryButton } from "components/Button";
import axios from "axios";
import { petitionRoutes } from "data/Routes";

type Data = {
  title: string;
  description: string;
  goal: number;
  file: string;
};

const Home: NextPage = () => {
  const [input, setInput] = useState<Data>({
    title: "",
    description: "",
    goal: 1000,
    file: "",
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resp = await axios.post(petitionRoutes.create, {});
    } catch {}
  };

  return (
    <>
      <MetaDecorator description="Resolu is a global platform for petitions and petitions. We help you to create, sign, and share petitions by using short form content" />
      <main className="container-custom pt-6 lg:pt-12">
        <h1 className="mb-2">Create a petition</h1>
        <div className="md:hidden">
          <MobileMenu input={input} setInput={setInput} onSubmit={onSubmit} />
        </div>
      </main>
    </>
  );
};

// @ts-ignore
Home.isProtected = true;

export default Home;
function MobileMenu({
  input,
  setInput,
  onSubmit,
}: {
  input: Data;
  setInput: Dispatch<SetStateAction<Data>>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void | Promise<void>;
}) {
  return (
    <form onSubmit={onSubmit}>
      <InputGroup
        value={input.title}
        setValue={(val) => setInput((prev) => ({ ...prev, title: val }))}
        type="text"
        label={"Title"}
      />
      <br />
      <br />
      <InputGroup
        value={input.file}
        setValue={(val) => setInput((prev) => ({ ...prev, file: val }))}
        type="file"
        inputClassName="block file:mr-5 file:py-2 file:border-0 file:text-sm file:bg-gray-light hover:file:cursor-pointer text-sm text-gray-dark placeholder-gray-dark"
        label={"Video"}
        accept=".mp4"
      />
      <br />
      <TextAreaInputGroup
        value={input.description}
        setValue={(val) => setInput((prev) => ({ ...prev, description: val }))}
        label={"Description"}
      />

      <br />
      <br />

      <InputGroup
        value={input.goal}
        setValue={(val) => setInput((prev) => ({ ...prev, goal: val }))}
        type="number"
        label={"Goal (# of Signs)"}
        min="0"
        step="1"
      />

      <PrimaryButton className="mt-6 w-full">Create</PrimaryButton>
    </form>
  );
}
