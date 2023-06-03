import dynamic from 'next/dynamic';

const Header = dynamic(import('src/components/common/Header'), { ssr: false });

export default Header;