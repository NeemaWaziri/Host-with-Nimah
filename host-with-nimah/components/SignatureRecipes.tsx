import React from 'react';
import RecipeCard from './RecipeCard';
import { RecipeData } from '../types';

const recipes: RecipeData[] = [
  {
    title: "Zanzibar Pilau",
    description: "A fragrant celebration of the Spice Island, this rice dish is infused with cardamom, cinnamon, cloves, and cumin, traditionally served at weddings and festive gatherings.",
    prepInfo: ["Prep: 30m", "Cook: 45m", "Serves: 4-6"],
    ingredients: [
      "2 cups Basmati rice",
      "500g Beef or Chicken, cubed",
      "1 tbsp Cumin seeds",
      "1 tsp Cardamom pods",
      "1/2 tsp Cloves",
      "2 Cinnamon sticks",
      "1 cup Coconut milk",
      "2 Onions, sliced",
      "3 Garlic cloves, minced"
    ],
    instructions: [
      "Wash and soak rice. Boil meat with ginger and garlic until tender.",
      "Toast whole spices in oil until fragrant. Add onions and fry until golden brown.",
      "Add meat, browning it with the spices.",
      "Stir in rice, coating the grains with oil and spices.",
      "Add coconut milk and broth. Cover and cook on low heat until rice is fluffy."
    ],
    plating: "Serve on a large communal platter. Garnish with fresh cilantro and accompany with Kachumbari salad.",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Kuku Paka",
    description: "A coastal Tanzanian favorite, featuring grilled chicken smothered in a rich, smoky coconut curry sauce with turmeric and chilies.",
    prepInfo: ["Prep: 20m", "Cook: 40m", "Serves: 4"],
    ingredients: [
      "1 Whole Chicken, cut into pieces",
      "2 cups Coconut cream",
      "1 tbsp Turmeric powder",
      "3 Green chilies, pounded",
      "2 tbsp Ginger-garlic paste",
      "Fresh lemon juice",
      "Fresh coriander"
    ],
    instructions: [
      "Marinate chicken with lemon, salt, ginger, and garlic. Grill until charred.",
      "In a pan, simmer coconut cream with turmeric, chilies, and salt until thickened.",
      "Add the grilled chicken to the coconut sauce.",
      "Let it simmer for 10 minutes to absorb the flavors."
    ],
    plating: "Serve in a deep earthenware bowl, sprinkled generously with chopped coriander. Pair with naan or rice.",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Maharage ya Nazi",
    description: "Kidney beans simmered in creamy coconut milk—a comforting, vegetarian staple found in many Tanzanian homes.",
    prepInfo: ["Prep: 10m", "Cook: 30m", "Serves: 4"],
    ingredients: [
      "2 cups Kidney beans (cooked)",
      "1.5 cups Coconut milk",
      "1 Onion, chopped",
      "2 Tomatoes, diced",
      "1 tsp Curry powder",
      "1/2 tsp Turmeric"
    ],
    instructions: [
      "Sauté onions until soft. Add tomatoes and spices, cooking until they break down.",
      "Add the cooked kidney beans and stir well.",
      "Pour in the coconut milk and bring to a gentle simmer.",
      "Cook until the sauce thickens and coats the beans."
    ],
    plating: "Serve hot in individual bowls alongside Chapati or Wali wa Nazi (coconut rice).",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop"
  }
];

const SignatureRecipes: React.FC = () => {
  return (
    <section className="py-24 bg-nimah-cream/30 dark:bg-nimah-black transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="font-sans uppercase text-nimah-olive dark:text-nimah-rose tracking-[0.3em] text-xs font-bold">Culinary Heritage</span>
          <h2 className="font-serif text-5xl text-nimah-black dark:text-nimah-cream mt-6 mb-8">Taste of Tanzania</h2>
          <div className="w-24 h-1 bg-nimah-red mx-auto rounded-full mb-8"></div>
          <p className="font-sans text-nimah-black/70 dark:text-nimah-cream/80 max-w-2xl mx-auto leading-relaxed">
            Authentic recipes passed down through generations. From the streets of Stone Town to the shores of Dar es Salaam, experience the flavors that define my home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe, index) => (
            <div key={index} className="h-full">
               <RecipeCard data={recipe} className="h-full hover:-translate-y-2 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureRecipes;
