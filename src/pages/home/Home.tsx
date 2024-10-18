import { ProductCard } from "@/components/PhoneCard";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const { addToCart, products, removeFromCart } = useOutletContext();

  return (
    <main className="relative">
      <section className="flex justify-center px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <img
          className="h-[445.81px] relative w-full"
          src="/images/Google-Pixel-9-Pro.webp"
        />
      </section>

      <section>
        <div className="py-8 min-h-screen px-8 mx-autopx-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 justify-center">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.src}
                price={product.price}
                onAddToCart={() => addToCart(product.id)}
                stock={product.stock}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
