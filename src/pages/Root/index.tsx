import { Background } from "./components/Background";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { Main } from "./components/Main";
import { OverlayProvider } from "./contexts/Overlay";

export function Root() {
  return (
    <OverlayProvider>
      <Layout background={<Background />}>
        <Header />
        <Main />
      </Layout>
    </OverlayProvider>
  );
}
