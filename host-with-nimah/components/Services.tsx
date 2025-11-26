import React, { useState } from 'react';

const services = [
  {
    title: "Intimate Dinners",
    description: "Curated menus for small gatherings where conversation flows as freely as the wine.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Table Styling",
    description: "Aesthetic tablescapes that set the mood before the first course is even served.",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Menu Design",
    description: "Bespoke culinary journeys tailored to your preferences and dietary needs.",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const Services: React.FC = () => {
  // Track loading state for each image by index
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => ({ ...prev, [index]: true }));
  };

  return (
    <section id="services" className="py-32 bg-nimah-cream dark:bg-nimah-olive transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
            <h2 className="font-serif text-5xl text-nimah-black dark:text-nimah-cream mb-6">Life of Nimah</h2>
            <div className="w-px h-16 bg-nimah-red dark:bg-nimah-cream mx-auto mb-6"></div>
            <p className="text-nimah-olive dark:text-nimah-cream/90 font-sans tracking-wide">MORE THAN FOOD. IT'S AN EXPERIENCE.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="overflow-hidden mb-8 relative aspect-[3/4] border border-nimah-black/10 dark:border-nimah-cream/10 bg-nimah-rose/10">
                {/* Skeleton Loader */}
                {!imagesLoaded[index] && (
                  <div className="absolute inset-0 bg-nimah-rose/20 dark:bg-nimah-cream/10 animate-pulse z-10" />
                )}
                
                <img 
                  src={service.image} 
                  alt={service.title} 
                  onLoad={() => handleImageLoad(index)}
                  className={`w-full h-full object-cover transition-all duration-1000 ease-in-out group-hover:scale-110 grayscale group-hover:grayscale-0 ${imagesLoaded[index] ? 'opacity-100' : 'opacity-0'}`}
                />
                
                <div className="absolute inset-0 bg-nimah-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <h3 className="font-serif text-3xl text-nimah-black dark:text-nimah-cream mb-3 group-hover:text-nimah-red dark:group-hover:text-nimah-cream transition-colors">
                {service.title}
              </h3>
              <p className="font-sans text-nimah-black/70 dark:text-nimah-cream/80 text-base leading-relaxed border-t border-nimah-black/10 dark:border-nimah-cream/20 pt-4 mt-4">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;