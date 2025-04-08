import { OptionsView } from "../../shared/enums/optionsView.ts";
import { Option } from "../../shared/types/option.ts";
import { IFieldType } from "../abstract/iFieldType.ts";

export class CheckboxType implements IFieldType {
    constructor(public options: Option[], public optionsView: OptionsView = OptionsView.row) {}
}