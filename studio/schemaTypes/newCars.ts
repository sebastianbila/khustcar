import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'newCars',
  title: 'Новинки',
  type: 'document',
  // @ts-ignore
  __experimental_actions: ['update', 'publish'], // Disables 'create' and 'delete'
  icon: () => '⭐',
  fields: [
    defineField({
      name: 'cars',
      title: 'Список автомобілів',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'car' }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title:  'Новинки',
      }
    },
  },
})
