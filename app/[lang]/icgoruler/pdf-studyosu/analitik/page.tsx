import { TrafficRoute, trafficMetadata } from "../../../../traffic-pages";

export const dynamic = "force-dynamic";
export const metadata = trafficMetadata("tr");

export default async function TrafficPage({ searchParams }: { searchParams: Promise<{ days?: string }> }) {
  const { days } = await searchParams;
  return <TrafficRoute lang="tr" days={days}/>;
}
