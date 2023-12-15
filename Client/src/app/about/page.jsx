import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About",
  description: "About Paw Finders",
};

const Section = ({ title, children }) => (
  <section className="text-center mt-12">
    <h2 className="text-4xl md:text-6xl font-bold text-indigo-700">{title}</h2>
    <div className="mt-6 text-lg md:text-xl text-gray-700">{children}</div>
  </section>
);

const ImageWithText = ({ href, src, alt, text }) => (
  <Link href={href}>
    <div className="relative group cursor-pointer">
      <Image
        src={src}
        alt={alt}
        width={400}
        height={220}
        className="rounded-lg shadow-md transition-transform transform hover:scale-105 duration-200"
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <p className="text-white font-bold">{text}</p>
      </div>
    </div>
  </Link>
);

const AboutPage = () => (
  <main className="bg-gray-100">
    <div className="container mx-auto p-8">
      <Section title="About Us">
        <p>
          We are a group of passionate developers actively seeking opportunities
          to make a mark in the world of development. Our journey with this
          project began with a shared commitment to improve the prospects and
          well-being of pets.
        </p>
        <p className="mt-4">
          Committed to our cause, we invite you to join us on this exciting
          venture. Together, through innovation and unwavering dedication, we
          aim to shape a brighter and more promising future for pets worldwide.
        </p>
      </Section>

      <Section title="Paw Finders Mission">
        <p>
          At <span className="font-bold text-yellow-700">Paw Finders</span>, we
          are driven by a deep commitment to creating loving homes for every
          pet. Our mission is to connect adoptable animals with caring
          individuals and families, fostering a future where no pet is left
          behind.
        </p>
        <p className="mt-4">
          Through our user-friendly platform, we strive to simplify the adoption
          process, promote responsible pet ownership, and raise awareness about
          the joys of welcoming a furry friend into your life. At the heart of
          our mission is the belief that every pet deserves a second chance and
          a forever home. Join us in building a community that celebrates
          compassion, responsibility, and the unbreakable bond between pets and
          their human companions.
        </p>
      </Section>

      <Section title="Paw Finders Vision">
        <p>
          At <span className="font-bold text-yellow-700">Paw Finders</span>, we
          envision a future where every pet finds a home filled with love and
          commitment. We picture a global community dedicated to responsible
          adoption, where people find fulfillment and joy in opening their
          hearts and homes to animals in need.
        </p>
        <p className="mt-4">
          We strive to be a positive force that inspires and facilitates
          meaningful connections between adopters and pets, contributing to the
          reduction of shelter populations and fostering stronger, more
          compassionate relationships between humans and their animal
          companions.
        </p>
        <p className="mt-4">
          In pursuing this vision, we aim to be a beacon of hope for all pets,
          tirelessly working towards a future where adoption is the first choice
          for those seeking the loyal companionship of a new furry friend.
        </p>
      </Section>

      {/* Image Section */}
      <section className="mt-12">
        <div className="flex justify-between mb-8">
          <ImageWithText
            href="/adopt"
            src="/about.jpg"
            alt="Mission Image 1"
            text="Adopt Now"
          />
          <ImageWithText
            href="/register"
            src="/about.jpg"
            alt="Mission Image 2"
            text="Register"
          />
          <ImageWithText
            href="/adopt"
            src="/about.jpg"
            alt="Mission Image 3"
            text="Form pets"
          />
        </div>
      </section>
    </div>
  </main>
);

export default AboutPage;
