import { mockProperties } from "@/features/properties/services/mockData";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import PropertyClient from "./PropertyClient";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { id } = await params;
  const property = mockProperties.find((p) => p.id === id);

  return {
    title: property ? `${property.title} | Vientiane Nest` : 'Property | Vientiane Nest',
    description: property?.description.substring(0, 160),
    openGraph: {
      images: property ? [property.images[0]] : [],
    },
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = mockProperties.find((p) => p.id === id);

  if (!property) {
    notFound();
  }

  return <PropertyClient property={property} />;
}
