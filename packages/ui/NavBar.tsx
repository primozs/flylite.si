import tw from 'twin.macro';
import { Disclosure } from '@headlessui/react';
import Logo from 'ui/Logo';
import Link from 'next/link';
import NavBarLink from 'ui/NavBarLink';
import { useRouter } from 'next/router';

const NavBar = () => {
  const { locale, asPath } = useRouter();

  return (
    <Disclosure as="nav" css={tw`bg-white border-b border-gray-200`}>
      <div css={tw`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
        <div css={tw`flex justify-between h-14 bg-white`}>
          <div tw="flex">
            <div tw="flex-shrink-0 flex items-center">
              <Logo />
            </div>

            <Link href="/gallery">
              <NavBarLink>Gallery</NavBarLink>
            </Link>

            <Link href="/view" locale="en">
              <NavBarLink>3D View</NavBarLink>
            </Link>
          </div>
          <Link href={asPath} locale={locale === 'en' ? 'sl' : 'en'}>
            <NavBarLink>EN/SL</NavBarLink>
          </Link>
        </div>
      </div>
    </Disclosure>
  );
};

export default NavBar;
