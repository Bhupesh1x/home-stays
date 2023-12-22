"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";

import Container from "../shared/Container";
import CategoryBox from "../shared/CategoryBox";

export const categories = [
  {
    label: "Beach",
    icon: <TbBeach size={24} />,
    description: "This property is close to beach.",
  },
  {
    label: "Windmills",
    icon: <GiWindmill size={24} />,
    description: "This property has windmills.",
  },
  {
    label: "Modern",
    icon: <MdOutlineVilla size={24} />,
    description: "This property is modern.",
  },
  {
    label: "Countryside",
    icon: <TbMountain size={24} />,
    description: "This property is in the countryside!",
  },
  {
    label: "Pools",
    icon: <TbPool size={24} />,
    description: "This is property has a beautiful pool!",
  },
  {
    label: "Islands",
    icon: <GiIsland size={24} />,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: <GiBoatFishing size={24} />,
    description: "This property is near a lake!",
  },
  {
    label: "Skiing",
    icon: <FaSkiing size={24} />,
    description: "This property has skiing activies!",
  },
  {
    label: "Castles",
    icon: <GiCastle size={24} />,
    description: "This property is an ancient castle!",
  },
  {
    label: "Caves",
    icon: <GiCaveEntrance size={24} />,
    description: "This property is in a spooky cave!",
  },
  {
    label: "Camping",
    icon: <GiForestCamp size={24} />,
    description: "This property offers camping activities!",
  },
  {
    label: "Arctic",
    icon: <BsSnow size={24} />,
    description: "This property is in arctic environment!",
  },
  {
    label: "Desert",
    icon: <GiCactus size={24} />,
    description: "This property is in the desert!",
  },
  {
    label: "Barns",
    icon: <GiBarn size={24} />,
    description: "This property is in a barn!",
  },
  {
    label: "Lux",
    icon: <IoDiamond size={24} />,
    description: "This property is brand new and luxurious!",
  },
];

function Categories() {
  const params = useSearchParams();
  const pathname = usePathname();

  const categoryParam = params?.get("category");
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="w-full flex items-center justify-between gap-x-2 pt-4 overflow-x-auto">
        {categories.map(({ label, icon, description }) => (
          <CategoryBox
            key={label}
            label={label}
            icon={icon}
            selected={categoryParam === label}
          />
        ))}
      </div>
    </Container>
  );
}

export default Categories;
