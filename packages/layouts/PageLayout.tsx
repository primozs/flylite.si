import tw, { css } from 'twin.macro';
import { Global } from '@emotion/react';

type Props = {
  children: React.ReactNode;
};

const customStyles = css`
  html {
    height: 100%;
  }
  body {
    height: 100%;
  }
  div#__next {
    height: 100%;
  }
`;

const PageLayout = ({ children }: Props) => {
  return (
    <>
      <Global styles={customStyles} />
      <div css={tw`min-h-full bg-gray-50`}>{children}</div>
    </>
  );
};

export default PageLayout;
