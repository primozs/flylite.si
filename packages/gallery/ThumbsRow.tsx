import { forwardRef } from 'react';
import { Thumb } from './Thumb';
import tw, { css } from 'twin.macro';

type Props = {
  images: { src: string }[];
  selectedIndex: number;
  onThumbClick: (index: number) => void;
};

const ThumbsRow = (
  { images, selectedIndex, onThumbClick }: Props,
  ref: any
) => {
  return (
    <div
      css={css`
        position: relative;
        padding: 9px;
        max-width: 670px;
        margin-left: auto;
        margin-right: auto;
        width: 100%;
      `}
    >
      <div
        css={css`
          overflow: hidden;
          width: 100%;
        `}
        ref={ref}
      >
        <div
          css={css`
            display: flex;
            user-select: none;
            cursor: grab;
          `}
        >
          {images.map((item, index) => (
            <Thumb
              onClick={() => onThumbClick(index)}
              selected={index === selectedIndex}
              imgSrc={item.src}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default forwardRef(ThumbsRow);
