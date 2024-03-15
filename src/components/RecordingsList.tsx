import useLoadRecordings from "@/hooks/useLoadRecordings";
import useStreamCall from "@/hooks/useStreamCall";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Link from "next/link";

type Props = {};

const RecordingsList = (props: Props) => {
  const call = useStreamCall();
  const { recording, recordingsLoading } = useLoadRecordings(call);

  const { user, isLoaded: userLoaded } = useUser();

  if (userLoaded && !user) {
    <p className="text-center">You must be logged in to view recordings ...</p>;
  }

  if (recordingsLoading) return <Loader2 className="mx-auto animate-spin" />;

  return (
    <div className="space-y-3 text-center">
      {recording?.length === 0 && <p>No recording for this meeting </p>}
      <ul className="list-inside list-disc">
        {recording
          ?.sort((a, b) => b.end_time.localeCompare(a.end_time))
          .map((recording) => (
            <li key={recording.url}>
              <Link
                href={recording.url}
                target="_blank"
                className="hover:underline"
              >
                {new Date(recording.end_time).toLocaleString()}
              </Link>
            </li>
          ))}
      </ul>
      <p className="text-sm text-gray-500">
        Note : It can take upto 1 min before new recordings show up.
        <br />
        You can refresh the page to see if new recordings are available 
      </p>
    </div>
  );
};

export default RecordingsList;
