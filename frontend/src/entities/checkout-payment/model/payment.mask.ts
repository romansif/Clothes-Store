import {IMask} from "vue-imask";

export const cardNumberMask = {
    mask: '0000-0000-0000-0000',
    lazy: false,
}

export const expiryDateMask = {
    mask: '00/00',
    blocks: {
        MM:{
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
            maxLength: 2
        },
        YY:{
            mask: IMask.MaskedRange,
            from: 26,
            to: 32,
            maxLength: 2
        }
    },
    lazy: false
}

export const cardCvvMask = {
    mask: '000[0]',
    lazy: false
}