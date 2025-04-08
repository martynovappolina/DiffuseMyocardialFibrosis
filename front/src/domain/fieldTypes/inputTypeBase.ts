import { IFieldType } from "../abstract/iFieldType";

export class InputTypeBase implements IFieldType {
    constructor(
        public unit: string, 
        public popoverUnitDescription?: string
    ) {}
}