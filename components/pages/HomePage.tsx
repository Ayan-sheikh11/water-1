"use client";
import Link from "next/link";
import {
  ChevronRight,
  Droplets,
  Truck,
  ShieldCheck,
  Boxes,
  Tag,
  MapPin,
} from "lucide-react";
import { useApp } from "../AppProvider";
import { ProductCard } from "../ProductCard";
export function HomePage() {
  const { products } = useApp();
  return (
    <>
      <main>
        <section className="hero">
          <div className="container heroGrid">
            <div>
              <span className="eyebrow">PURE • FRESH • DELIVERED</span>
              <h1>
                Crystal-clear water,
                <br />
                <em>delivered to your door.</em>
              </h1>
              <p>
                Premium drinking water with simple ordering, live stock
                visibility and reliable Karachi delivery.
              </p>
              <div className="heroBtns">
                <Link className="primary big" href="/products">
                  Order water <ChevronRight />
                </Link>
                <Link className="ghost big" href="/track-order">
                  Track my order
                </Link>
              </div>
              <div className="trust">
                <span>
                  <ShieldCheck />
                  Quality checked
                </span>
                <span>
                  <Truck />
                  Fast delivery
                </span>
                <span>
                  <MapPin />
                  Karachi only
                </span>
              </div>
            </div>
            <div className="waterVisual">
              <div className="orb" />
              <div className="bottle">
                <div className="cap" />
                <div className="bottleLabel">
                  <Droplets />
                  <b>PUREFLOW</b>
                  <small>PURE WATER</small>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="sectionHead">
              <div>
                <span className="eyebrow">BEST SELLERS</span>
                <h2>Choose your water</h2>
              </div>
              <Link href="/products">View all →</Link>
            </div>
            <div className="productGrid">
              {products.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          </div>
        </section>
        <section className="featureBand">
          <div className="container features">
            {[
              [<Droplets />, "Pure by design"],
              [<Truck />, "Delivered fresh"],
              [<Boxes />, "Smart stock"],
              [<Tag />, "Volume offers"],
            ].map((x, i) => (
              <div className="feature" key={i}>
                <span>{x[0]}</span>
                <div>
                  <b>{x[1]}</b>
                  <p>Simple, clean and customer friendly.</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
