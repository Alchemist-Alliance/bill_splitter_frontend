import { Dashboard } from "@/components";

const eventDataFetch = async (eventId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/get_event`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ key: eventId }),
        cache: "no-cache",
      }
    );
    const data = await response.json();
    return data.event;
  } catch (err) {
    throw `${err} Something Wrong With API`;
  }
};

const OfflineSplitDash = async ({ params }: { params: { slug: string } }) => {
  const eventId = params.slug;
  const eventData = await eventDataFetch(eventId);
  return (
    <main>
      <Dashboard eventData={eventData} />
    </main>
  );
};

export default OfflineSplitDash;
