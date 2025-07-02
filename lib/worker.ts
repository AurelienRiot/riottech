import { pipeline, env, type PipelineType } from "@xenova/transformers";

env.allowLocalModels = false;

// biome-ignore lint/complexity/noStaticOnlyClass: static-only class is intentional for singleton pattern
class Pipeline {
  static task: PipelineType = "object-detection";
  static model = "Xenova/detr-resnet-50";
  static instance: any = null;

  static async getInstance(progress_callback: any | undefined) {
    if (Pipeline.instance === null) {
      Pipeline.instance = pipeline(Pipeline.task, Pipeline.model, { progress_callback });
    }
    return Pipeline.instance;
  }
}

self.addEventListener("message", async (event) => {
  const detector = await Pipeline.getInstance((x: any) => {
    self.postMessage(x);
  });

  const result = await detector(event.data.image, { percentage: true });
  self.postMessage({ status: "complete", result });
});
