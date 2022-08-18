import MetaDecorator from "components/MetaDecorator";
import type { NextPage } from "next";
import Image from "next/image";
import InfoCard from "components/home/InfoCard";
import ShortText from "components/icons/ShortText";
import GPS from "components/icons/GPS";

const Home: NextPage = () => {
  return (
    <>
      <MetaDecorator description="Resolu is a global platform for petitions and petitions. We help you to create, sign, and share petitions by using short form content" />
      <main className="container-custom grid grid-cols-1 pt-6 md:py-2 lg:pt-12 lg:pb-24 md:grid-cols-2">
        <div className="flex flex-col align-center justify-center">
          <h1 className="mb-1">Petitions just got a whole lot easier!</h1>
          <p className="md:max-w-[90%] lg:max-w-[80%]">
            The world is shifting to short form content, so why don&apos;t
            petitions? Resolu is a global platform for petitions and petitions.
            We help you to create, sign, and share petitions by using short form
            content. Record, upload, and share your petition!
          </p>
        </div>
        <div className="w-full h-96 md:h-112 relative">
          <Image
            src="/logo.png"
            alt="Resolu Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </main>
      <section className="gray-section">
        <div className="container-custom py-10 md:py-16">
          <h1>What is Resolu?</h1>
          <p className="md:max-w-xl lg:max-w-2xl">
            Resolu is a one-stop platform that revolutionizes how petitions are
            made. Resolu &quot;resolves&quot;, or, simplifies the entire process
            and streamlines communication so you can increase the reach of your
            petitions exponentially.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <InfoCard
              title="Short-form content"
              description="Remove the need for writing and reading long descriptions. With short videos, images, and text, you can create petitions that are easy to read and understand."
              Icon={ShortText}
            />

            <InfoCard
              title="GPS Powered"
              description="Reach the right people by using GPS. Resolu can help you find the right people and reach them."
              Icon={GPS}
            />

            {/* <InfoCard
              title="Comprehensive Search"
              description="A simple, comprehensive tool to search listings efficiently,
                with filters like grades, subjects, and more. Need a book by its
                ISBN? Try out our ISBN filter!"
              Icon={Search}
            /> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
