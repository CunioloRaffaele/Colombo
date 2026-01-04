import * as jspb from 'google-protobuf'



export class DriveDataPoint extends jspb.Message {
  getTimestampUnix(): number;
  setTimestampUnix(value: number): DriveDataPoint;

  getAvailableVitalsMap(): jspb.Map<string, boolean>;
  clearAvailableVitalsMap(): DriveDataPoint;

  getRpm(): number;
  setRpm(value: number): DriveDataPoint;

  getSpeed(): number;
  setSpeed(value: number): DriveDataPoint;

  getThrottlePosition(): number;
  setThrottlePosition(value: number): DriveDataPoint;

  getCoolantTemp(): number;
  setCoolantTemp(value: number): DriveDataPoint;

  getFuelRate(): number;
  setFuelRate(value: number): DriveDataPoint;

  getOdometer(): number;
  setOdometer(value: number): DriveDataPoint;

  getEngineExhaustFlow(): number;
  setEngineExhaustFlow(value: number): DriveDataPoint;

  getFuelTankLevel(): number;
  setFuelTankLevel(value: number): DriveDataPoint;

  getLatitude(): number;
  setLatitude(value: number): DriveDataPoint;

  getLongitude(): number;
  setLongitude(value: number): DriveDataPoint;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DriveDataPoint.AsObject;
  static toObject(includeInstance: boolean, msg: DriveDataPoint): DriveDataPoint.AsObject;
  static serializeBinaryToWriter(message: DriveDataPoint, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DriveDataPoint;
  static deserializeBinaryFromReader(message: DriveDataPoint, reader: jspb.BinaryReader): DriveDataPoint;
}

export namespace DriveDataPoint {
  export type AsObject = {
    timestampUnix: number,
    availableVitalsMap: Array<[string, boolean]>,
    rpm: number,
    speed: number,
    throttlePosition: number,
    coolantTemp: number,
    fuelRate: number,
    odometer: number,
    engineExhaustFlow: number,
    fuelTankLevel: number,
    latitude: number,
    longitude: number,
  }
}

