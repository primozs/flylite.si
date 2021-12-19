import xw from 'twin.macro';
import type { NextPage } from 'next';
import ButtonReact from 'ui/ButtonReact';
import ButtonStyled from 'ui/ButtonStyled';

const Home: NextPage = () => {
  return (
    <div css={xw`grid justify-center items-center h-screen space-y-20`}>
      <div css={xw`space-y-20`}>
        <ButtonReact>@emotion/react</ButtonReact>
        <ButtonStyled>@emotion/styled</ButtonStyled>
      </div>
    </div>
  );
};

export default Home;
