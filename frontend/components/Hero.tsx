"use client";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center px-4 text-center">

      <div className="bg-[#232740] text-sm px-4 py-1 rounded-full mb-6 flex items-center gap-2">
        <span className="text-primary font-medium">New</span>
        <span className="text-muted-foreground">
          Real-time tracking now available
        </span>
      </div>

      <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold max-w-4xl mb-6 leading-tight">
        Streamline Your Logistics Operations
      </h1>

      <p className="text-lg text-gray-400 max-w-2xl mb-10">
        The all-in-one platform that helps logistics companies manage their
        entire workflow — from orders and inventory to vehicles and drivers.
      </p>

      <Link
        href="/signup"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 mb-6"
      >
        Get Started Free <ArrowRight className="h-4 w-4" />
      </Link>

      <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mb-10">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="text-blue-400 h-4 w-4" />
          No credit card required
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="text-blue-400 h-4 w-4" />
          14-day free trial
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="text-blue-400 h-4 w-4" />
          Cancel anytime
        </div>
      </div>

      <p className="uppercase text-sm text-gray-500 mb-4 tracking-wide">
        Trusted by logistics companies worldwide
      </p>
      <div className="flex flex-wrap justify-center gap-6 text-gray-300 font-semibold text-lg">
        <span>ACME Logistics</span>
        <span>GlobalShip</span>
        <span>FastFreight</span>
        <span>TransWorld</span>
        <span>CargoMasters</span>
      </div>
    </section>
  );
};

export default Hero;
