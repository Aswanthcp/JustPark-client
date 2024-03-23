import React from "react";

const AboutMePartial = () => {
  return (
    <div>
      <div class="mx-auto max-w-7xl px-4">
        <div class="mt-16 flex items-center">
          <div class="space-y-6 md:w-3/4">
            <div class="max-w-max rounded-full border bg-gray-50 p-1 px-3">
              <p class="text-xs font-semibold leading-normal md:text-sm">
                Join Us →
              </p>
            </div>
            <p class="text-3xl font-bold text-gray-900 md:text-4xl">
              Meet our team
            </p>
            <p class="max-w-4xl text-base text-gray-700 md:text-xl">
              Our philosophy is simple — hire a team of diverse, passionate
              people and foster a culture that empowers you to do your best
              work.
            </p>
            <div></div>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-4 gap-y-6 border-b border-gray-300 py-12 pb-20 md:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-md border">
            <img
              src="images/alwin.jpg"
              alt="Victória Silva"
              class="h-[300px] w-full rounded-lg object-cover "
            />
            <p class="mt-6 w-full px-2 text-xl  font-semibold text-gray-900">
              Alwin
            </p>
            <p class="w-full px-2 pb-6 text-sm font-semibold text-gray-500">
              Co Founder
            </p>
          </div>
          <div class="rounded-md border">
            <img
              src="images/aswanth.jpg"
              alt="Aswanth C P"
              class="h-[300px] w-full rounded-lg object-cover "
            />
            <p class="mt-6 w-full px-2 text-xl  font-semibold text-gray-900">
              Aswanth C P
            </p>
            <p class="w-full px-2 pb-6 text-sm font-semibold text-gray-500">
              Co Founder
            </p>
          </div>
          <div class="rounded-md border">
            <img
              src="https://images.unsplash.com/photo-1549351512-c5e12b11e283?q=80&amp;fm=jpg&amp;crop=faces&amp;fit=crop&amp;h=600&amp;w=600"
              alt="Gabrielle Fernandez"
              class="h-[300px] w-full rounded-lg object-cover "
            />
            <p class="mt-6 w-full px-2 text-xl  font-semibold text-gray-900">
              Gabrielle Fernandez
            </p>
            <p class="w-full px-2 pb-6 text-sm font-semibold text-gray-500">
              Sales
            </p>
          </div>
          <div class="rounded-md border">
            <img
              src="https://images.unsplash.com/photo-1485960994840-902a67e187c8?q=80&amp;fm=jpg&amp;crop=faces&amp;fit=crop&amp;h=600&amp;w=600"
              alt="Sadie Lewis"
              class="h-[300px] w-full rounded-lg object-cover "
            />
            <p class="mt-6 w-full px-2 text-xl  font-semibold text-gray-900">
              Sadie Lewis
            </p>
            <p class="w-full px-2 pb-6 text-sm font-semibold text-gray-500">
              Sales
            </p>
          </div>
        </div>

        <div class="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
          <div class="max-w-max rounded-full border bg-gray-50 p-1 px-3">
            <p class="text-xs font-semibold leading-normal md:text-sm">
              About the company
            </p>
          </div>
          <p class="text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
            Made with love, right here in India
          </p>
          <p class="max-w-4xl text-base text-gray-600 md:text-xl">
            From managing parking lot transactions to ensuring global tax
            compliance, car parking companies worldwide rely on Flowbite to
            streamline their payment processes.
          </p>
        </div>

        <div class="my-8 flex flex-col gap-y-6 md:flex-row lg:justify-around">
          <div class="flex flex-col space-y-3 md:w-2/4 lg:w-1/5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-5 w-5"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <p class="w-full text-xl font-semibold  text-gray-900">
              Bengaluru office
            </p>
            <p class="w-full text-base text-gray-700">Mon-Sat 9am to 5pm.</p>
            <p class="text-sm font-medium">
              100, Electronic City Phase-1, Bengaluru, Karnataka 560100 IN
            </p>
          </div>
          <div class="flex flex-col space-y-3 md:w-2/4 lg:w-1/5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-5 w-5"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <p class="w-full text-xl font-semibold  text-gray-900">
              Head office
            </p>
            <p class="w-full text-base text-gray-700">Mon-Sat 9am to 5pm.</p>
            <p class="text-sm font-medium">
              12th Main Rd, Indiranagar, Bengaluru, Karnataka 560008 IN
            </p>
          </div>
          <div class="flex flex-col space-y-3 md:w-2/4 lg:w-1/5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-5 w-5"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <p class="w-full text-xl font-semibold  text-gray-900">
              Karnataka office
            </p>
            <p class="w-full text-base text-gray-700">Mon-Sat 9am to 5pm.</p>
            <p class="text-sm font-medium">
              42, Residency Rd, Shanthala Nagar, Ashok Nagar, Bengaluru,
              Karnataka 560025 IN
            </p>
          </div>
        </div>
        <hr class="mt-20" />
      </div>
      <hr class="mt-6" />
    </div>
  );
};

export default AboutMePartial;
