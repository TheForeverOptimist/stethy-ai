import React from "react";
import "./Options.css";
import { NotepadText } from "lucide-react";

const Options = () => {
  return (
    <div className="icon-row">
      <button class="icon-btn">
        <NotepadText />
        <span class="btn-text">Button Text</span>
      </button>
      <button class="icon-btn">
        <span class="icon"></span>
        <span class="btn-text">Button Text</span>
      </button>
      <button class="icon-btn">
        <span class="icon"></span>
        <span class="btn-text">Button Text</span>
      </button>
    </div>
  );
};

export default Options;
