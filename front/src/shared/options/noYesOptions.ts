import { NoYesEnum } from "../enums/noYesEnum";
import { Option } from "../types/option";

export const noYesOptions: Option[] = [
    {
        text: 'Нет',
        value: NoYesEnum.no
    },
    {
        text: 'Да',
        value: NoYesEnum.yes,
    }
]