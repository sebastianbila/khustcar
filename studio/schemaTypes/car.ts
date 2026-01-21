import { defineType } from 'sanity'

export default defineType({
    name: 'car',
    type: 'document',
    title: 'Автомобіль', // Car -> Автомобіль
    fieldsets: [
        {
            name: 'brandModelColumns',
            title: ' ',
            options: {columns: 2},
        },
        {
            name: 'priceColumns',
            title: ' ',
            options: {columns: 2},
        },
        {
            name: 'engineAndMileageColumns',
            title: ' ',
            options: {columns: 2},
        },
         {
            name: 'fuelTypeAndDrivetrainColumns',
            title: ' ',
            options: {columns: 2},
        },
    ],
    fields: [
        {
            name: 'brand',
            type: 'string',
            title: 'Марка', // Brand -> Марка
            validation: (rule) => rule.required(),
            fieldset: 'brandModelColumns',
        },
        {
            name: 'model',
            type: 'string',
            title: 'Модель', // Model -> Модель
            validation: (rule) => rule.required(),
            fieldset: 'brandModelColumns',
        },
        {
            name: 'year',
            type: 'number',
            title: 'Рік', // Year -> Рік
            validation: (rule) => rule.required().min(1900).max(2030),
        },
        {
            name: 'condition',
            type: 'number',
            title: 'Стан (1-10)', // New field
            description: 'Оцінка стану автомобіля від 1 до 10',
            validation: (rule) => rule.required().min(1).max(10),
        },
        {
            name: 'price',
            type: 'number',
            title: 'Ціна', // Price -> Ціна
            validation: (rule) => rule.required().min(0),
            fieldset: 'priceColumns',
        },
        {
            name: 'discountPrice',
            type: 'number',
            title: 'Акційна ціна', // Discount Price -> Акційна ціна
            description: 'Необов\'язкова ціна зі знижкою (залиште порожнім, якщо знижки немає)',
            validation: (rule) => rule.min(0),
            fieldset: 'priceColumns',
        },
        {
            name: 'engineSize',
            type: 'string',
            title: 'Об\'єм двигуна', // Engine Size -> Об'єм двигуна
            description: 'наприклад, 2.0L, 3.5L V6',
            validation: (rule) => rule.required(),
            fieldset: 'engineAndMileageColumns',
        },
        {
            name: 'mileage',
            type: 'number',
            title: 'Пробіг (тис. км)', // Mileage (km) -> Пробіг (км)
            validation: (rule) => rule.required().min(0),
            fieldset: 'engineAndMileageColumns',
        },

        {
            name: 'fuelType',
            type: 'string',
            title: 'Тип пального', // Fuel Type -> Тип пального
            options: {
                list: [
                    {title: 'Дизель', value: 'diesel'},
                    {title: 'Бензин', value: 'petrol'},
                    {title: 'Електро', value: 'electric'},
                ],
                layout: 'radio',
            },
            validation: (rule) => rule.required(),
            fieldset: 'fuelTypeAndDrivetrainColumns',
        },
         {
            name: 'drivetrain',
            type: 'string',
            title: 'Привід',
            options: {
                list: [
                    {title: 'Передній', value: 'fwd'},
                    {title: 'Задній', value: 'rwd'},
                    {title: 'Повний', value: 'awd'},
                ],
                layout: 'radio',
            },
            validation: (rule) => rule.required(),
            fieldset: 'fuelTypeAndDrivetrainColumns',
        },
        {
            name: 'transmission',
            type: 'string',
            title: 'Коробка передач', // Transmission -> Коробка передач
            options: {
                list: [
                    {title: 'Ручна', value: 'manual'},
                    {title: 'Автомат', value: 'automatic'},
                ],
                layout: 'radio',
            },
            validation: (rule) => rule.required(),
        },
         {
            name: 'color',
            type: 'string',
            title: 'Колір', // Color -> Колір
        },
        {
            name: 'inStock',
            type: 'boolean',
            title: 'В наявності', // In Stock -> В наявності
            description: 'Чи доступний цей автомобіль для продажу?',
            initialValue: true,
            validation: (rule) => rule.required(),
        },
        {
            name: 'description',
            type: 'array',
            title: 'Опис', // Description -> Опис
            of: [{type: 'block'}],
        },
        {
            name: 'images',
            type: 'array',
            title: 'Зображення', // Images -> Зображення
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Альтернативний текст', // Alternative Text -> Альтернативний текст
                        },
                    ],
                },
            ],
        },
        {
            name: 'video',
            type: 'file',
            title: 'Відео', // Video -> Відео
            options: {
                accept: 'video/*',
            },
        },
    ],
    preview: {
        select: {
            title: 'brand',
            subtitle: 'model',
            media: 'images.0',
            year: 'year'
        },
        prepare(selection: any) {
            const {title, subtitle, media} = selection

            return {
                title: `${title} ${subtitle}`,
                subtitle: `Рік: ${selection.year}`,
                media,
            }
        },
    },
})
