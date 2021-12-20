import tw from 'twin.macro';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

type Props = {
  children: React.ReactNode;
};

const NavBar = ({ children }: Props) => {
  return (
    <Disclosure as="nav" css={tw`bg-white border-b border-gray-200`}>
      <div css={tw`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-red-400`}>
        <div css={tw`flex justify-between h-16 bg-blue-500`}>{children}</div>
      </div>
    </Disclosure>
  );
};

export default NavBar;
