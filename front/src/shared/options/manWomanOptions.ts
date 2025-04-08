import { SexEnum } from "../enums/sexEnum";
import { Option } from "../types/option";

export const manWomanOptions: Option[] = [
    {
        text: 'М',
        value: SexEnum.man
    },
    {
        text: 'Ж',
        value: SexEnum.woman,
    }
]