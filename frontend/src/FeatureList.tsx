import { useGlobal } from "./hooks/useGlobal";
import type { Feature } from "./types";
import cx from "classnames";

/**
 * These descriptions are AI generated as mock data
 */
const features: Feature[] = [
  {
    id: "waipio-valley",
    titleEnglish: "Waipiʻo Valley",
    descriptionEnglish:
      "Waipiʻo Valley, once home to Hawaiian kings and aliʻi (chiefs), was a thriving center of agriculture and spiritual life. Its fertile lands supported taro cultivation, and sacred sites dotted the valley. Today, it remains a living symbol of Hawaiʻi’s ancient culture and natural beauty.",
    titleHawaiian: "Waipiʻo",
    descriptionHawaiian:
      "He pāka ʻāina nani ʻo Waipiʻo, i kapa ʻia he “Valley of the Kings.” Nui nā pali kiʻekiʻe, nā lō wai ʻelima, ka ʻone hina, a me nā māla kalo ʻulaʻula, he wahi hohonu i ka moʻomeheu Hawaiʻi. He ʻāina mamao, kūloko, a nani hoʻi i ka ʻāina a me ke kai.",
    coordinates: [20.110074, -155.599717],
  },
  {
    id: "kohala-volcano",
    titleEnglish: "Kohala Volcano",
    descriptionEnglish:
      "Kohala Volcano, the oldest volcano on Hawaiʻi’s Big Island, is extinct and heavily eroded, forming valleys, cliffs, and fertile lands. Its slopes supported ancient Hawaiian communities, agriculture, and sacred sites, making it an important cultural and historical center.",
    titleHawaiian: "Kohala",
    descriptionHawaiian:
      "He mauna ʻāhiu ʻo Kohala ma ka ʻākau ʻaoʻao o Hawaiʻi Nui. He mauna ʻokiʻoki ia, ua pau kona puhi, a ua kūkulu ʻia nā wāwae, nā pali, a me nā māla ʻāina ulu lāʻau. Ua noho nā kānaka kahiko ma kona mau pali a kanu i ka kalo, a kūkulu pū i nā heiau a me nā loko iʻa, he wahi hohonu i ka moʻomeheu Hawaiʻi.",
    coordinates: [20.085918, -155.717122],
  },
];

function FeatureItem({ feature }: { feature: Feature }) {
  const { visibleFeature, setVisibleFeature } = useGlobal();
  return (
    <div
      className={cx("cursor-pointer", "hover:bg-sky-500/20", {
        "bg-sky-500/20": visibleFeature?.id === feature.id,
      })}
      onClick={() => {
        setVisibleFeature(feature);
      }}
    >
      <div>{feature.titleEnglish}</div>
    </div>
  );
}

export function FeatureList() {
  const Features = features.map((item) => {
    return <FeatureItem feature={item} />;
  });
  return <div className="w-full h-full">{Features}</div>;
}
