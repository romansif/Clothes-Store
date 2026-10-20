import type {
    Collection,
    Gender,
    Material,
    Category,
    SizeGuide,
    SizesShoes,
} from "@/shared/model/product.types.ts";

const collections: Collection[] = [
    {season: 'Spring', condition: 'New', name: 'Essence'},
    {season: 'Autumn', condition: 'Old', name: 'Silence'},
    {season: 'Summer', condition: 'New', name: 'Blueprint'},
    {season: 'Autumn', condition: 'Old', name: 'Chapter |'},
    {season: 'Summer', condition: 'New', name: 'Raw'},
    {season: 'Winter', condition: 'Old', name: 'Mono'},
    {season: 'Spring', condition: 'New', name: 'Grid'},
    {season: 'Autumn', condition: 'Old', name: 'Draft'},
    {season: 'Winter', condition: 'Old', name: 'Void'},
    {season: 'Spring', condition: 'New', name: 'Static'},
]

const categories: Category[] = [
    {category: 'Shoes'},
    {category: 'Underpants'},
    {category: 'Shorts'},
    {category: 'Jeans'},
    {category: 'Pants'},
    {category: 'Shirts'},
    {category: 'T-shirts'},
    {category: 'Tank top'},
    {category: 'Sweaters'},
];

const materials: Material[] = [
    {material: 'Cotton'},
    {material: 'Synthetics'},
    {material: 'Wool'},
    {material: 'Flax'},
    {material: 'Polyester'},
    {material: 'Nylon'},
    {material: 'Acrylic'},
    {material: 'Viscose'},
];

const genders: Gender[] = [
    {gender: 'Unisex'},
    {gender: 'Man'},
    {gender: 'Woman'},
    {gender: 'Kids'},
];

const sizesShoes: SizesShoes[] = [
    {name: '39'},
    {name: '40'},
    {name: '41'},
    {name: '42'},
    {name: '43'},
    {name: '44'},
    {name: '45'},
    {name: '46'},
];

const outerwearSizeGuide: SizeGuide[] = [
    {name: 'Heigh', values: ['163', '168', '173', '178', '183', '188']},
    {name: 'Chest', values: ['86', '92', '98', '104', '110', '116']},
    {name: 'Waist', values: ['68', '72', '78', '84', '90', '96']},
    {name: 'Length', values: ['64', '66', '68', '70', '72', '74']},
];

const underWearSizeGuide: SizeGuide[] = [
    {name: 'Heigh', values: ['163', '168', '173', '178', '183', '188']},
    {name: 'Waist', values: ['66', '70', '76', '81', '87', '94']},
    {name: 'Hips', values: ['90', '94', '99', '105', '111', '119']},
    {name: 'Waist', values: ['77', '80', '82', '84', '86', '88']},
];

const shoesSizeGuide: SizeGuide[] = [
    {name: 'Length', values: ['25', '25.7', '26.3', '27', '27.7', '28.3', '29', '29.7']}
];

const outerWear = [
    'Shirts',
    'T-shirts',
    'Tank top',
    'Sweaters',
];

const underWear = [
    'Underpants',
    'Shorts',
    'Jeans',
    'Pants',
];

const skuMask = {
    mask: '***-**-***',
    definitions: {
        '*': /[a-zA-Z0-9]/
    }
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
    }
}