"use client";
import FeatureCard from "@/components/FeatureCard";
import {
  CheckCircle2,
  ArrowRight,
  Building2,
  Truck,
  Users,
  Package,
  BarChart3,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ReviewsCard from "./ReviewsCard";

const Hero = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full flex flex-col items-center justify-center pt-36 pb-40 px-4 text-center">
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
            className="bg-blue-600 hover:bg-blue-700 text-white transition-all px-6 py-3 rounded-lg font-medium flex items-center gap-2 mb-6"
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

        {/* Features Section */}
        <section id="features" className="w-full bg-[#0a0e1a] py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <div className="bg-[#232740] text-sm px-4 py-1 rounded-full mb-6 flex items-center gap-2">
                <span className="text-muted-foreground font-medium">
                  Powerful Features
                </span>
              </div>
              <h2 className="text-white text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Everything You Need to Manage Your Logistics
              </h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our comprehensive platform provides all the tools you need to
                streamline your operations and deliver exceptional service.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Building2 className="h-6 w-6 text-primary" />}
                title="Company Management"
                description="Manage all your partner companies with detailed profiles, order history, and performance analytics."
              />
              <FeatureCard
                icon={<Truck className="h-6 w-6 text-primary" />}
                title="Vehicle Tracking"
                description="Track your entire fleet in real-time with maintenance schedules, utilization metrics, and status updates."
              />
              <FeatureCard
                icon={<Users className="h-6 w-6 text-primary" />}
                title="Driver Management"
                description="Manage driver profiles, licenses, certifications, and availability for optimal assignment and scheduling."
              />
              <FeatureCard
                icon={<Package className="h-6 w-6 text-primary" />}
                title="Order Tracking"
                description="Create and track orders from pickup to delivery with real-time status updates, notifications, and delivery confirmations."
              />
              <FeatureCard
                icon={<BarChart3 className="h-6 w-6 text-primary" />}
                title="Analytics & Reporting"
                description="Gain valuable insights with comprehensive analytics and customizable reports to optimize your operations."
              />
              <FeatureCard
                icon={<Globe className="h-6 w-6 text-primary" />}
                title="Route Optimization"
                description="Optimize delivery routes to reduce fuel costs, improve delivery times, and increase overall efficiency."
              />
            </div>
          </div>
        </section>
        {/*How it works section */}
        <section
          id="how-it-works"
          className="w-full bg-[#0d1526] py-16 md:py-24"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center flex flex-col items-center gap-4">
              <div className="bg-[#232740] text-sm px-4 py-1 rounded-full mb-6 flex items-center gap-2">
                <span className="text-muted-foreground font-medium">
                  Simple Process
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white">
                How LogiFlow Works
              </h2>
              <p className="text-muted-foreground max-w-xl text-lg md:text-xl">
                Get up and running in minutes with our intuitive platform
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {[
                {
                  step: "1",
                  title: "Create Your Account",
                  desc: "Sign up for a free account and set up your company profile in minutes.",
                  icon: <Users className="h-10 w-10 text-primary" />,
                },
                {
                  step: "2",
                  title: "Add Your Resources",
                  desc: "Add your vehicles, drivers, and partner companies to the platform.",
                  icon: <Truck className="h-10 w-10 text-primary" />,
                },
                {
                  step: "3",
                  title: "Start Managing Orders",
                  desc: "Create and track orders, assign drivers, and optimize your operations.",
                  icon: <Package className="h-10 w-10 text-primary" />,
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex flex-col items-center text-center text-white"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span className="text-xl font-bold">{item.step}</span>
                  </div>
                  <div className="mt-4 h-24 w-24 rounded-full bg-white/5 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-muted-foreground max-w-xs">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 flex justify-center">
              <Link
                href="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 font-medium px-6 py-3 rounded-lg flex items-center gap-2"
              >
                Get Started Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/*Reviews section */}
        <section id="reviews" className="w-full bg-[#0a0e1a] py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <div className="bg-[#232740] text-sm px-4 py-1 rounded-full mb-6 flex items-center gap-2">
                <span className="text-muted-foreground font-medium">
                  Customer Stories
                </span>
              </div>
              <h2 className="text-white text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Trusted by Logistics Leaders
              </h2>
              <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See what our customers have to say about LogiFlow
              </p>
            </div>

            <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <ReviewsCard
                name="Sarah Johnson"
                role="Operations Manager, BlueLine Transport"
                testimonial="LogiFlow has transformed how we manage our fleet and orders. The intuitive interface and comprehensive features have saved us countless hours and improved our delivery times by 28%."
                image="rev1.jpg"
              />
              <ReviewsCard
                name="Michael Chen"
                role="CEO, TransGlobal Express"
                testimonial="Since implementing LogiFlow, we've seen a 30% increase in operational efficiency and a significant reduction in delivery delays. The real-time tracking feature has been a game-changer for our customers."
                image="rev2.jpg"
              />
              <ReviewsCard
                name="David Rodriguez"
                role="Fleet Manager, MetroLink Logistics"
                testimonial="The vehicle tracking and maintenance features have helped us extend the life of our fleet and reduce unexpected breakdowns by 45%. The ROI has been incredible."
                image="rev3.jpg"
              />
            </div>

            <div className="mt-16 flex justify-center">
              <Button
                size="lg"
                className="h-12 px-8 rounded-md bg-muted border border-white/10 text-white font-medium 
                inline-flex items-center gap-2 transition-all hover:bg-[#1e293b] hover:border-transparent"
                asChild
              >
                <Link href="/case-studies">
                  View All Case Studies
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Hero;
