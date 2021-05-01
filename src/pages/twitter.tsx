import React from 'react';
import { Tweet } from 'react-static-tweets';
import 'react-static-tweets/styles.css';

const Twitter = (): JSX.Element => (
  // <div>
  //   <Tweet id={'831663358721957888'} />
  // </div>
  <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
          Twitter Wisdom
        </h1>
        <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
          The only true wisdom is in knowing you know nothing. ~ Socrates
        </p>
      </div>
      <div className="flex flex-wrap -m-4">
        <div className="xl:w-1/3 md:w-1/2 p-4">
          <Tweet id={'831663358721957888'} />
        </div>
        <div className="xl:w-1/3 md:w-1/2 p-4">
          <Tweet id={'1045809734069170176'} />
        </div>
        <div className="xl:w-1/3 md:w-1/2 p-4">
          <Tweet id={'1309812600117645312'} />
        </div>
        <div className="xl:w-1/3 md:w-1/2 p-4">
          <Tweet id={'1230124124342816768'} />
        </div>
        <div className="xl:w-1/3 md:w-1/2 p-4">
          {/* <Tweet id={'831663358721957888'} /> */}
        </div>
        <div className="xl:w-1/3 md:w-1/2 p-4">
          {/* <Tweet id={'831663358721957888'} /> */}
        </div>
      </div>
      {/* <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        Button
      </button> */}
    </div>
  </section>
);

export default Twitter;
