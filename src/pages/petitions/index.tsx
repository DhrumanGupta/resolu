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

const Home: NextPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [petitions, makeRequest] = useAxiosData<Petition[]>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      makeRequest(axios.get(petitionRoutes.getAll(`?search=${searchInput}`)));
    }, 250);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  return (
    <>
      <MetaDecorator description="Resolu is a global platform for petitions and petitions. We help you to create, sign, and share petitions by using short form content" />
      <main className="container-custom pt-6 lg:pt-12">
        <h1 className="mb-2">Browse petition</h1>
        <InputGroup
          value={searchInput}
          setValue={setSearchInput}
          type="text"
          label={"Search"}
        />

        {petitions.loading && (
          <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2">
            <Loading />
          </div>
        )}

        {petitions.data && petitions.data.length === 0 && (
          <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 text-lg">
            Wow, such empty
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
          {petitions.data &&
            petitions.data.map((petition) => (
              <PetitionCard key={petition.id} petition={petition} />
            ))}
        </div>
      </main>
    </>
  );
};

// @ts-ignore
Home.isProtected = true;

const PetitionCard: FC<{ petition: Petition }> = ({ petition }) => {
  return (
    <Link href={`/petitions/${petition.id}`}>
      <div className="rounded-md bg-gray-light p-4 hover:bg-[rgba(0,0,0,0.1)] duration-100 hover:cursor-pointer">
        <div className="w-full aspect-w-9 aspect-h-16 relative">
          <Image
            alt="Petition Image"
            layout="fill"
            src={`/video-images/${petition.videoId}.jpg`}
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <h3 className="font-bold text-center mt-2">{petition.title}</h3>
      </div>
    </Link>
  );
};

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
