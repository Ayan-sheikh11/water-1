import Link from "next/link";
import { ShoppingCart, Droplets, User } from "lucide-react";
import { useApp } from "./AppProvider";
export function Header() {
  const { cart, session, setSession, toast } = useApp();
  return (
    <header className="header">
      <div className="container nav">
        <Link href="/" className="brand">
          <span className="logo">
            <Droplets />
          </span>
          <span>
            PureFlow<small>PURE WATER • PURE TRUST</small>
          </span>
        </Link>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/track-order">Track Order</Link>
          <Link href="/faq">FAQ</Link>
        </nav>
        <div className="navActions">
          <Link className="cartBtn" href="/cart">
            <ShoppingCart /> <b>{cart.reduce((a, x) => a + x.qty, 0)}</b>
          </Link>
          {session ? (
            <button
              className="profileBtn"
              onClick={() => {
                setSession(null);
                toast("Logged out");
              }}
            >
              <User /> Logout
            </button>
          ) : (
            <Link className="loginBtn" href="/login">
              Login / Sign up
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="container footer">
        <div>
          <b>PureFlow</b>
          <p>Premium water delivery for Karachi.</p>
        </div>
        <div>
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/faq">FAQ</Link>
        </div>
        <div>
          <Link href="/track-order">Track order</Link>
          <Link href="/account">My account</Link>
        </div>
      </div>
    </footer>
  );
}
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
