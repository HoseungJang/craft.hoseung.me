import { Layout } from "./Layout";
import { Background } from "./Background";
import { Header } from "./Header";
import { Main } from "./Main";

export function Root() {
  return (
    <Layout background={<Background />}>
      <Header />
      <Main />
    </Layout>
  );
}
