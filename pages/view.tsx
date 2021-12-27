import Head from 'next/head';
import dynamic from 'next/dynamic';
import NavBar from 'ui/NavBar';
import 'twin.macro';

const Cesium = dynamic(() => import('3d-view/Cesium'), { ssr: false });

const View = () => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="cesium/Widgets/widgets.css" />
        <title>Aquila 3d view - flylite.si</title>
      </Head>
      <div tw="flex flex-col justify-center h-screen w-full">
        <NavBar />
        <div tw="flex flex-col justify-center h-full gap-y-5 relative">
          <Cesium />
        </div>
      </div>
    </>
  );
};

export default View;
