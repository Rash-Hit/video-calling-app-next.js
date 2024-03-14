"use client";

import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

type Props = {};

export default function CreateMeetingPage({}: Props) {
  const { user } = useUser();

  const client = useStreamVideoClient(); // this hook is provided by the stream sdk , but will not get the value of client until we pass the client value in Client Provider

  const [descriptionInput, setDescriptionInput] = useState("");
  const [startTimeInput, setStartTimeInput] = useState("");
  const [participantsInput, setParticipantInputs] = useState("");
  const [call, setCall] = useState<Call>();

  async function createMeeting() {
    if (!user || !client) {
      return;
    }

    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      await call.getOrCreate({
        data: {
          custom: {
            descriptionInput: descriptionInput,
          },
        },
      });
      setCall(call);
    } catch (error) {
      console.log(error);
      alert("Something went wrong : Please try again later");
    }
  }
  if (!user || !client) {
    return (
      <div className="mx-auto animate-spin">
        <Loader2 />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <h1 className="text-center text-2xl font-bold">
        Welcome {user.username} !!
      </h1>
      <div className="mx-auto w-80 space-y-6 rounded-md bg-slate-100 p-5">
        <h2 className="text-xl font-bold">Create a new meeting </h2>
        <DescritpionInput
          value={descriptionInput}
          onChange={setDescriptionInput}
        />
        <StartTimeInput value={startTimeInput} onChange={setStartTimeInput} />
        <ParticipantsInput
          value={participantsInput}
          onChange={setParticipantInputs}
        />
        <button className="w-full" onClick={createMeeting}>
          Create Meeting
        </button>
      </div>
      {call && <MeetingLink call={call} />}
    </div>
  );
}

interface DescritpionInputProps {
  value: string;
  onChange: (value: string) => void;
}

function DescritpionInput({ value, onChange }: DescritpionInputProps) {
  const [active, setActive] = useState(false);
  return (
    <div className="space-y-2">
      <div className=" font-medium">Meeting info : </div>
      <label className="flex items-center gap-1.5">
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => {
            setActive(e.target.checked);
            onChange("");
          }}
        />
        Add description
      </label>
      {active && (
        <label className="block space-y-1">
          <div className="font-medium">Description</div>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            maxLength={500}
            className="w-full rounded-md border border-gray-300 p-2"
          ></textarea>
        </label>
      )}
    </div>
  );
}

interface StartTimeInputProps {
  value: string;
  onChange: (value: string) => void;
}

function StartTimeInput({ value, onChange }: StartTimeInputProps) {
  const dateTimeLocalNow = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60_000,
  )
    .toISOString()
    .slice(0, 16);
  const [active, setActive] = useState(false);
  return (
    <div className="space-y-2">
      <div className=" font-medium">Start time : </div>
      <label className="flex items-center gap-1.5">
        <input
          type="radio"
          checked={!active}
          onChange={(e) => {
            setActive(false);
            onChange("");
          }}
        />
        Start meeting immediately
      </label>
      <label className="flex items-center gap-1.5">
        <input
          type="radio"
          checked={active}
          onChange={(e) => {
            setActive(!active);
            onChange(dateTimeLocalNow);
          }}
        />
        Start meeting at date/time
      </label>
      {active && (
        <label className="block space-y-1">
          <div className="font-medium">Description</div>
          <input
            type="datetime-local"
            value={value}
            min={dateTimeLocalNow}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </label>
      )}
    </div>
  );
}

interface ParticipantsInputProps {
  value: string;
  onChange: (value: string) => void;
}

function ParticipantsInput({ value, onChange }: ParticipantsInputProps) {
  const [active, setActive] = useState(false);
  return (
    <div className="space-y-2">
      <div className=" font-medium">Participants: </div>
      <label className="flex items-center gap-1.5">
        <input
          type="radio"
          checked={!active}
          onChange={(e) => {
            setActive(false);
            onChange("");
          }}
        />
        Everyone with link can join
      </label>
      <label className="flex items-center gap-1.5">
        <input
          type="radio"
          checked={active}
          onChange={(e) => {
            setActive(true);
          }}
        />
        Private Meeting
      </label>
      {active && (
        <label className="block space-y-1">
          <div className="font-medium">Participant Emails</div>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter participant email addresses separated by comma"
            className="w-full rounded-md border border-gray-300 p-2"
          ></textarea>
        </label>
      )}
    </div>
  );
}

interface MeetingLinkProps {
  call: Call;
}

function MeetingLink({ call }: MeetingLinkProps) {
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id}`;
  return <div className="text-center">{meetingLink}</div>;
}
