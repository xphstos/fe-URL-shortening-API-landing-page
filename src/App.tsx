import type { Component } from "solid-js";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { BoostCTA } from "./components/BoostCTA";
import { AdvancedStatistics } from "./components/AdvancedStatistics";
import { Intro } from "./components/Intro";
import { URLShortener } from "./components/URLShortener";

const App: Component = () => {
  return (
    <>
      <Header />
      <main class="min-h-dvh">
        <Intro />
        <URLShortener />
        <AdvancedStatistics />
        <BoostCTA />
      </main>
      <Footer />
    </>
  );
};

export default App;
