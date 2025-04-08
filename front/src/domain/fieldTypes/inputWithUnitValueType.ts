import { InputTypeBase } from "./inputTypeBase";

export class InputWithUnitValueType extends InputTypeBase {
    constructor(public unit: string, public unitValue: number, public popoverUnitDescription?: string) {
        super(unit, popoverUnitDescription);
    }
}