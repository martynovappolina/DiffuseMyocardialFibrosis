import { Option } from "../../shared/types/option";
import { IFieldType } from "../abstract/iFieldType";

export class InputWithUnitOptionsType implements IFieldType {
    constructor(public unitOptions: Option[], public popoverUnitDescription?: string) {}
}