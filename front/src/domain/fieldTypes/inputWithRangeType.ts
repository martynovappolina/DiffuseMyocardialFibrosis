import { InputTypeBase } from "./inputTypeBase";

export class InputWithRangeType implements InputTypeBase {
    constructor(public min: number, public max: number, public unit: string, public popoverUnitDescription?: string) {}
}
