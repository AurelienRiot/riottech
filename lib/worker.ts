import { pipeline, env, type PipelineType } from "@xenova/transformers";

env.allowLocalModels = false;

// biome-ignore lint/complexity/noStaticOnlyClass:
class Pipeline {
  static task: PipelineType = "object-detection";
  static model = "Xenova/detr-resnet-50";
  static instance: any = null;

  // biome-ignore lint/complexity/noBannedTypes:
  static async getInstance(progress_callback: Function | undefined) {
    // biome-ignore lint/complexity/noThisInStatic:
    if (this.instance === null) {
      // biome-ignore lint/complexity/noThisInStatic:
      this.instance = pipeline(this.task, this.model, { progress_callback });
    }
    // biome-ignore lint/complexity/noThisInStatic:
    return this.instance;
  }
}

self.addEventListener("message", async (event) => {
  const detector = await Pipeline.getInstance((x: any) => {
    self.postMessage(x);
  });

  const result = await detector(event.data.image, { percentage: true });
  self.postMessage({ status: "complete", result });
});
