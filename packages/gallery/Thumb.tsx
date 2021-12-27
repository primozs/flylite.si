import { css } from 'twin.macro';

type Props = {
  selected: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  imgSrc: string;
};

export const Thumb = ({ selected, onClick, imgSrc }: Props) => (
  <div
    css={css`
      padding-left: 10px;
      min-width: 100%;
      position: relative;

      padding-left: 8px;
      min-width: 20%;
    `}
  >
    <button
      onClick={onClick}
      css={css`
        position: relative;
        overflow: hidden;
        touch-action: manipulation;
        cursor: pointer;
        border: 0;
        outline: 0;
        margin: 0;
        padding: 0;
        height: 80px;
        width: 100%;
        background-color: transparent;
        position: relative;
        display: block;
        overflow: hidden;

        ${selected &&
        css`
          border: solid #4a9040 6px;
        `}
      `}
      type="button"
    >
      <img
        css={css`
          position: absolute;
          opacity: 0.7;
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
          ${selected &&
          css`
            opacity: 1;
          `}
        `}
        src={imgSrc}
      />
    </button>
  </div>
);
