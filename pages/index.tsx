import { NextPage, GetStaticProps } from 'next';
import NavBar from 'ui/NavBar';
import Head from 'next/head';
import { images } from 'gallery/images-home';
import useEmblaCarousel from 'embla-carousel-react';
import { useRef, useState, useCallback, useEffect } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import FullScreenGallery from 'gallery/FullScreenGallery';
import { getPage, stringToHtml } from '../lib/getContent';
import tw from 'twin.macro';

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
      <div tw="flex">
        <div dangerouslySetInnerHTML={{ __html: frontMatter.content }} />
      </div>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const page = await getPage('index');
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
