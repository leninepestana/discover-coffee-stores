import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet preload prefetch"
            href="/fonts/IBMPlexSans-Regular.ttf"
            as="style"
            crossOrigin="anonymous"
          ></link>
          <link
            rel="stylesheet preload prefetch"
            href="/fonts/IBMPlexSans-Bold.ttf"
            as="style"
            crossOrigin="anonymous"
          ></link>
          <link
            rel="stylesheet preload prefetch"
            href="/fonts/IBMPlexSans-SemiBold.ttf"
            as="style"
            crossOrigin="anonymous"
          ></link>
        </Head>
        <body>
          <Main></Main>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
