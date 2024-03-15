import { Metadata } from "next/types";
import MyMeetingsPage from "./MyMeetingsPage";

export const metadata: Metadata = {
  title: "Meetings List",
};

export default function Page() {
  return <MyMeetingsPage />;
}
