import cx from "classnames";

type Item = {
  title: string;
};

type Group = {
  groupTitle: string;
  items: Item[];
};

const data: Group[] = [
  {
    groupTitle: "GEOGRAPHY",
    items: [
      { title: "Pololu Valley" },
      { title: "Upolu Point" },
      { title: "Kohala Mountain (an area)" },
      { title: "Kawaihae Harbor" },
      { title: "Waipio Valley" },
    ],
  },
  {
    groupTitle: "ANCIENT HAWAIIAN CIVILIZATION",
    items: [
      {
        title:
          "Kohala Field System (an area: 25 sq mile area on west side of peninsula)",
      },
      {
        title:
          "Ahupua'a example (an area: we choose one ahupua'a like Halawa and story explains the ahupua'a's importance)",
      },
      { title: "Lapakahi Village" },
      { title: "King Kamehameha's birthplace" },
    ],
  },
  {
    groupTitle: "PLANTATION ERA",
    items: [
      { title: "Location of the 5 sugar mills and camps" },
      { title: "Location of services like Takata grocery" },
      { title: "Railroad" },
      {
        title: "Mahukona Wharf where sugar was loaded onto barges for Honolulu",
      },
    ],
  },
  {
    groupTitle: "PANIOLO RANCHING ERA",
    items: [{ title: "Kahua Ranch" }, { title: "Parker Ranch" }],
  },
  {
    groupTitle: "MODERN ERA",
    items: [
      { title: "Hawi town location" },
      { title: "Kapa'au town location" },
      { title: "Pololu Valley Overlook" },
      { title: "King Kamehameha statue" },
    ],
  },
];

export function IPad() {
  return (
    <div className="p-8 space-y-6 bg-white">
      {data.map((group, gi) => (
        <div key={group.groupTitle}>
          {/* Group Title */}
          <h2 className="text-lg text-blue-800/60 font-semibold tracking-wide mb-2">
            {group.groupTitle}
          </h2>

          {/* Items */}
          <ul className="space-y-1">
            {group.items.map((item, i) => (
              <li
                key={item.title}
                className={cx(
                  "text-2xl px-3 py-2 rounded-md hover:bg-gray-100 transition whitespace-nowrap overflow-hidden text-ellipsis",
                  {
                    "bg-blue-700/70 text-white": gi == 1 && i == 2,
                  },
                )}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
