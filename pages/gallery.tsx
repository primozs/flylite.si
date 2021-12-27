import NavBar from 'ui/NavBar';
import Head from 'next/head';
import { images } from 'gallery/images';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState, useCallback, useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import FullScreenGallery from 'gallery/FullScreenGallery';
import ThumbsRow from 'gallery/ThumbsRow';
import 'twin.macro';

const Gallery = () => {
  const autoplay = useRef(
    Autoplay(
      { delay: 10000, stopOnInteraction: true, stopOnMouseEnter: true },
      (emblaRoot) => emblaRoot.parentElement
    )
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainViewportRef, embla] = useEmblaCarousel(
    { skipSnaps: false, loop: false },
    [autoplay.current]
  );
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!embla || !emblaThumbs) return;
      if (emblaThumbs.clickAllowed()) embla.scrollTo(index);
    },
    [embla, emblaThumbs]
  );

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbs) return;
    setSelectedIndex(embla.selectedScrollSnap());
    emblaThumbs.scrollTo(embla.selectedScrollSnap());
  }, [embla, emblaThumbs, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on('select', onSelect);
  }, [embla, onSelect]);

  return (
    <>
      <Head>
        <title>Aquila gallery - flylite.si</title>
      </Head>
      <div tw="flex flex-col justify-center h-screen w-full">
        <NavBar />
        <FullScreenGallery
          selectedIndex={selectedIndex}
          images={images}
          ref={mainViewportRef}
        />
        <ThumbsRow
          images={images}
          selectedIndex={selectedIndex}
          onThumbClick={onThumbClick}
          ref={thumbViewportRef}
        />
      </div>
    </>
  );
};

export default Gallery;
