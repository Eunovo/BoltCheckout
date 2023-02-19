import { GetStateResponse } from "./type";

export interface ILightningClient {
    getState(): Promise<GetStateResponse>;
}
