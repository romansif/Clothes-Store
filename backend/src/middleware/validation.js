import { body, validationResult } from 'express-validator';

export const validation = {
    registerValidation: [
        body('name')
            .trim()
            .notEmpty()
            .withMessage('Name required to registration.'),

        body('surName')
            .trim()
            .notEmpty()
            .withMessage('SurName required to registration.'),

        body('privatePhone')
            .if(body('role').equals('Buyer'))
            .notEmpty().withMessage('Private phone required to registration.'),

        body('companyName')
            .if(body('role').equals('Seller'))
            .notEmpty().withMessage('Company name required to registration by seller.'),

        body('publicPhone')
            .if(body('role').equals('Seller'))
            .notEmpty().withMessage('A company phone number required to registration by seller.'),

        body('email')
            .isEmail().withMessage('Invalid email format entered.')
            .normalizeEmail(),

        body('password')
            .notEmpty().withMessage('A password required to registration.'),

        body('password')
            .isLength({ min: 6, max: 12 }).withMessage('The password must be longer than 6 characters.')
            .matches(/^(?=.*[A-Za-zА-Яа-я])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-zА-Яа-я\d@$!%*#?&]{8,}$/)
            .withMessage('The password must contain at least one letter, one digit, and one special character (@$!%*#?&).'),
    ],

    loginValidation: [
        body('email')
            .trim()
            .notEmpty().withMessage('Email required to registration.'),

        body('email')
            .isEmail()
            .withMessage('Invalid email format entered.').normalizeEmail(),

        body('password')
            .notEmpty().withMessage('A password required to login.'),

        body('role')
            .notEmpty().withMessage('You need to select a role to determine how you want to login.')
    ],

    updateUserNameValidation: [
        body('name')
            .trim()
            .notEmpty().withMessage('Name required to update name.'),
    ],

    updateUserSurNameValidation: [
        body('surName')
            .trim()
            .notEmpty().withMessage('SurName required to update surName.'),
    ],

    updateUserPhoneValidation: [
        body('phone')
            .trim()
            .notEmpty().withMessage('Phone required to update phone.'),
    ],

    updateUserCompanyNameValidation: [
        body('companyName')
            .trim()
            .notEmpty().withMessage('Company Name required to update company name.'),
    ],

    updateUserPublicPhoneValidation: [
        body('publicPhone')
            .trim()
            .notEmpty().withMessage('Public Phone required to update phone.'),
    ],

    updateUserEmailValidation: [
        body('email')
            .isEmail().withMessage('Invalid email format entered.')
            .normalizeEmail(),
    ],

    updateUserPasswordValidation: [
        body('oldPassword')
            .trim()
            .notEmpty().withMessage('OldPassword required to update password.'),

        body('newPassword')
            .isLength({ min: 6, max: 12 }).withMessage('The password must be longer than 6 characters.')
            .matches(/^(?=.*[A-Za-zА-Яа-я])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-zА-Яа-я\d@$!%*#?&]{8,}$/)
            .withMessage('The password must contain at least one letter, one digit, and one special character (@$!%*#?&).'),
    ],

    createProductValidation: [
        body('collections')
            .trim()
            .notEmpty().withMessage('Collection required to create product.'),
        body('title')
            .trim()
            .notEmpty().withMessage('Title or name required to create product.'),

        body('category')
            .trim()
            .notEmpty().withMessage('Category required to create product.'),

        body('material')
            .trim()
            .notEmpty().withMessage('Material required to create product.'),

        body('price')
            .trim()
            .notEmpty().withMessage('Price required to create product.'),

        body('description')
            .trim()
            .notEmpty().withMessage('Description required to create product.'),

        body('color')
            .trim()
            .notEmpty().withMessage('Color required to create product.'),

        body('size')
            .trim()
            .notEmpty().withMessage('Size required to create product.'),

        body('gender')
            .trim()
            .notEmpty().withMessage('Gender required to create product.'),

        body('quantity')
            .trim()
            .notEmpty().withMessage('Quantity required to create product.'),
    ],

    addProductToCartValidation: [
        body('color')
            .trim()
            .notEmpty().withMessage('Color required to adding product to cart.'),

        body('size')
            .trim()
            .notEmpty().withMessage('Size required to adding product to cart.'),
    ],

    addAddressValidation: [
        body('email')
            .trim()
            .notEmpty().withMessage('Email required to order.'),

        body('phone')
            .trim()
            .notEmpty().withMessage('Phone required to order.'),

        body('firstName')
            .trim()
            .notEmpty().withMessage('FirstName required to order.'),

        body('lastName')
            .trim()
            .notEmpty().withMessage('LastName required to order.'),

        body('country')
            .trim()
            .notEmpty().withMessage('Country required to order.'),

        body('stateRegion')
            .trim()
            .notEmpty().withMessage('State or Region required to order.'),

        body('address')
            .trim()
            .notEmpty().withMessage('Address required to order.'),

        body('city')
            .trim()
            .notEmpty().withMessage('City required to order.'),

        body('postalCode')
            .trim()
            .notEmpty().withMessage('Postal Code required to order.'),
    ],

    shippingValidation: [
        body('delivery')
            .trim()
            .notEmpty().withMessage('Shipping Method Code required to order.'),
    ],

    paymentValidation: [
        body('paymentMethod')
            .trim()
            .notEmpty().withMessage('Select a payment method.')
            .isIn(['card', 'apple', 'google', 'paypal']).withMessage('Invalid payment method.'),

        body('cardNumber')
            .if(body('paymentMethod').equals('card'))
            .trim()
            .notEmpty().withMessage('Enter the card number.'),

        body('expiryDate')
            .if(body('paymentMethod').equals('card'))
            .notEmpty().withMessage('Enter the card\'s expiration date.'),

        body('cardCvv')
            .if(body('paymentMethod').equals('card'))
            .trim()
            .notEmpty().withMessage('Enter the card cvv.')
            .isLength({ min: 3, max: 4 }).withMessage('Enter the card cvv.')
    ],

    handleValidationErrors (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const formattedErrors = {};
            errors.array().forEach(err => {
                formattedErrors[err.path] = err.msg;
            });

            console.log(errors);

            return res.status(400).json({
                message: 'Ошибка валидации данных',
                errors: formattedErrors
            });
        }
        next();
    }
};