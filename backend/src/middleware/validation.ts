import { type Request, type Response, type NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

const MAX = {
    name: 100,
    email: 254,
    phone: 32,
    short: 100,
    title: 200,
    text: 5000,
    password: 72,
};

const PHONE_CHARS = /^[+\d\s\-().]+$/;

const STRONG_PASSWORD = /^(?=.*[A-Za-zА-Яа-я])(?=.*\d)(?=.*[^A-Za-zА-Яа-я\d\s]).{8,72}$/;

const requiredText = (field: string, message: string, max: number = MAX.short) =>
    body(field).isString().withMessage(message).bail()
        .trim().notEmpty().withMessage(message).bail()
        .isLength({ max }).withMessage(`${message.replace(/ is required.*/, '')} is too long`);

const phoneRule = (field: string) =>
    body(field).isString().withMessage('Phone is required').bail()
        .trim().notEmpty().withMessage('Phone is required').bail()
        .isLength({ max: MAX.phone }).withMessage('Phone is too long')
        .matches(PHONE_CHARS).withMessage('Invalid phone number');

export const validation = {
    registerValidation: [
        requiredText('name', 'Name is required', MAX.name),

        requiredText('surName', 'Last name is required', MAX.name),

        phoneRule('phone'),

        body('email').isString().withMessage('Email is required').bail()
            .trim().notEmpty().withMessage('Email is required').bail()
            .isLength({ max: MAX.email }).withMessage('Invalid email')
            .isEmail().withMessage('Invalid email'),

        body('password').isString().withMessage('Password is required').bail()
            .trim().notEmpty().withMessage('Password is required'),

        body('password')
            .isLength({ min: 8, max: MAX.password }).withMessage('The password must be at least 8 characters long')
            .matches(STRONG_PASSWORD)
            .withMessage('Include a letter, number, and special character ($!%*#?&)'),
    ],

    loginValidation: [
        body('email').isString().withMessage('Email and Password is required').bail()
            .trim().notEmpty().withMessage('Email and Password is required').bail()
            .isLength({ max: MAX.email }).withMessage('Invalid email')
            .isEmail().withMessage('Invalid email'),

        body('password').isString().withMessage('Email and Password is required').bail()
            .trim().notEmpty().withMessage('Email and Password is required').bail()
            .isLength({ max: MAX.password }).withMessage('Email and Password is required'),

        body('role').isString().notEmpty().withMessage('You need to select a role to determine how you want to login').bail()
            .isIn(['Buyer', 'Seller']).withMessage('You need to select a role to determine how you want to login'),
    ],

    loginSendSmsValidation: [
        phoneRule('phone'),
    ],

    loginVerifySmsValidation: [
        body('validCode').isString().withMessage('The code required to login').bail()
            .trim().notEmpty().withMessage('The code required to login').bail()
            .isLength({ max: 12 }).withMessage('The code required to login'),
    ],

    updateUserNameValidation: [
        requiredText('name', 'Name is required', MAX.name),
    ],

    updateUserSurNameValidation: [
        requiredText('surName', 'Last name is required', MAX.name),
    ],

    updateUserPhoneValidation: [
        body('phone').if(body('publicPhone').not().exists())
            .isString().withMessage('Phone is required').bail()
            .trim().notEmpty().withMessage('Phone is required').bail()
            .isLength({ max: MAX.phone }).withMessage('Phone is too long')
            .matches(PHONE_CHARS).withMessage('Invalid phone number'),

        body('phone').optional()
            .isString().withMessage('Invalid phone number').bail()
            .trim().isLength({ max: MAX.phone }).withMessage('Phone is too long')
            .matches(PHONE_CHARS).withMessage('Invalid phone number'),

        body('publicPhone').optional()
            .isString().withMessage('Invalid phone number').bail()
            .trim().notEmpty().withMessage('Phone is required').bail()
            .isLength({ max: MAX.phone }).withMessage('Phone is too long')
            .matches(PHONE_CHARS).withMessage('Invalid phone number'),
    ],

    updateUserEmailValidation: [
        body('email').isString().withMessage('Email is required').bail()
            .trim().notEmpty().withMessage('Email is required').bail()
            .isLength({ max: MAX.email }).withMessage('Invalid email')
            .isEmail().withMessage('Invalid email'),
    ],

    updateUserPasswordValidation: [
        body('oldPassword').isString().withMessage('OldPassword required to update password').bail()
            .trim().notEmpty().withMessage('OldPassword required to update password').bail()
            .isLength({ max: MAX.password }).withMessage('OldPassword required to update password'),

        // Trimmed like the registration and login passwords, otherwise a password saved
        // with a leading/trailing space could never be typed in again at login.
        body('newPassword').isString().withMessage('The password must be at least 8 characters long').bail()
            .trim()
            .isLength({ min: 8, max: MAX.password }).withMessage('The password must be at least 8 characters long')
            .matches(STRONG_PASSWORD)
            .withMessage('Include a letter, number, and special character ($!%*#?&)'),
    ],

    createProductValidation: [
        requiredText('title', 'Title is required', MAX.title),

        body('collection').isObject().withMessage('Collection must be an object'),

        requiredText('collection.name', 'Collection name is required'),

        requiredText('collection.season', 'Season is required'),

        requiredText('collection.condition', 'Condition is required'),

        requiredText('category', 'Category is required'),

        requiredText('material', 'Material is required'),

        requiredText('gender', 'Gender is required'),

        requiredText('sku', 'SKU is required'),

        body('price').notEmpty().withMessage('Price is required').bail()
            .isFloat({ min: 0 }).withMessage('Price must be a number'),

        requiredText('description', 'Description is required', MAX.text),

        requiredText('status', 'Status is required'),

        body('colors').isArray({ min: 1, max: 50 }).withMessage('Colors are required'),

        requiredText('colors.*.hex', 'Color hex is required', 32),

        requiredText('colors.*.colorName', 'Color name is required'),

        body('sizes').isArray({ min: 1, max: 50 }).withMessage('Sizes are required'),

        body('sizes.*').isString().withMessage('Size is required').bail()
            .trim().notEmpty().withMessage('Size is required').bail()
            .isLength({ max: 32 }).withMessage('Size is too long'),

        body('variants').isArray({ min: 1, max: 500 }).withMessage('Variants are required'),

        requiredText('variants.*.hex', 'Variant hex is required', 32),

        requiredText('variants.*.colorName', 'Variant color name is required'),

        requiredText('variants.*.size', 'Variant size is required', 32),

        body('variants.*.count').notEmpty().withMessage('Count is required').bail()
            .isInt({ min: 0, max: 1_000_000 }).withMessage('Count must be a number'),
    ],

    addProductToCartValidation: [
        body('colors').isArray({ min: 1, max: 50 }).withMessage('Color is required'),

        requiredText('colors.*.hex', 'Color is required', 32),

        requiredText('colors.*.colorName', 'Color is required'),

        requiredText('sizes', 'Size is required to add product to cart', 32),
    ],

    addAddressValidation: [
        body('email').isString().withMessage('Email is required').bail()
            .trim().notEmpty().withMessage('Email is required').bail()
            .isLength({ max: MAX.email }).withMessage('Invalid email')
            .isEmail().withMessage('Invalid email'),

        phoneRule('phone'),

        requiredText('firstName', 'First name is required', MAX.name),

        requiredText('lastName', 'Last name is required', MAX.name),

        requiredText('country', 'Country is required'),

        requiredText('stateRegion', 'State or region is required'),

        requiredText('address', 'Address is required', 300),

        requiredText('city', 'City is required'),

        requiredText('postalCode', 'Postal code is required', 20),
    ],

    shippingValidation: [
        requiredText('delivery', 'Shipping Method Code required to order', 64),
    ],

    paymentValidation: [
        body('paymentMethod').isString().withMessage('Select a payment method').bail()
            .trim().notEmpty().withMessage('Select a payment method')
            .isIn(['card', 'apple', 'google', 'paypal']).withMessage('Invalid payment method'),

        body('cardNumber').if(body('paymentMethod').equals('card'))
            .isString().withMessage('Enter the card number').bail()
            .trim().notEmpty().withMessage('Enter the card number').bail()
            .isLength({ max: 32 }).withMessage('Enter the card number'),

        body('expiryDate').if(body('paymentMethod').equals('card'))
            .isString().withMessage('Enter the card\'s expiration date').bail()
            .notEmpty().withMessage('Enter the card\'s expiration date').bail()
            .isLength({ max: 10 }).withMessage('Enter the card\'s expiration date'),

        body('cardCvv').if(body('paymentMethod').equals('card'))
            .isString().withMessage('Enter the card cvv').bail()
            .trim().notEmpty().withMessage('Enter the card cvv')
            .isLength({ min: 3, max: 4 }).withMessage('Enter the card cvv')
    ],

    replaceOrderValidation: [
        requiredText('cause_replace', 'Select a reason for cancellation', 500),
    ],

    createReviewValidation: [
        body('rating').notEmpty().withMessage('Rating is required').bail()
            .isFloat({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),

        body('comment').isString().withMessage('Comment is required').bail()
            .notEmpty().withMessage('Comment is required').bail()
            .isLength({ max: 2000 }).withMessage('Comment is too long'),
    ],

    handleValidationErrors (req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const formattedErrors: Record<string, string> = {};

            errors.array().forEach(err => {
                if ('path' in err) {
                    formattedErrors[err.path] = err.msg;
                }
            });

            return res.status(400).json({
                message: 'Ошибка валидации данных',
                errors: formattedErrors
            });
        }
        return next();
    }
};