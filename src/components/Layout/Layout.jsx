import { Suspense } from "react";
import Navigation from "../Navigation/Navigation";
import Loader from "../Loader/Loader";

export default function Layout({ children }) {
  return (
    <div>
      <Navigation />
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
