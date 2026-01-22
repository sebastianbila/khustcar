import { CarDetails } from "@/components/CarDetails";
import { SITE_CONFIG } from "@/lib/constants";
import { urlFor } from "@/lib/sanity";
import { getAllCarIds, getCarById } from "@/services/carService";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const ids = await getAllCarIds();
  return ids.map((id) => ({
    id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const car = await getCarById(id);

  if (!car) {
    return {
      title: "Авто не знайдено",
    };
  }

  const title = `${car.brand} ${car.model} ${car.year}`;
  const description = `${car.year} ${car.brand} ${car.model} - ${car.price}$`;

  const images = [];
  if (car.images && car.images.length > 0) {
      images.push(urlFor(car.images[0]).width(1200).height(630).url());
  }

  return {
    title,
    description,
    openGraph: {
        title: {
            default: title,
            template: `%s | ${SITE_CONFIG.name}`,
        },
      description,
      images,
      type: "article",
    },
  };
}

export default function Page({ params }: Props) {
  return <CarDetails params={params} />;
}
