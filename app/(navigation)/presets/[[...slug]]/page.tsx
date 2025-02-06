import type { Metadata } from "next";
import Presets from "./presets";
import { getAvailableAiModels } from "@/api/ai";
import OgImage from "../assets/og-image.png";
import { allPresets } from "../presets";
import { getExtensions } from "@/api/store";

const pageTitle = "Preset Explorer by Raycast";
const pageDescription = "Easily browse, share, and add presets to Raycast.";
const ogUrl = OgImage.src;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    url: "/presets",
    title: pageTitle,
    description: pageDescription,
    siteName: "Ray.so",
    images: [
      {
        url: ogUrl,
        width: 1200,
        height: 630,
        alt: pageTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@raycastapp",
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: ogUrl,
        width: 1200,
        height: 630,
        alt: pageTitle,
      },
    ],
  },
  keywords: "prompts, AI, import, raycast, ideas",
};

export default async function Page() {
  const models = await getAvailableAiModels();
  const allExtensionIds = allPresets.reduce((acc: string[], preset) => {
    if (preset.extensions) {
      const extensionList = Array.isArray(preset.extensions) ? preset.extensions : [preset.extensions];
      extensionList.forEach((extension) => {
        if (!acc.includes(extension)) {
          acc.push(extension);
        }
      });
    }
    return acc;
  }, []);
  const extensions = await getExtensions({ extensionIds: allExtensionIds });
  return <Presets models={models} extensions={extensions} />;
}
