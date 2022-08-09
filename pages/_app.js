import "../styles/globals.css";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className="flex flex-col items-center">
        <Link href="/">
          <h1 className="text-5xl font-bold pt-8 pb-4">Crypto Pets</h1>
        </Link>

        <p className="italic">Your pet on the blockchain!</p>
        <div className="py-6">
          <Link href="/explore">
            <a className="mr-6 text-blue-600">Explore</a>
          </Link>
          <Link href="/register-pet">
            <a className="mr-6 text-blue-600">Register Pet</a>
          </Link>
          <Link href="/my-pets">
            <a className="mr-6 text-blue-600">My Pets</a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
