import { ProductCard } from "@/components/PhoneCard";
import { mobileData } from "@/data/mobile";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const { addToCart } = useOutletContext();

  return (
    <main className="relative">
      <section className="flex justify-center px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <img
          className="h-[445.81px] relative"
          src="https://via.placeholder.com/1286x446"
        />
      </section>

      <section>
        <div className="py-8 min-h-screen px-8 mx-autopx-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 justify-center">
            {mobileData.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                image={product.src}
                price={product.price}
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
