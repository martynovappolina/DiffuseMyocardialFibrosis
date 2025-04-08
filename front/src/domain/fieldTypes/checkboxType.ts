import { OptionsView } from "../../shared/enums/optionsView";
import { Option } from "../../shared/types/option";
import { IFieldType } from "../abstract/iFieldType";

export class CheckboxType implements IFieldType {
    constructor(public options: Option[], public optionsView: OptionsView = OptionsView.row) {}
}