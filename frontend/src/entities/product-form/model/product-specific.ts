import type { Category, Collection, Gender, Material, SizeGuide, SizesShoes } from "@/shared";

const collections: Collection[] = [
  {
    season: "Spring",
    condition: "New",
    name: "Essence",
    seasonLabel: "seasons.spring.name",
    conditionLabel: "conditions.new",
  },
  {
    season: "Autumn",
    condition: "Old",
    name: "Silence",
    seasonLabel: "seasons.autumn.name",
    conditionLabel: "conditions.old",
  },
  {
    season: "Summer",
    condition: "New",
    name: "Blueprint",
    seasonLabel: "seasons.summer.name",
    conditionLabel: "conditions.new",
  },
  {
    season: "Autumn",
    condition: "Old",
    name: "Chapter |",
    seasonLabel: "seasons.autumn.name",
    conditionLabel: "conditions.old",
  },
  {
    season: "Summer",
    condition: "New",
    name: "Raw",
    seasonLabel: "seasons.summer.name",
    conditionLabel: "conditions.new",
  },
  {
    season: "Winter",
    condition: "Old",
    name: "Mono",
    seasonLabel: "seasons.winter.name",
    conditionLabel: "conditions.old",
  },
  {
    season: "Spring",
    condition: "New",
    name: "Grid",
    seasonLabel: "seasons.spring.name",
    conditionLabel: "conditions.new",
  },
  {
    season: "Autumn",
    condition: "Old",
    name: "Draft",
    seasonLabel: "seasons.autumn.name",
    conditionLabel: "conditions.old",
  },
  {
    season: "Winter",
    condition: "Old",
    name: "Void",
    seasonLabel: "seasons.winter.name",
    conditionLabel: "conditions.old",
  },
  {
    season: "Spring",
    condition: "New",
    name: "Static",
    seasonLabel: "seasons.spring.name",
    conditionLabel: "conditions.new",
  },
];

const categories: Category[] = [
  { category: "Shoes", categoryLabel: "categories.shoes" },
  { category: "Underpants", categoryLabel: "categories.underpants" },
  { category: "Shorts", categoryLabel: "categories.shorts" },
  { category: "Jeans", categoryLabel: "categories.jeans" },
  { category: "Pants", categoryLabel: "categories.pants" },
  { category: "Shirts", categoryLabel: "categories.shirts" },
  { category: "T-shirts", categoryLabel: "categories.tShirts" },
  { category: "Tank top", categoryLabel: "categories.tankTop" },
  { category: "Sweaters", categoryLabel: "categories.sweaters" },
];

const materials: Material[] = [
  { material: "Cotton", materialLabel: "materials.cotton" },
  { material: "Synthetics", materialLabel: "materials.synthetics" },
  { material: "Wool", materialLabel: "materials.wool" },
  { material: "Flax", materialLabel: "materials.flax" },
  { material: "Polyester", materialLabel: "materials.polyester" },
  { material: "Nylon", materialLabel: "materials.nylon" },
  { material: "Acrylic", materialLabel: "materials.acrylic" },
  { material: "Viscose", materialLabel: "materials.viscose" },
];

const genders: Gender[] = [
  { gender: "Unisex", genderLabel: "genders.unisex" },
  { gender: "Man", genderLabel: "genders.man" },
  { gender: "Woman", genderLabel: "genders.woman" },
  { gender: "Kids", genderLabel: "genders.kids" },
];

const sizesShoes: SizesShoes[] = [
  { name: "39" },
  { name: "40" },
  { name: "41" },
  { name: "42" },
  { name: "43" },
  { name: "44" },
  { name: "45" },
  { name: "46" },
];

const outerwearSizeGuide: SizeGuide[] = [
  { name: "measurements.height", values: ["163", "168", "173", "178", "183", "188"] },
  { name: "measurements.chest", values: ["86", "92", "98", "104", "110", "116"] },
  { name: "measurements.waist", values: ["68", "72", "78", "84", "90", "96"] },
  { name: "measurements.length", values: ["64", "66", "68", "70", "72", "74"] },
];

const underWearSizeGuide: SizeGuide[] = [
  { name: "measurements.height", values: ["163", "168", "173", "178", "183", "188"] },
  { name: "measurements.length", values: ["66", "70", "76", "81", "87", "94"] },
  { name: "measurements.hips", values: ["90", "94", "99", "105", "111", "119"] },
  { name: "measurements.waist", values: ["77", "80", "82", "84", "86", "88"] },
];

const shoesSizeGuide: SizeGuide[] = [{ name: "measurements.length", values: ["25", "25.7", "26.3", "27", "27.7", "28.3", "29", "29.7"] }];

const outerWear = ["Shirts", "T-shirts", "Tank top", "Sweaters"];

const underWear = ["Underpants", "Shorts", "Jeans", "Pants"];

const skuMask = {
  mask: "***-**-***",
  definitions: {
    "*": /[a-zA-Z0-9]/,
  },
};

export const productSpecific = () => {
  return {
    collections,
    categories,
    materials,
    genders,
    sizesShoes,
    outerwearSizeGuide,
    underWearSizeGuide,
    shoesSizeGuide,

    outerWear,
    underWear,
    skuMask,
  };
};
