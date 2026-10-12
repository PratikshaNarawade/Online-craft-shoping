import { PolicyFrame } from "../policy-frame";

export default function ShippingPolicy() {
  return (
    <PolicyFrame title="Shipping">
      <p>We ship across India. Orders are packed by hand and usually leave the studio within 2–3 business days.</p>
      <p>
        Delivery typically takes 5–8 business days depending on your city. Free shipping applies on prepaid orders above ₹999.
        Standard shipping is ₹79.
      </p>
    </PolicyFrame>
  );
}
