import { accessControl, createdAt, field, lastUpdatedAt, model, required } from '@eunovo/superbackend';
import { Currency } from '../../core/Currency';

@accessControl('product')
@model('Product')
export class Product {

    _id?: string;

    @required()
    @field('name', 'String')
    name!: string;

    @required()
    @field('prices', 'Mixed')
    prices!: { currency: Currency, value: number }[];

    @createdAt()
    @field('createdAt', 'Date')
    createdAt!: Date;

    @lastUpdatedAt()
    @field('lastUpdatedAt', 'Date')
    lastUpdatedAt!: Date;
}
