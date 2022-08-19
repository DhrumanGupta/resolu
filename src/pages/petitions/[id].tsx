import MetaDecorator from "components/MetaDecorator";
import type { NextPage } from "next";
import InputGroup from "components/InputGroup";
import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { petitionRoutes } from "data/Routes";
import useAxiosData from "hooks/useAxiosData";
import { Petition } from "types/DTOs";
import Loading from "components/UI/Loading";
import { useRouter } from "next/router";
import NotFound from "pages/404";
import { VideoPlayer } from "components/VideoPlayer";
import MapChart from "components/MapChart";
import clsx from "clsx";
import useSWR from "swr";
import { PrimaryButton } from "components/Button";

const GoalViewer: React.FC<{
  goal: number;
  current: number;
  className?: string;
  id: string;
  mutate: any;
}> = ({ goal, current, className, id, mutate }) => {
  const [emailInput, setEmailInput] = useState("");
  const [error, setError] = useState(false);

  return (
    <div className={clsx(className)}>
      <h3 className="mt-4 font-bold">Goal</h3>
      <div className="w-full h-2 bg-gray-light rounded overflow-hidden mt-1">
        <div
          className="h-full rounded bg-orange"
          style={{ width: `${(current * 100) / goal}%` }}
        />
      </div>
      <p className="mt-2">
        {current} out of {goal} reached. {goal - current} signs to go!
      </p>

      <h3 className="my-4 font-bold">Sign the Petition!</h3>
      <form
        onClick={(e) => {
          e.preventDefault();
          setError(false);

          axios
            .post(petitionRoutes.sign, {
              email: emailInput,
              petitionId: id,
            })
            .then((r) => {
              mutate(null);
              setError(false);
            })
            .catch((e) => {
              setError(true);
            });
        }}
      >
        <InputGroup
          setValue={setEmailInput}
          value={emailInput}
          label={"Email"}
          type={"email"}
          inputClassName={clsx(error && "border-2 border-red")}
        />

        <PrimaryButton
          className={clsx("mt-2 w-full", error && "border-2 border-red")}
        >
          Sign!
        </PrimaryButton>
      </form>
    </div>
  );
};

const Home: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: petition,
    mutate,
    error,
  } = useSWR<{ data: Petition }>(
    petitionRoutes.getFromId(id as string),
    (key) => axios.get(key)
  );

  const loading = Boolean(!error && !petition);

  if (loading || !id) {
    return (
      <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2">
        <Loading />
      </div>
    );
  }

  if (!petition) {
    return <NotFound />;
  }

  return (
    <>
      <MetaDecorator description="Resolu is a global platform for petitions and petitions. We help you to create, sign, and share petitions by using short form content" />
      <main className="container-custom pt-6 lg:pt-12 mb-6">
        <h1 className="mb-4">{petition.data.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <VideoPlayer
            className="w-full rounded-md"
            id={petition.data.videoId}
          />
          <MapChart
            lat={petition.data.latitude}
            long={petition.data.longitude}
            className={
              "lg:hidden rounded-md w-full h-[100vw] md:mt-0 md:aspect-w-9 md:aspect-h-16 md:h-full mt-6"
            }
          />
          <div className="hidden lg:grid grid-cols-1">
            <MapChart
              lat={petition.data.latitude}
              long={petition.data.longitude}
              className={"rounded-md w-full maspect-w-1 aspect-h-1"}
            />
            <GoalViewer
              goal={petition.data.goal}
              current={petition.data.votes}
              id={id as string}
              mutate={mutate}
            />
          </div>
        </div>

        <GoalViewer
          goal={petition.data.goal}
          current={petition.data.votes}
          className="lg:hidden"
          id={id as string}
          mutate
        />

        <h3 className="mt-4 font-bold">Description</h3>
        <p>{petition.data.description}</p>
      </main>
    </>
  );
};

export default Home;
