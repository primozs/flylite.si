import Head from 'next/head';
import dynamic from 'next/dynamic';

const Cesium = dynamic(() => import('3d-view/Cesium'), { ssr: false });

const View = () => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="cesium/Widgets/widgets.css" />
      </Head>
      <Cesium />
    </>
  );
};

export default View;
