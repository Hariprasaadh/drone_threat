
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Alex Chen",
    role: "Security Director",
    company: "AeroCorp Industries",
    content: "The AI-powered drone detection system has transformed our security operations. We've seen a 95% reduction in unauthorized airspace breaches since implementation.",
    rating: 5
  },
  {
    name: "Sarah Johnson",
    role: "Chief Technology Officer",
    company: "GlobeTech Security",
    content: "No other solution provides this level of accuracy in drone threat assessment. The real-time alerts and automated response capabilities are unmatched in the industry.",
    rating: 5
  },
  {
    name: "Michael Rodriguez",
    role: "Airport Security Manager",
    company: "International Aviation Authority",
    content: "Our airport has dealt with numerous drone incursions over the years. This platform not only detects them but predicts flight patterns, giving us crucial time to respond.",
    rating: 4
  }
];

const TestimonialsCarousel = () => {
  return (
    <section className="py-20 relative z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-drone-indigo/5 to-black opacity-50"></div>
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-1.5 bg-drone-blue/10 rounded-full text-drone-blue text-sm font-medium mb-4">
            Trusted By Leaders
          </div>
          <h2 className="text-4xl font-bold mb-4">What Security Professionals Say</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See why organizations worldwide trust our drone security platform to protect their most critical infrastructure.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/1 lg:basis-3/4">
                  <div className="glass-card rounded-2xl p-8 shadow-lg border border-white/10 h-full backdrop-blur-lg">
                    <div className="mb-6 text-drone-blue">
                      <Quote className="w-12 h-12 opacity-50" />
                    </div>
                    <p className="text-gray-300 text-lg mb-8 italic leading-relaxed">"{testimonial.content}"</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-white">{testimonial.name}</p>
                        <p className="text-gray-400 text-sm">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-drone-blue fill-drone-blue' : 'text-gray-600'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="relative inset-0 translate-y-0 left-0 bg-black/20 hover:bg-black/40 border border-white/10" />
              <CarouselNext className="relative inset-0 translate-y-0 right-0 bg-black/20 hover:bg-black/40 border border-white/10" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
