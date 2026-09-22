export const reviewsClasses = () => {
    const ratingStar = (form: number, rating: number) => [
        'w-12 transition duration-400',
        rating <= form ? 'scale-145' : form === rating - 0.5 ? 'scale-145' : 'hover:scale-120'
    ]

    return {
        ratingStar
    }
}