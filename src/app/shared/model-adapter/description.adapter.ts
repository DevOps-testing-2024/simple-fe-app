import { Injectable } from "@angular/core";
import { DescriptionModel } from "../models/response/description.model";
import { ModelAdapter } from "./interface/model-adapter";

@Injectable({
    providedIn: 'root'
  })
export class DescriptionAdapter implements ModelAdapter<DescriptionModel> {

  adapt(data: any): DescriptionModel {
    const mappedResponse = new DescriptionModel();
    mappedResponse.id = data.id;
    mappedResponse.details = data.details;
    return mappedResponse;
  }
}