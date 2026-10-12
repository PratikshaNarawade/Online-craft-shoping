"use client";

import { useCart } from "./cart-provider";

export function AddButton({ productId, disabled }: { productId: string; disabled?: boolean }) {
  const { add } = useCart();
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => add(productId)}
      className="mt-2 text-[10px] tracking-[0.18em] uppercase text-hot disabled:opacity-40"
    >
      {disabled ? "Sold out" : "Add to cart"}
    </button>
  );
}
