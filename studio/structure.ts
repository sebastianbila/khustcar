import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Контент')
    .items([
      // Our singleton "config page"
      S.listItem()
        .title('Новинки')
        .id('newCarsSingleton')
        .icon(() => '⭐')
        .child(
          S.document()
            .schemaType('newCars')
            .documentId('newCars') // Hardcoded ID to ensure singleton
        ),

      S.divider(),

      // Regular document types (filtering out the singleton from the regular list)
      ...S.documentTypeListItems().filter(
        (listItem) => !['newCars'].includes(listItem.getId() || '')
      ),
    ])
