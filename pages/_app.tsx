import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

import "../styles/globals.css";
import { AppLayout } from "../components/layouts";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Yellow Book</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </QueryClientProvider>
  );
}

export default MyApp;
