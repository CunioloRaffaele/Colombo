import * as jspb from 'google-protobuf'

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb'; // proto import: "google/protobuf/timestamp.proto"


export class TelemetryReading extends jspb.Message {
  getTimestamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTimestamp(value?: google_protobuf_timestamp_pb.Timestamp): TelemetryReading;
  hasTimestamp(): boolean;
  clearTimestamp(): TelemetryReading;

  getLatitude(): number;
  setLatitude(value: number): TelemetryReading;

  getLongitude(): number;
  setLongitude(value: number): TelemetryReading;

  getRpm(): number;
  setRpm(value: number): TelemetryReading;

  getSpeed(): number;
  setSpeed(value: number): TelemetryReading;

  getThrottlePosition(): number;
  setThrottlePosition(value: number): TelemetryReading;

  getCoolantTemp(): number;
  setCoolantTemp(value: number): TelemetryReading;

  getFuelRate(): number;
  setFuelRate(value: number): TelemetryReading;

  getOdometer(): number;
  setOdometer(value: number): TelemetryReading;

  getEngineExhaustFlow(): number;
  setEngineExhaustFlow(value: number): TelemetryReading;

  getFuelTankLevel(): number;
  setFuelTankLevel(value: number): TelemetryReading;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TelemetryReading.AsObject;
  static toObject(includeInstance: boolean, msg: TelemetryReading): TelemetryReading.AsObject;
  static serializeBinaryToWriter(message: TelemetryReading, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TelemetryReading;
  static deserializeBinaryFromReader(message: TelemetryReading, reader: jspb.BinaryReader): TelemetryReading;
}

export namespace TelemetryReading {
  export type AsObject = {
    timestamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    latitude: number,
    longitude: number,
    rpm: number,
    speed: number,
    throttlePosition: number,
    coolantTemp: number,
    fuelRate: number,
    odometer: number,
    engineExhaustFlow: number,
    fuelTankLevel: number,
  }
}

export class TelemetryBatchRequest extends jspb.Message {
  getSessionId(): number;
  setSessionId(value: number): TelemetryBatchRequest;

  getReadingsList(): Array<TelemetryReading>;
  setReadingsList(value: Array<TelemetryReading>): TelemetryBatchRequest;
  clearReadingsList(): TelemetryBatchRequest;
  addReadings(value?: TelemetryReading, index?: number): TelemetryReading;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TelemetryBatchRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TelemetryBatchRequest): TelemetryBatchRequest.AsObject;
  static serializeBinaryToWriter(message: TelemetryBatchRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TelemetryBatchRequest;
  static deserializeBinaryFromReader(message: TelemetryBatchRequest, reader: jspb.BinaryReader): TelemetryBatchRequest;
}

export namespace TelemetryBatchRequest {
  export type AsObject = {
    sessionId: number,
    readingsList: Array<TelemetryReading.AsObject>,
  }
}

export class TelemetryResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): TelemetryResponse;

  getMessage(): string;
  setMessage(value: string): TelemetryResponse;

  getReadingsProcessed(): number;
  setReadingsProcessed(value: number): TelemetryResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TelemetryResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TelemetryResponse): TelemetryResponse.AsObject;
  static serializeBinaryToWriter(message: TelemetryResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TelemetryResponse;
  static deserializeBinaryFromReader(message: TelemetryResponse, reader: jspb.BinaryReader): TelemetryResponse;
}

export namespace TelemetryResponse {
  export type AsObject = {
    success: boolean,
    message: string,
    readingsProcessed: number,
  }
}

