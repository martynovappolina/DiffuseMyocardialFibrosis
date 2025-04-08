import { InputTypeBase } from "./domain/fieldTypes/inputTypeBase.ts";

export const fields = [
    {
        variableName: 'diseaseDuration',
        label: 'Длительность заболевания',
        type: new InputTypeBase('лет'),
        category: 'Общие данные',
    },
    {
        variableName: 'septalThickness',
        label: 'Толщина межжелудочковой перегородки (МЖП)',
        type: new InputTypeBase('мм'),
        category: 'Показатели эхокардиографии',
    },
    {
        variableName: 'endDiastolicSize',
        label: 'Конечно-диастолический размер (КДР)',
        type: new InputTypeBase('мм'),
        category: 'Показатели эхокардиографии',
    },
    {
        variableName: 'endDiastolicVolume',
        label: 'Конечно-диастолический объём (КДО)',
        type: new InputTypeBase('мл'),
        category: 'Показатели эхокардиографии',
    },
    {
        variableName: 'posteriorWallThickness',
        label: 'Толщина задней стенки левого желудочка (ЗС)',
        type: new InputTypeBase('мм'),
        category: 'Показатели эхокардиографии',
    },
    {
        variableName: 'myocardialMassIndex',
        label: 'Индекс массы миокарда левого желудочка (ИММЛЖ)',
        type: new InputTypeBase('г/кв.м'),
        category: 'Показатели эхокардиографии',
    },
    {
        variableName: 'ejectionFraction',
        label: 'Фракция выброса левого желудочка (ФВ)',
        type: new InputTypeBase('%'),
        category: 'Показатели эхокардиографии',
    },
    {
        variableName: 'igf1',
        label: 'Инсулиноподобный фактор роста - 1 (ИФР-1)',
        type: new InputTypeBase('нг/мл'),
        category: 'Лабораторные показатели',
    },
    {
        variableName: 'piiinp',
        label: 'N-терминальный пропептид проколлагена III типа (PIIINP)',
        type: new InputTypeBase('пг/мл'),
        category: 'Лабораторные показатели',
    },
    {
        variableName: 'galectin3',
        label: 'Галектин-3',
        type: new InputTypeBase('пг/мл'),
        category: 'Лабораторные показатели',
    },
    {
        variableName: 'tgfb1',
        label: 'Трансформирующий фактор роста β1 (TGF-β1)',
        type: new InputTypeBase('пг/мл'),
        category: 'Лабораторные показатели',
    },
]

