import { ref } from 'vue'

import xs from '../../../../app/assets/icons/size/xs.svg'
import s from '../../../../app/assets/icons/size/s.svg'
import m from '../../../../app/assets/icons/size/m.svg'
import l from '../../../../app/assets/icons/size/l.svg'
import xl from '../../../../app/assets/icons/size/xl.svg'
import xxl from '../../../../app/assets/icons/size/xxl.svg'

interface Product {
    id: string,
    title: string,
    category: string,
    material: string,
    description: string,
    price: number,
    color: string,
    size: string,
    favorite: boolean
}

const sizes = [
    {name: 'xs', url: xs},
    {name: 's', url: s},
    {name: 'm', url: m},
    {name: 'l', url: l},
    {name: 'xl', url: xl},
    {name: 'xxl', url: xxl},
]
const colors = [
    {name: 'light-gray', color: 'bg-gray-200'},
    {name: 'gray', color: 'bg-gray-400'},
    {name: 'black', color: 'bg-black'},
    {name: 'light-green', color: 'bg-green-200'},
    {name: 'white', color: 'bg-white'},
    {name: 'light-violet', color: 'bg-violet-300'},
]

const products = ref<Product[]>([])
const product = ref<Product>({} as Product)

export const productsStore = () => {
    return {
        products,
        product,
        colors,
        sizes
    }
}