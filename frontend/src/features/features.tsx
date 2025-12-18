import type { Feature } from "../types/types";
import kalahikiolaChurch from "/assets/kalahikiola-church.png";
import kohalaVolcano from "/assets/kohala-volcano.png";
import waipioValley from "/assets/waipio-valley.png";
import kohalaVolcanoLayer from "/assets/kohala-volcano-layer.png";

/**
 * These descriptions are AI generated as mock data
 */
export const featuresData: Feature[] = [
  {
    id: "waipio-valley",
    title: "Waipiʻo Valley",
    description:
      "Waipiʻo Valley, once home to Hawaiian kings and aliʻi (chiefs), was a thriving center of agriculture and spiritual life. Its fertile lands supported taro cultivation, and sacred sites dotted the valley. Today, it remains a living symbol of Hawaiʻi’s ancient culture and natural beauty.",
    titleHawaiian: "Waipiʻo",
    descriptionHawaiian:
      "He pāka ʻāina nani ʻo Waipiʻo, i kapa ʻia he “Valley of the Kings.” Nui nā pali kiʻekiʻe, nā lō wai ʻelima, ka ʻone hina, a me nā māla kalo ʻulaʻula, he wahi hohonu i ka moʻomeheu Hawaiʻi. He ʻāina mamao, kūloko, a nani hoʻi i ka ʻāina a me ke kai.",
    points: [
      {
        coordinates: [20.110074, -155.599717],
      },
    ],
    imgSrc: waipioValley,
  },
  {
    id: "kohala-volcano",
    title: "Kohala Volcano",
    description:
      "Kohala Volcano, the oldest volcano on Hawaiʻi’s Big Island, is extinct and heavily eroded, forming valleys, cliffs, and fertile lands. Its slopes supported ancient Hawaiian communities, agriculture, and sacred sites, making it an important cultural and historical center.",
    titleHawaiian: "Kohala",
    descriptionHawaiian:
      "He mauna ʻāhiu ʻo Kohala ma ka ʻākau ʻaoʻao o Hawaiʻi Nui. He mauna ʻokiʻoki ia, ua pau kona puhi, a ua kūkulu ʻia nā wāwae, nā pali, a me nā māla ʻāina ulu lāʻau. Ua noho nā kānaka kahiko ma kona mau pali a kanu i ka kalo, a kūkulu pū i nā heiau a me nā loko iʻa, he wahi hohonu i ka moʻomeheu Hawaiʻi.",
    points: [
      {
        coordinates: [20.085918, -155.717122],
      },
    ],
    layers: [{ imgSrc: kohalaVolcanoLayer, filter: "sepia(1) saturate(2)" }],
    imgSrc: kohalaVolcano,
  },
  {
    id: "kalahikiola-church",
    title: "Kalahikiola Church",
    description:
      "Kalahikiola Congregational Church is a historic 19th-century church in North Kohala, Hawaiʻi. Known for its classic missionary-style architecture, it remains an active place of worship and a symbol of the island’s cultural and spiritual heritage.",
    titleHawaiian: "Kalahikiola",
    descriptionHawaiian:
      "He hale pule kahiko ʻo Kalahikiola ma Kohala ʻAmelika ʻĀkau, ma Hawaiʻi Nui. Ua kūkulu ʻia ia i ka wā misionari i ka 19th kenekulia, a he ʻano hale misionari maʻamau kona — he hale lāʻau paʻakikī, ʻeleʻele a keʻokeʻo kona ʻili, me ka pāpale ʻoi loa. Aia ia i loko o ka ʻāina ulu lāʻau, a noho mau ana i ka hana pule a he hōʻailona koʻikoʻi o ka moʻomeheu a me ka ʻuhane Hawaiʻi.",
    points: [
      {
        coordinates: [20.222433, -155.794461],
      },
    ],
    imgSrc: kalahikiolaChurch,
  },
];
