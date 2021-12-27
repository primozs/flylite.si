import { point as tpoint } from '@turf/helpers';
import turfDistance from '@turf/distance';
import turfBearing from '@turf/bearing';
import {
  Cartesian3,
  JulianDate,
  SampledPositionProperty,
  SampledProperty,
  Quaternion,
  Math as CesiumMath,
  Transforms,
  HeadingPitchRoll,
} from 'cesium';
import track from './track.json';

type Orientation = {
  pitch: number;
  heading: number;
  roll: number;
};

const getOrientation = (
  pos: number[],
  posPrev: number[],
  prevBearing: number,
  prevRoll: number,
  isParaglider = false
): Orientation => {
  if (!pos || !posPrev) {
    return {
      pitch: 0,
      heading: 0,
      roll: 0,
    };
  }

  let pitchFactor = isParaglider ? 0.3 : 0.5;
  let turnFactor = isParaglider ? 0.5 : 0.8;
  let pitch = 0;

  const altDelta = pos[2] - posPrev[2];
  const point = tpoint([pos[0], pos[1]]);
  const pointPrev = tpoint([posPrev[0], posPrev[1]]);
  const distance = turfDistance(pointPrev, point, { units: 'meters' });
  const heading = pos[8] || turfBearing(pointPrev, point);

  if (distance > 0) {
    pitch = Math.atan((altDelta / distance) * pitchFactor) * (180 / Math.PI);
  }

  let deltaBearing = Math.round((360 + heading - prevBearing) % 360);

  if (Math.abs(deltaBearing) > 180) {
    deltaBearing -= 360;
  }

  let turn = (deltaBearing / (pos[4] - posPrev[4])) * turnFactor;

  if (!isFinite(turn)) {
    turn = prevRoll;
  }

  turn = turn * 1.5;
  turn = turn > 0 ? Math.min(turn, 55) : Math.max(turn, -55);

  return {
    pitch,
    heading,
    roll: turn,
  };
};

export const getTrackData = () => {
  const positionProperty = new SampledPositionProperty();
  let orientation = new SampledProperty(Quaternion);

  let startTime: JulianDate | undefined;
  let initialTime: JulianDate | undefined;
  let endTime: JulianDate | undefined;
  let prevBearing = 0;
  let roll: number = 0;

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
      initialTime = JulianDate.fromDate(
        new Date(timeMs + 1.05 * 60 * 60 * 1000)
      );
    }
    if (i === track.positions.length - 1) {
      endTime = time;
    }
    const position = Cartesian3.fromDegrees(
      dataPoint[0],
      dataPoint[1],
      dataPoint[2]
    );

    let heading = 0;
    let pitch = 0;
    if (i > 0) {
      const pos = dataPoint as number[];
      const posPrev = track.positions[i - 1] as number[];
      const orientationObj = getOrientation(pos, posPrev, prevBearing, roll);
      roll = orientationObj.roll;
      prevBearing = orientationObj.heading;
      heading = orientationObj.heading;
      pitch = orientationObj.pitch;
    }

    const oHeading = CesiumMath.toRadians(heading - 90);
    const oPitch = CesiumMath.toRadians(pitch);
    const oRoll = CesiumMath.toRadians(roll);

    if (!isNaN(oHeading) && oRoll !== -Infinity && oRoll !== Infinity) {
      const hpr = new HeadingPitchRoll(oHeading, oPitch, oRoll);
      const or = Transforms.headingPitchRollQuaternion(position, hpr);
      // orientation={new VelocityOrientationProperty(positionProperty)}
      orientation.addSample(time, or);
    }
    positionProperty.addSample(time, position);
  }

  return {
    startTime,
    endTime,
    initialTime,
    position: positionProperty,
    orientation,
  };
};
