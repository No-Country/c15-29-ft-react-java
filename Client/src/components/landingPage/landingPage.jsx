import React from "react";
import Link from "next/link";
import Image from "next/image";


export default function () {
  return (
    <>
      <div>
        <div className="bg-white">
          <section className="bg-white dark:bg-gray-900 h-screen flex items-center justify-center">
            <div className="grid max-w-screen-xl grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-indigo-700 dark:text-white mb-4">
                  <span className="text-purple-500">Welcome</span> to Paw
                  Finders
                </h1>
                <p className="text-gray-700 dark:text-gray-400 mb-8">
                  Welcome to Paw Finders, your heartwarming gateway to pet
                  adoption! Explore our app and embark on a journey to find your
                  perfect furry companion. Every paw has a story, and here,
                  you'll discover the joy of giving a loving home to those who
                  need it most. Join us in making a difference, one adoption at
                  a time. 🐾 #AdoptDontShop
                </p>
                <div className="space-y-4">
                  <Link href="/adopt">
                    <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full inline-flex items-center transition-all duration-300 shadow-md">
                      <img
                        src="https://svgsilh.com/svg_v2/1084899.svg"
                        alt=""
                        className="fill-current w-4 h-4 mr-2"
                      />
                      <span>ADOPT NOW</span>
                    </button>
                  </Link>

                  <Link href="/register">
                    <button
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full inline-flex items-center transition-all duration-300 shadow-md mx-10
                    "
                    >
                      <img
                        src="https://svgsilh.com/svg_v2/1084899.svg"
                        alt=""
                        className="fill-current w-4 h-4 mr-2"
                      />
                      <span>Register to Adopt</span>
                    </button>
                  </Link>
                </div>
              </div>
              <div className=" lg:flex items-center">
                <Image
                  src="https://svgsilh.com/svg_v2/1084899.svg"
                  alt="hero image"
                  width={1800}
                  height={3200}
                  className="h-full"
                />
              </div>
            </div>
          </section>

          <section className="bg-gray-50 dark:bg-gray-800">
            <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">
              <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
                <div className="text-gray-500 sm:text-lg dark:text-gray-400">
                  <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    Why adopt a pet?
                  </h2>
                  <p className="mb-8 font-light lg:text-xl">
                    In Paw Finder, we will tell you the why
                  </p>

                  <ul
                    role="list"
                    className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700"
                  >
                    <li className="flex space-x-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                        help a street animal
                      </span>
                    </li>
                    <li className="flex space-x-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                        help an abused animal
                      </span>
                    </li>
                    <li className="flex space-x-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span class="text-base font-medium leading-tight text-gray-900 dark:text-white">
                        find a home for an animal
                      </span>
                    </li>
                    <div></div>
                    <Link href="/adopt">
                      <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center ">
                        <img
                          src="https://svgsilh.com/svg_v2/1084899.svg"
                          href="/adopt"
                          alt=""
                          className="fill-current w-4 h-4 mr-2"
                        />
                        <span>Adopt</span>
                      </button>
                    </Link>
                  </ul>
                  <p className="mb-8 font-light lg:text-xl">
                    Adopt a pet and fill your home with love
                  </p>
                </div>
                <Link href="/adopt">
                  <Image
                    src="/about.jpg"
                    alt="dashboard feature image"
                    width={800}
                    height={750}
                    className="rounded-lg shadow-md transition-transform transform hover:scale-105 duration-200"
                  />
                </Link>{" "}
              </div>

              <div class="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
                <Link href="#">
                  <Image
                    src="/dog1.jpg"
                    alt="Dog"
                    width={800}
                    height={750}
                    className="rounded-lg shadow-md transition-transform transform hover:scale-105 duration-200"
                  />
                </Link>{" "}
                <div className="text-gray-500 sm:text-lg dark:text-gray-400">
                  <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    Put an animal up for adoption
                  </h2>
                  <p className="mb-8 font-light lg:text-xl">
                    On this website you can put animals that need it up for
                    adoption.
                  </p>

                  <ul
                    role="list"
                    className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700"
                  >
                    <li className="flex space-x-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                        Post a pet that needs help
                      </span>
                    </li>
                    <li className="flex space-x-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                        Contact an interested party
                      </span>
                    </li>
                    <li className="flex space-x-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                        Check the pet's condition
                      </span>
                    </li>
                    <li className="flex space-x-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                        Agree and adopt a pet
                      </span>
                    </li>

                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                      <img
                        src="https://svgsilh.com/svg_v2/1084899.svg"
                        alt=""
                        class="fill-current w-4 h-4 mr-2"
                      />

                      <span>Give up for adoption</span>
                    </button>
                  </ul>
                  <p className="font-bold  lg:text-xl">
                    Paw finders communicates to you by telephone
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <section className="bg-white dark:bg-gray-900">
          <div className="items-center max-w-screen-xl px-4 py-8 mx-auto lg:grid lg:grid-cols-4 lg:gap-16 xl:gap-24 lg:py-24 lg:px-6">
            <div className="col-span-2 mb-8">
              <p className="text-lg font-medium text-purple-600 dark:text-purple-500">
                Trust paw finders
              </p>
              <h2 className="mt-3 mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-3xl dark:text-white">
                Here you could verify that the pets are vaccinated and in good
                hands
              </h2>
              <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
                Contact our users via phone
              </p>
              <div className="pt-6 mt-6 space-y-4 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <a
                    href="#"
                    className="inline-flex items-center text-base font-medium text-purple-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-700"
                  >
                    support a pet
                    <svg
                      className="w-5 h-5 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>
                <div>
                  <a
                    href="#"
                    className="inline-flex items-center text-base font-medium text-purple-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-700"
                  >
                    Paw finder
                    <svg
                      className="w-5 h-5 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-span-2 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
              <div>
                <svg
                  className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  className
                  <path
                    fill-rule="evenodd"
                    d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <h3 className="mb-2 text-2xl font-bold dark:text-white">
                  Pet lovers community
                </h3>
                <p className="font-light text-gray-500 dark:text-gray-400">
                  We are a community of pet lovers who care about them.
                </p>
              </div>
              <div>
                <svg
                  className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                </svg>
                <h3 className="mb-2 text-2xl font-bold dark:text-white">
                  Find pets in your area
                </h3>
                <p className="font-light text-gray-500 dark:text-gray-400">
                  Contact people in your area who need a pet or give it up for
                  adoption
                </p>
              </div>
              <div>
                <svg
                  className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <h3 className="mb-2 text-2xl font-bold dark:text-white">
                  For happy pets around the worlds
                </h3>
                <p className="font-light text-gray-500 dark:text-gray-400">
                  This service network is available to everyone
                </p>
              </div>
            </div>
          </div>
        </section>
        <div id="about">
        <section className="bg-gray-50 dark:bg-gray-800">
          <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-24 lg:px-6">
            <div className="mb-8">
              <h2 className="uppercase font-bold text-2xl lg:text-4xl">
                About Us
              </h2>
              <p className="mt-4 text-lg">
                We are a group of passionate developers actively seeking
                opportunities to make a mark in the world of development. Our
                journey with this project began with a shared commitment to
                improve the prospects and well-being of pets.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="uppercase font-bold text-2xl lg:text-4xl">
                Paw Finders Mission
              </h2>
              <p className="mt-4 text-lg">
                At{" "}
                <span className="font-bold text-yellow-700">Paw Finders</span>,
                we are driven by a deep commitment to creating loving homes for
                every pet. Our mission is to connect adoptable animals with
                caring individuals and families, fostering a future where no pet
                is left behind.
              </p>
              <p className="mt-4 text-lg">
                Through our user-friendly platform, we strive to simplify the
                adoption process, promote responsible pet ownership, and raise
                awareness about the joys of welcoming a furry friend into your
                life. At the heart of our mission is the belief that every pet
                deserves a second chance and a forever home. Join us in building
                a community that celebrates compassion, responsibility, and the
                unbreakable bond between pets and their human companions.
              </p>
            </div>

            <div>
              <h2 className="uppercase font-bold text-2xl lg:text-4xl">
                Paw Finders Vision
              </h2>
              <p className="mt-4 text-lg">
                At{" "}
                <span className="font-bold text-yellow-700">Paw Finders</span>,
                we envision a future where every pet finds a home filled with
                love and commitment. We picture a global community dedicated to
                responsible adoption, where people find fulfillment and joy in
                opening their hearts and homes to animals in need.
              </p>
              <p className="mt-4 text-lg">
                We strive to be a positive force that inspires and facilitates
                meaningful connections between adopters and pets, contributing
                to the reduction of shelter populations and fostering stronger,
                more compassionate relationships between humans and their animal
                companions.
              </p>
              <p className="mt-4 text-lg">
                In pursuing this vision, we aim to be a beacon of hope for all
                pets, tirelessly working towards a future where adoption is the
                first choice for those seeking the loyal companionship of a new
                furry friend.
              </p>
            </div>
          </div>
        </section>
        </div>

        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-24 lg:px-6">
            <figure className="max-w-screen-md mx-auto">
              <svg
                className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                viewBox="0 0 24 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                  fill="currentColor"
                />
              </svg>
              <blockquote>
                <p className="text-xl font-medium text-gray-900 md:text-2xl dark:text-white">
                  "Treat animals how you would like to be treated"
                </p>
              </blockquote>
              <figcaption className="flex items-center justify-center mt-6 space-x-3"></figcaption>
            </figure>
          </div>
        </section>
      </div>

      <footer className="bg-gray-800 text-white py-10">
  <div className="container mx-auto">
    {/* Logo and Description */}
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-yellow-500 mb-2">
        Paw Finders
      </h1>
      <p className="text-gray-400 text-sm md:text-base">
        Find your furry companion and transform lives through responsible pet adoption.
      </p>
    </div>

    {/* Sections */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { title: "Product", items: ["Stocks", "Register"], links: ["/adopt", "/register"] },
        { title: "Services", items: ["Adoption Form", "Our Team"], links: ["/#", "https://github.com/No-Country/c15-29-ft-react-java"] },
        { title: "User", items: ["Login", "About"], links: ["/login", "/#about"] },
      ].map((section, index) => (
        <div key={index} className="text-center">
          <p className="text-gray-500 font-semibold mb-2">{section.title}</p>
          <ul className="space-y-2">
            {section.items.map((item, i) => (
              <li key={i} className="text-gray-300 hover:text-blue-500 cursor-pointer">
                <a href={section.links[i]}>{item}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>

  {/* Copyright */}
  <div className="flex justify-center items-center mt-8">
    <p className="text-sm text-gray-500">
      © 2023-2024 All rights reserved -{" "}
      <span className="text-blue-500 cursor-pointer font-semibold">
        Paw Finder
      </span>
    </p>
  </div>
</footer>
    </>
  );
}
