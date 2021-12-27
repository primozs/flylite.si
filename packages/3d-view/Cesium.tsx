import { useRef, useEffect } from 'react';
import { Viewer, Clock, Entity, CesiumComponentRef, Globe } from 'resium';
import {
  createWorldTerrain,
  TimeIntervalCollection,
  TimeInterval,
  Viewer as CesiumViewer,
  Ion,
} from 'cesium';

import { getTrackData } from './model';

Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_ACCESS_TOKEN || '';

const terrainProvider = createWorldTerrain();
// const imageryProvider = new IonImageryProvider({ assetId: 3954 });

const data = getTrackData();

const Cesium = () => {
  const ref = useRef<CesiumComponentRef<CesiumViewer>>(null);

  useEffect(() => {
    if (
      ref.current?.cesiumElement &&
      data.startTime !== undefined &&
      data.endTime !== undefined
    ) {
      ref.current.cesiumElement?.timeline?.zoomTo(data.startTime, data.endTime);
    }
  }, [data.startTime, data.endTime]);

  return (
    <Viewer
      ref={ref}
      full={true}
      timeline={true}
      animation={true}
      homeButton={false}
      baseLayerPicker={false}
      navigationHelpButton={false}
      navigationInstructionsInitiallyVisible={false}
      sceneModePicker={false}
      fullscreenButton={false}
      scene3DOnly={true}
      vrButton={false}
      infoBox={false}
      terrainProvider={terrainProvider}
      geocoder={false}
    >
      <Globe depthTestAgainstTerrain={true} />
      <Clock
        multiplier={1.5}
        shouldAnimate={true}
        startTime={data.startTime?.clone()}
        stopTime={data.endTime?.clone()}
        currentTime={data.initialTime?.clone()}
      />
      <Entity
        position={data.position}
        model={{
          uri: '/models/1/aquila.glb',
          minimumPixelSize: 128,
          maximumScale: 1,
        }}
        availability={
          new TimeIntervalCollection([
            new TimeInterval({ start: data.startTime, stop: data.endTime }),
          ])
        }
        orientation={data.orientation}
        tracked
      />
    </Viewer>
  );
};

export default Cesium;
