import cx from "classnames";

// [long, lat] follows the GeoJSON convention
type Longitude = number;
type Latitude = number;
type Coordinates = [Longitude, Latitude];

// real latitude coordinate range
const mapMinX = -155.905;
const mapMaxX = -155.58;

// real longitude coordinate range
const mapMinY = 20.01;
const mapMaxY = 20.27;

// map and table aspect ratios
const aspect5_4 = "aspect-[calc(5/4)]";
const aspect16_9 = "aspect-[calc(16/9)]";

// calculations for web
const mapRealWidthInches = 29.5;
const tableRealWidthInches = 42.666;
const mapWidthPercent = `w-[calc(${mapRealWidthInches}/${tableRealWidthInches}*100%)]`;

/**
 * @param lat real latitude of point
 * @param long real longitude of point
 * @returns the percent offset of the point from the left and top of the map
 */
function toPercent([long, lat]: Coordinates): [number, number] {
  const rangeY = mapMaxY - mapMinY;
  const rangeX = mapMaxX - mapMinX;

  // measuring percent from top, not from the bottom, hence the (1 -) at the begining
  const percentY = 1 - (long - mapMinY) / rangeY;

  // measuring percent from left
  const percentX = (lat - mapMinX) / rangeX;

  // because the map is flipped upside down
  // with North Kohala facing the viewer,
  // we must rotate the coords 180 degrees.
  const flippedX = 1 - percentX;
  const flippedY = 1 - percentY;

  return [flippedY, flippedX];
}

const coords: Coordinates[] = [
  [20.120687, -155.594712],
  [20.116891, -155.725791],
];

export function MapImage() {
  const Points = coords.map(([long, lat]) => {
    const [percentY, percentX] = toPercent([long, lat]);
    return (
      <div
        style={{
          width: 8,
          height: 8,
          background: "red",
          borderRadius: "100%",
          position: "absolute",
          top: `${percentY * 100}%`,
          left: `${percentX * 100}%`,
        }}
      />
    );
  });
  return (
    <div className="bg-black w-screen h-screen flex items-center">
      <div className={cx(aspect16_9, "w-full bg-[#8281ab] flex")}>
        <div className={cx(aspect5_4, mapWidthPercent, "relative")}>
          <img
            src="5-4.jpeg"
            className="border border-black/20"
            // className="w-[50%]"
            // className="w-[calc(28.5/42.666*100%)]"
          />
          {Points}
        </div>
        <div className="flex-1 p-8 flex flex-col justify-center items-center">
          <div className="w-2/3">
            <div className="text-4xl mb-8 mb-2 font-bold">Hello World</div>
            <div className="text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              laoreet at magna eget tempor. In hac habitasse platea dictumst.
              Duis mollis neque ut turpis aliquet malesuada. Phasellus imperdiet
              ligula turpis, id lobortis enim elementum ut. Etiam at enim nibh.
              Nam et massa non ante fermentum molestie. Curabitur ultricies
              magna aliquet, luctus odio sed, feugiat sapien. Curabitur
              imperdiet magna ut metus iaculis cursus eget quis arcu. Sed sed
              odio lobortis, lacinia tellus non, ultricies magna. Nulla vehicula
              varius congue.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
