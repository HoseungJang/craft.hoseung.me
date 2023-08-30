import { Background } from "./components/Background";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { Main } from "./components/Main";
import { OverlaySwitch } from "./components/OverlaySwitch";

export function Root() {
  return (
    <>
      <Layout background={<Background />}>
        <Header />
        <Main />
      </Layout>
      <OverlaySwitch />
    </>
  );
}
