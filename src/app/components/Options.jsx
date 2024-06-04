import React from "react";
import "./Options.css";
import { NotepadText } from "lucide-react";
import { MessageSquarePlus } from "lucide-react";
import Link from "next/link";


const Options = () => {
  return (
    <div className="icon-row">
      <Link href="/Scribe">
        <NotepadText size={120} color="white" />
        <h3 className="btn-text">Scribe</h3>
      </Link>
      <Link href="/Chat">
        <MessageSquarePlus
          size={120}
          color="white"
        />
        <h3 className="btn-text">Health Chat</h3>
      </Link>
    </div>
  );
};

export default Options;
