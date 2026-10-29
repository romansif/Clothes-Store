import type { PageVariant } from "@/widgets/state";

export const stateBoxClass = 'w-full flex flex-col justify-center items-center z-50 gap-8 py-12 font-releway bg-white border border-[#e5e5e5]'

export const stateBoxVariantClass: Record<PageVariant, string> = {
    user: `${stateBoxClass} `,
    'season-list': `${stateBoxClass} mt-10`,
    'week-list': `${stateBoxClass} mt-10`,
    'year-list': `${stateBoxClass} mt-10`,
    products: `${stateBoxClass} mt-20`,
    'my-products': `${stateBoxClass} mt-30`,
    cart: `${stateBoxClass} mt-10`,
    favorite: `${stateBoxClass} mt-10`,
    reviews: `${stateBoxClass} `,
    orders: `${stateBoxClass} mt-14`,
    addresses: `${stateBoxClass} mt-18`,
    payments: `${stateBoxClass} mt-18`,
}

export const stateBoxMessageClass = 'flex flex-col items-center gap-6'

export const stateTitleClass = 'font-semibold text-xl'

export const stateTextClass = 'font-medium'

export const buttonBoxClass = 'flex items-center gap-6'

export const stateRouteClass: Record<PageVariant, string> = {
    user: `hidden`,
    'season-list': `${buttonBoxClass}`,
    'week-list': `${buttonBoxClass}`,
    'year-list': `${buttonBoxClass}`,
    products: 'hidden',
    'my-products': `${buttonBoxClass}`,
    cart: `${buttonBoxClass}`,
    favorite: `${buttonBoxClass}`,
    reviews: 'hidden',
    orders: `${buttonBoxClass}`,
    addresses: 'hidden',
    payments: 'hidden',
}