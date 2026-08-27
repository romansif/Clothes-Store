import { type Request, type Response, type NextFunction } from 'express';
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

        body('phone')
            .if(body('role').equals('Buyer'))
            .notEmpty().withMessage('Private phone required to registration.'),

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

    loginSendSmsValidation: [
        body('phone')
            .trim()
            .notEmpty().withMessage('Phone required to login'),
    ],

    loginVerifySmsValidation: [
        body('validCode')
            .trim()
            .notEmpty().withMessage('The code required to login'),
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
        body('collection')
            .notEmpty().withMessage('Collection required to create product.')
            .isObject().withMessage('Collection must be an object.'),

        body('collection.name')
            .isString()
            .notEmpty()
            .trim(),

        body('collection.season')
            .isString()
            .notEmpty()
            .trim(),

        body('collection.condition')
            .isString()
            .notEmpty()
            .trim(),

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

        body('colors')
            .isArray({ min: 1 })
            .withMessage('The color of the pillar should be substantial.'),

        body('colors.*.hex')
            .isString()
            .notEmpty()
            .withMessage('Hex is mandatory.'),

        body('colors.*.colorName')
            .isString()
            .notEmpty()
            .withMessage('ColorName is required.'),

        body('sizes')
            .notEmpty().withMessage('Size required to create product.'),

        body('gender')
            .trim()
            .notEmpty().withMessage('Gender required to create product.'),

        body('quantity')
            .trim()
            .notEmpty().withMessage('Quantity required to create product.'),
    ],

    addProductToCartValidation: [
        body('colors')
            .isArray()
            .withMessage('The color of the pillar should be substantial.'),

        body('colors.*.hex')
            .isString()
            .notEmpty()
            .withMessage('Hex is mandatory.'),

        body('colors.*.colorName')
            .isString()
            .notEmpty()
            .withMessage('ColorName is required.'),

        body('sizes')
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

    replaceOrderValidation: [
        body('cause_replace')
            .trim()
            .notEmpty().withMessage('Select a reason for cancellation.'),
    ],

    handleValidationErrors (req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const formattedErrors: Record<string, string> = {};

            errors.array().forEach(err => {
                if('path' in err){
                    formattedErrors[err.path] = err.msg;
                }
            });

            console.log(errors);

            return res.status(400).json({
                message: 'Ошибка валидации данных',
                errors: formattedErrors
            });
        }
        return next();
    }
};