import {defineType} from 'sanity'

export default defineType({
  name: 'car',
  type: 'document',
  title: 'Car',
  fields: [
    {
      name: 'brand',
      type: 'string',
      title: 'Brand',
      validation: (rule) => rule.required(),
    },
    {
      name: 'model',
      type: 'string',
      title: 'Model',
      validation: (rule) => rule.required(),
    },
    {
      name: 'year',
      type: 'number',
      title: 'Year',
      validation: (rule) => rule.required().min(1900).max(2030),
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price',
      validation: (rule) => rule.required().min(0),
    },
    {
      name: 'discountPrice',
      type: 'number',
      title: 'Discount Price',
      description: 'Optional discounted price (leave empty if no discount)',
      validation: (rule) => rule.min(0),
    },
    {
      name: 'engineSize',
      type: 'string',
      title: 'Engine Size',
      description: 'e.g., 2.0L, 3.5L V6',
      validation: (rule) => rule.required(),
    },
    {
      name: 'mileage',
      type: 'number',
      title: 'Mileage (km)',
      validation: (rule) => rule.required().min(0),
    },
    {
      name: 'color',
      type: 'string',
      title: 'Color',
      validation: (rule) => rule.required(),
    },
    {
      name: 'description',
      type: 'array',
      title: 'Description',
      of: [{type: 'block'}],
    },
    {
      name: 'images',
      type: 'array',
      title: 'Images',
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
              title: 'Alternative Text',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'brand',
      subtitle: 'model',
      media: 'images.0',
    },
    prepare(selection: any) {
      const {title, subtitle, media} = selection

      return {
        title: `${title} ${subtitle}`,
        subtitle: `Year: ${selection.year}`,
        media,
      }
    },
  },
})
