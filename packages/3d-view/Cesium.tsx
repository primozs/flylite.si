import { useRef, useEffect } from 'react';
import { Viewer, Clock, Entity, CesiumComponentRef } from 'resium';
import {
  Cartesian3,
  createWorldTerrain,
  IonImageryProvider,
  JulianDate,
  SampledPositionProperty,
  TimeIntervalCollection,
  TimeInterval,
  VelocityOrientationProperty,
  Viewer as CesiumViewer,
} from 'cesium';
import track from './track.json';

const terrainProvider = createWorldTerrain();
const imageryProvider = new IonImageryProvider({ assetId: 3954 });

const positionProperty = new SampledPositionProperty();

let startTime: JulianDate;
let endTime: JulianDate;
for (let i = 0; i < track.positions.length; i++) {
  const dataPoint = track.positions[i];
  if (
    dataPoint[0] === null ||
    dataPoint[1] === null ||
    dataPoint[2] === null ||
    dataPoint[4] === null
  )
    continue;
  const timeMs = Math.round(dataPoint[4] * 1000);

  const time = JulianDate.fromDate(new Date(timeMs));
  if (i === 0) {
    startTime = time;
  }
  if (i === track.positions.length - 1) {
    endTime = time;
  }
  const position = Cartesian3.fromDegrees(
    dataPoint[0],
    dataPoint[1],
    dataPoint[2]
  );
  positionProperty.addSample(time, position);
}

const Cesium = () => {
  const ref = useRef<CesiumComponentRef<CesiumViewer>>(null);

  useEffect(() => {
    if (ref.current?.cesiumElement) {
      ref.current.cesiumElement?.timeline.zoomTo(startTime, endTime);
    }
  }, [startTime, endTime]);

  return (
    <Viewer
      ref={ref}
      full={true}
      timeline={true}
      animation={true}
      homeButton={false}
      baseLayerPicker={false}
      navigationHelpButton={true}
      navigationInstructionsInitiallyVisible={false}
      sceneModePicker={false}
      fullscreenButton={false}
      scene3DOnly={true}
      vrButton={false}
      infoBox={false}
      terrainProvider={terrainProvider}
      imageryProvider={imageryProvider}
    >
      <Clock
        multiplier={10}
        shouldAnimate={true}
        startTime={startTime.clone()}
        stopTime={endTime.clone()}
        currentTime={startTime.clone()}
      />
      <Entity
        position={positionProperty}
        model={{
          uri: '/models/1/aquila.glb',
          minimumPixelSize: 128,
          maximumScale: 1,
        }}
        // path={
        //   new PathGraphics({
        //     width: 3,
        //     material: new Color(1.0, 0.0, 0.0, 1.0),
        //   })
        // }
        availability={
          new TimeIntervalCollection([
            new TimeInterval({ start: startTime, stop: endTime }),
          ])
        }
        orientation={new VelocityOrientationProperty(positionProperty)}
        tracked
      />
    </Viewer>
  );
};

export default Cesium;
