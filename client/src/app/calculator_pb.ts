// @generated by protoc-gen-es v2.2.5 with parameter "target=ts"
// @generated from file pts/f/v1/calculator.proto (package pts.f.v1, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file pts/f/v1/calculator.proto.
 */
export const file_pts_f_v1_calculator: GenFile = /*@__PURE__*/
  fileDesc("ChlwdHMvZi92MS9jYWxjdWxhdG9yLnByb3RvEghwdHMuZi52MSI7ChBDYWxjdWxhdGVSZXF1ZXN0Eg0KBXByaW9yGAEgASgFEgwKBHBvc3QYAiABKAUSCgoCb3AYAyABKAUiIwoRQ2FsY3VsYXRlUmVzcG9uc2USDgoGcmVzdWx0GAEgASgFMlkKEUNhbGN1bGF0b3JTZXJ2aWNlEkQKCUNhbGN1bGF0ZRIaLnB0cy5mLnYxLkNhbGN1bGF0ZVJlcXVlc3QaGy5wdHMuZi52MS5DYWxjdWxhdGVSZXNwb25zZUIlWiNvcmcuc2lsbC53ZWJjYWxjdWxhdG9yL2dlbi9wdHMvZi92MWIGcHJvdG8z");

/**
 * @generated from message pts.f.v1.CalculateRequest
 */
export type CalculateRequest = Message<"pts.f.v1.CalculateRequest"> & {
  /**
   * @generated from field: int32 prior = 1;
   */
  prior: number;

  /**
   * @generated from field: int32 post = 2;
   */
  post: number;

  /**
   * @generated from field: int32 op = 3;
   */
  op: number;
};

/**
 * Describes the message pts.f.v1.CalculateRequest.
 * Use `create(CalculateRequestSchema)` to create a new message.
 */
export const CalculateRequestSchema: GenMessage<CalculateRequest> = /*@__PURE__*/
  messageDesc(file_pts_f_v1_calculator, 0);

/**
 * @generated from message pts.f.v1.CalculateResponse
 */
export type CalculateResponse = Message<"pts.f.v1.CalculateResponse"> & {
  /**
   * @generated from field: int32 result = 1;
   */
  result: number;
};

/**
 * Describes the message pts.f.v1.CalculateResponse.
 * Use `create(CalculateResponseSchema)` to create a new message.
 */
export const CalculateResponseSchema: GenMessage<CalculateResponse> = /*@__PURE__*/
  messageDesc(file_pts_f_v1_calculator, 1);

/**
 * @generated from service pts.f.v1.CalculatorService
 */
export const CalculatorService: GenService<{
  /**
   * @generated from rpc pts.f.v1.CalculatorService.Calculate
   */
  calculate: {
    methodKind: "unary";
    input: typeof CalculateRequestSchema;
    output: typeof CalculateResponseSchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_pts_f_v1_calculator, 0);

