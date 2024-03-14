import { Metadata } from "next";
import MeetingPage from "./MeetingPage";

interface PageProps {
  params: {
    id: string;
  };
}

export function generateMetaData({ params: { id } }: PageProps): Metadata {
  return {
    title: `Meeting ${id}`,
  };
}

function page({ params: { id } }: PageProps) {
  return (
    <div>
      <MeetingPage id={id} />
    </div>
  );
}

export default page;
