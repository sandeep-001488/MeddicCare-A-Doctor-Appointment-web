import { Button } from '@/components/ui/button'
import React from 'react'

function Hero() {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
            <img
              alt=""
              width={800}
              height={800}
              src="/doctors.jpg"
              className="absolute inset-0 h-full w-full object-cover rounded-3xl"
            />
          </div>

          <div className="lg:py-24">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Get <span className="text-blue-500 font-serif">Appointments</span>{" "}
              with your favourites{" "}
              <span className="text-red-500 font-serif">Doctors</span>{" "}
            </h2>

            <p className="mt-4 text-gray-600">
              Book an appointment with your favorite doctors today! Whether it's
              a routine check-up or a specialized consultation, easily schedule
              your visit and get the care you need. Don't wait—your health is
              our priority!
            </p>

            <Button className="bg-teal-700 mt-5">Explore Now</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero
