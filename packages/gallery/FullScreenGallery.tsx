import { forwardRef } from 'react';
import tw, { css } from 'twin.macro';

type Props = {
  images: { src: string }[];
  selectedIndex: number;
  className?: string;
  type?: 'full' | '70wh';
};

const FullScreenGallery = (
  { type, selectedIndex, images, className }: Props,
  ref: any
) => {
  return (
    <div
      css={[
        tw`flex flex-col justify-center h-full gap-y-5 relative overflow-hidden`,
        css`
          cursor: grab;
        `,
      ]}
      className={className}
      ref={ref}
    >
      <div
        css={css`
          display: flex;
          height: 100%;
          ${type === '70wh' &&
          css`
            height: 70vh;
          `}
        `}
      >
        {images.map((item, index) => {
          const selected = selectedIndex === index;
          return (
            <div
              key={item.src}
              css={css`
                position: relative;
                flex: 0 0 100%;
                z-index: -1;
                ${selected &&
                css`
                  z-index: 1;
                `};
              `}
            >
              <img
                css={css`
                  position: absolute;
                  top: 0;
                  bottom: 0;
                  left: -10000%;
                  right: -10000%;
                  margin: auto;
                  min-width: 1000%;
                  min-height: 1000%;
                  max-width: none;
                  transform: scale(0.1);
                  transition: opacity 0.2s;
                  cursor: grab;
                `}
                src={item.src}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default forwardRef(FullScreenGallery);
