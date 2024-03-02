"use client";

import { cn } from "@udecode/cn";
import { Plate } from "@udecode/plate-common";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import { useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { CursorOverlay } from "@/components/plate-ui/cursor-overlay";
import { Editor } from "@/components/plate-ui/editor";
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons";
import { MentionCombobox } from "@/components/plate-ui/mention-combobox";
import { Button } from "@/components/ui/button";
import { MENTIONABLES } from "@/lib/plate/mentionables";
import { plugins } from "@/lib/plate/plate-plugins";

const initialValue = [
  {
    id: "1",
    type: ELEMENT_PARAGRAPH,
    children: [
      { text: "Hello", underline: true },
      { text: ", " },
      { text: "World", bold: true },
      { text: "!" },
    ],
  },
];
0;

export function PlateEditor() {
  const [value, setValue] = useState(initialValue);
  const containerRef = useRef(null);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {/* <CommentsProvider users={commentsUsers} myUserId={myUserId}> */}
        <Plate
          plugins={plugins}
          initialValue={initialValue}
          value={value}
          onChange={setValue}
        >
          <div
            ref={containerRef}
            className={cn(
              // Block selection
              "[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4"
            )}
          >
            <FixedToolbar>
              <FixedToolbarButtons />
            </FixedToolbar>

            <Editor
              className="px-[96px] py-16 rounded-t-none"
              autoFocus
              focusRing={false}
              variant="ghost"
              size="md"
            />

            <FloatingToolbar>
              <FloatingToolbarButtons />
            </FloatingToolbar>

            <MentionCombobox items={MENTIONABLES} />

            {/* <CommentsPopover /> */}

            <CursorOverlay containerRef={containerRef} />
          </div>
        </Plate>
        {/* </CommentsProvider> */}
      </DndProvider>

      <Button className="w-full mt-2" onClick={() => console.log(value)}>
        Envoyer
      </Button>
      {/* <Plate value={value} plugins={plugins}>
        <Editor
          className="px-[96px] py-16 cursor-default bg-white"
          autoFocus
          focusRing={false}
          variant="ghost"
          size="md"
          readOnly
        />
      </Plate> */}
    </>
  );
}
