import MetaDecorator from "components/MetaDecorator";
import type { NextPage } from "next";
import InputGroup from "components/InputGroup";
import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { petitionRoutes } from "data/Routes";
import useAxiosData from "hooks/useAxiosData";
import { Petition } from "types/DTOs";
import Loading from "components/UI/Loading";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import NotFound from "pages/404";
import { VideoPlayer } from "components/VideoPlayer";

const Home: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [emailInput, setEmailInput] = useState("");
  const [petition, makeRequest] = useAxiosData<Petition>();

  useEffect(() => {
    if (id) {
      makeRequest(axios.get(petitionRoutes.getFromId(id as string)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (petition.loading || !id) {
    return (
      <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2">
        <Loading />
      </div>
    );
  }

  if (!petition.data) {
    return <NotFound />;
  }

  return (
    <>
      <MetaDecorator description="Resolu is a global platform for petitions and petitions. We help you to create, sign, and share petitions by using short form content" />
      <main className="container-custom pt-6 lg:pt-12">
        <VideoPlayer height="800px" width="auto" id={petition.data.videoId} />
        {/* <InputGroup
          value={emailInput}
          setValue={setEmailInput}
          type="text"
          label={"Search"}
        /> */}
      </main>
    </>
  );
};

// @ts-ignore
Home.isProtected = true;

export default Home;
// function MobileMenu({
//   input,
//   setInput,
//   onSubmit,
//   percentage,
// }: {
//   input: Data;
//   setInput: Dispatch<SetStateAction<Data>>;
//   onSubmit: (e: FormEvent<HTMLFormElement>) => void | Promise<void>;
//   percentage: number;
// }) {
//   return (
//     <form action="POST">
//       <InputGroup
//         value={input.title}
//         setValue={(val) => setInput((prev) => ({ ...prev, title: val }))}
//         type="text"
//         label={"Title"}
//       />
//       <br />
//       <br />
//       <FileInputGroup
//         setValue={(files) => {
//           // @ts-ignore
//           setInput((prev) => ({ ...prev, file: files?.length && files[0] }));
//         }}
//         inputClassName="block file:mr-5 file:py-2 file:border-0 file:text-sm file:bg-gray-light hover:file:cursor-pointer text-sm text-gray-dark placeholder-gray-dark"
//         label={"Video"}
//         accept=".mp4"
//       />
//       <br />
//       <TextAreaInputGroup
//         value={input.description}
//         setValue={(val) => setInput((prev) => ({ ...prev, description: val }))}
//         label={"Description"}
//       />

//       <br />
//       <br />

//       <InputGroup
//         value={input.goal}
//         setValue={(val) => setInput((prev) => ({ ...prev, goal: val }))}
//         type="number"
//         label={"Goal (# of Signs)"}
//         min="0"
//         step="1"
//       />

//       <PrimaryButton onClick={onSubmit} className="mt-6 w-full">
//         Create
//       </PrimaryButton>

//       {percentage > 0 && (
//         <p className="mt-6 text-center">
//           {percentage !== 100
//             ? `Uploading... ${percentage}%`
//             : "Uploaded successfully!"}
//         </p>
//       )}
//     </form>
//   );
// }
