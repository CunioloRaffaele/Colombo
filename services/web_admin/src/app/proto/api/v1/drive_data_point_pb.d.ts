import * as jspb from 'google-protobuf'



export class DriveDataPoint extends jspb.Message {
  getTimestampUnix(): number;
  setTimestampUnix(value: number): DriveDataPoint;

  getRpmAvailable(): boolean;
  setRpmAvailable(value: boolean): DriveDataPoint;

  getRpm(): number;
  setRpm(value: number): DriveDataPoint;

  getSpeedAvailable(): boolean;
  setSpeedAvailable(value: boolean): DriveDataPoint;

  getSpeed(): number;
  setSpeed(value: number): DriveDataPoint;

  getThrottlePositionAvailable(): boolean;
  setThrottlePositionAvailable(value: boolean): DriveDataPoint;

  getThrottlePosition(): number;
  setThrottlePosition(value: number): DriveDataPoint;

  getCoolantTempAvailable(): boolean;
  setCoolantTempAvailable(value: boolean): DriveDataPoint;

  getCoolantTemp(): number;
  setCoolantTemp(value: number): DriveDataPoint;

  getFuelRateAvailable(): boolean;
  setFuelRateAvailable(value: boolean): DriveDataPoint;

  getFuelRate(): number;
  setFuelRate(value: number): DriveDataPoint;

  getOdometerAvailable(): boolean;
  setOdometerAvailable(value: boolean): DriveDataPoint;

  getOdometer(): number;
  setOdometer(value: number): DriveDataPoint;

  getEngineExhaustFlowAvailable(): boolean;
  setEngineExhaustFlowAvailable(value: boolean): DriveDataPoint;

  getEngineExhaustFlow(): number;
  setEngineExhaustFlow(value: number): DriveDataPoint;

  getFuelTankLevelAvailable(): boolean;
  setFuelTankLevelAvailable(value: boolean): DriveDataPoint;

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
    rpmAvailable: boolean,
    rpm: number,
    speedAvailable: boolean,
    speed: number,
    throttlePositionAvailable: boolean,
    throttlePosition: number,
    coolantTempAvailable: boolean,
    coolantTemp: number,
    fuelRateAvailable: boolean,
    fuelRate: number,
    odometerAvailable: boolean,
    odometer: number,
    engineExhaustFlowAvailable: boolean,
    engineExhaustFlow: number,
    fuelTankLevelAvailable: boolean,
    fuelTankLevel: number,
    latitude: number,
    longitude: number,
  }
}

