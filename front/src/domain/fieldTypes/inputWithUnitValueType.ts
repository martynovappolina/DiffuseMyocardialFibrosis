import { InputTypeBase } from "./inputTypeBase.ts";

export class InputWithUnitValueType extends InputTypeBase {
    constructor(public unit: string, public unitValue: number, public popoverUnitDescription?: string) {
        super(unit, popoverUnitDescription);
    }
}