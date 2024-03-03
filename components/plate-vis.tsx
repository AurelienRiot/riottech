import { plugins } from "@/lib/plate/plate-plugins";
import { Plate } from "@udecode/plate-common";
import { Editor } from "./plate-ui/editor";

export const PlateVis = ({ value }: { value: string }) => {
  return (
    <Plate initialValue={JSON.parse(value)} plugins={plugins}>
      <Editor
        className="p-4 cursor-default bg-white"
        autoFocus
        focusRing={false}
        variant="ghost"
        size="md"
        readOnly
      />
    </Plate>
  );
};
