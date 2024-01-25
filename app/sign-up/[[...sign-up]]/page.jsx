import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <div className="h-full w-full flex items-center justify-center absolute inset-0 left-0 top-0 object-cover opacity-90">
            <Image
              alt="Night"
              src="/Image/main_logo.png"
              width="1500"
              height="2000"
              className=" h-auto w-[7rem] lg:w-[60%] lg:mt-[-20vh]"
            />
          </div>

          <div className="hidden lg:relative lg:block lg:p-12">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl flex items-center justify-start gap-2">
              Welcome to Sharekaro.
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Join shareKaro today and experience hassle-free file sharing like
              never before. Our platform offers a seamless and secure way to
              share files with friends, family, and colleagues.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
                href="/"
              >
                <span className="sr-only">Home</span>
                <Image
                  width="600"
                  height="500"
                  src="/Image/only_logo.png"
                  className="h-10 w-20"
                />
              </a>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Sharekaro.
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Join shareKaro today and experience hassle-free file sharing
                like never before. Our platform offers a seamless and secure way
                to share files with friends, family, and colleagues.
              </p>
            </div>
            <SignUp />;
          </div>
        </main>
      </div>
    </section>
  );
}
