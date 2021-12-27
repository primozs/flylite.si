import Head from 'next/head';

const Basemeta = () => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="application-name" content="flylite.si" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="flylite.si" />
      <meta
        name="description"
        content="Aquila: Desire of flight simplicity and independence offered by paragliding or hang gliding wings has brought to development of some more or less successful foot launch-able and land-able gliders projects. Some of worth mentioning are: Aeriane Swift, Archaeopteryx, XXTherm."
      />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Flylite Aquila" />
      <meta
        property="og:description"
        content="Aquila Desire of flight simplicity and independence offered by paragliding or hang gliding wings has brought to development of some more or less successful foot launch-able and land-able gliders projects. Some of worth mentioning are: Aeriane Swift, Archaeopteryx, XXTherm."
      />
      <meta property="og:site_name" content="Flylite Aquila" />
      <meta property="og:url" content="https://flylite.si" />
      <meta property="og:image" content="https://flylit.si/aquila.svg" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/icons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/icons/favicon-16x16.png"
      />
      <link
        rel="mask-icon"
        href="/icons/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="msapplication-config" content="/icons/browserconfig.xml" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="robots" content="all" />
    </Head>
  );
};

export default Basemeta;
