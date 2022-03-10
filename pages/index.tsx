import type { NextPage } from "next";
import Head from "next/head";
import { Layout } from "../components/layout";

// Main landing page
const Home: NextPage = () => {
  return (
    <Layout privateRoute={false} title="Home">
      <>
        <section className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-col items-center md:w-1/2">
                <h1 className="text-3xl font-bold text-gray-800">
                  Welcome to Eagles Mere Park Association
                </h1>
                <p className="text-gray-600 m-2">
                  The Eagles Mere Park Association is a 501(c)(3) non-profit
                  organization that provides a safe, secure, and fun environment
                  for all to enjoy.
                </p>
                <p className="text-gray-600 m-2">
                  We are a group of individuals who enjoy the outdoors and enjoy
                  the community.
                </p>
              </div>
              <div className="flex flex-col items-center md:w-1/2">
                <img
                  className="w-full md:w-1/2"
                  src="/images/home-hero.jpg"
                  alt="Eagles Mere Park Association"
                />
              </div>
            </div>
          </div>
        </section>

        {/* a section that is is split in two. One half will display upcoming events.  The other side will give links to different parts of the website. */}
        <section className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-col items-center md:w-1/2">
                <h1 className="text-3xl font-bold text-gray-800">
                  Upcoming Events
                </h1>
                <p className="text-gray-600 m-2">
                  We are currently planning to host a variety of events
                  throughout the year.
                </p>
                <p className="text-gray-600 m-2">
                  Check out the upcoming events below to see what we are
                  planning to do.
                </p>
              </div>
              <div className="flex flex-col items-center md:w-1/2">
                <img
                  className="w-full md:w-1/2"
                  src="/images/home-events.jpg"
                  alt="Eagles Mere Park Association"
                />
              </div>
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
};

export default Home;
