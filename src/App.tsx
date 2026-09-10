import { Navbar, Footer, BackToTop, MobileActionBar } from "@/components/common";
import AppRouter from "./router/Router";
import "./App.css";

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* WCAG 2.4.1: first focusable element bypasses the navbar */}
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <AppRouter />
      <Footer />
      {/* Spacer so the mobile action bar never covers footer content */}
      <div className="h-16 lg:hidden" aria-hidden="true" />
      <MobileActionBar />
      <BackToTop />
    </div>
  );
}

export default App;
