import { forwardRef } from 'react';
import 'twin.macro';

type Props = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

const NavBarLink = ({ children, ...rest }: Props, ref: any) => {
  return (
    <a
      ref={ref}
      {...rest}
      tw="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 md:px-3 pt-1 border-b-2 text-sm md:text-lg font-medium cursor-pointer"
    >
      {children}
    </a>
  );
};

export default forwardRef(NavBarLink);
