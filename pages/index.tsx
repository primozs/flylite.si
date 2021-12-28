import { NextPage, GetStaticProps } from 'next';
import NavBar from 'ui/NavBar';
import Head from 'next/head';
import { images } from 'gallery/images-home';
import useEmblaCarousel from 'embla-carousel-react';
import { useRef, useState, useCallback, useEffect } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import FullScreenGallery from 'gallery/FullScreenGallery';
import { getPage, stringToHtml } from '../lib/getContent';
import tw, { css } from 'twin.macro';

type Props = {
  frontMatter: { content: string; data: any };
};

const Home: NextPage<Props> = ({ frontMatter }) => {
  const autoplay = useRef(
    Autoplay(
      { delay: 10000, stopOnInteraction: true, stopOnMouseEnter: true },
      (emblaRoot) => emblaRoot.parentElement
    )
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainViewportRef, embla] = useEmblaCarousel(
    { skipSnaps: false, loop: true },
    [autoplay.current]
  );

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on('select', onSelect);
  }, [embla, onSelect]);

  return (
    <>
      <Head>
        <title>Aquila - flylite.si</title>
      </Head>
      <NavBar />
      <FullScreenGallery
        type="70wh"
        selectedIndex={selectedIndex}
        images={images}
        ref={mainViewportRef}
      />
      <div tw="relative p-4 sm:p-6 lg:p-8">
        <div
          tw="text-lg max-w-prose mx-auto mt-6 prose sm:prose lg:prose-lg xl:prose-xl prose-blue  text-gray-600"
          dangerouslySetInnerHTML={{ __html: frontMatter.content }}
        />
      </div>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const locale = ctx.locale;

  const page = await getPage(`index-${locale}`);
  const { content, data } = page;

  const contentJsx = await stringToHtml(content, true);

  const frontMatter = {
    content: contentJsx,
    data,
  };

  return {
    props: {
      frontMatter,
    },
  };
};
