import { StarIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ProductCard({ name, image, price, onAddToCart }) {
  return (
    <Card className={cn("w-full")}>
      <CardHeader className="mb-0 space-y-0 pb-0">
        <div className="w-full h-full">
          <img
            className="w-full aspect-square h-full object-cover"
            src={image}
            alt={name}
          />
        </div>
        <CardTitle className="text-primary text-xl space-y-0 font-medium font-['Rubik']">
          {name}
        </CardTitle>
      </CardHeader>

      <CardContent className="text-[#020817] text-[25.20px] font-semibold">
        <div className="inline-flex">
          <StarIcon className="fill-black" />
          <StarIcon className="fill-black" />
          <StarIcon className="fill-black" />
          <StarIcon className="fill-black" />
          <StarIcon className="fill-black" />
        </div>
        <h4>Rs. {price}</h4>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full py-6 bg-primary text-white rounded-none"
          onClick={onAddToCart}
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
