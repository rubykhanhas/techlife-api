import {getModelForClass, modelOptions, prop} from "@typegoose/typegoose";
import {GraphQLScalarType} from "graphql";
import GraphQLJSON from "graphql-type-json";
import {ObjectId} from "mongoose";
import {Field, ID, ObjectType} from "type-graphql";

@ObjectType()
@modelOptions({options: {allowMixed: 0}})
export class Product {
  @Field((_) => ID)
  readonly _id: ObjectId;

  @Field()
  @prop()
  productID: string;

  @Field()
  @prop()
  category: string;

  @Field()
  @prop()
  brand: string;

  @Field()
  @prop()
  currentPrice: number;

  @Field()
  @prop()
  name: string;

  @Field()
  @prop()
  thumbImage: string;

  @Field()
  @prop()
  salePercent: number;

  @Field()
  @prop()
  remain: number;

  @Field()
  @prop()
  sold: number;

  @Field()
  @prop()
  ratingStar: number;

  @Field({nullable: true})
  @prop()
  preOrder?: boolean;

  @Field({nullable: true})
  @prop()
  eventImage?: string;

  @Field({nullable: true})
  @prop()
  fullName?: string;

  @Field({nullable: true})
  @prop()
  oldPrice?: number;

  @Field({nullable: true})
  @prop()
  articleInnerHTML?: string;

  @Field((_) => [String], {nullable: true})
  @prop({type: () => [String], required: false})
  imageList?: string[];

  @Field((_) => [String], {nullable: true})
  @prop({type: () => [String], required: false})
  relatedProductIDList?: string[];

  @Field((_) => [GraphQLJSON], {nullable: true})
  @prop({type: () => [Object], required: false})
  parameterList?: GraphQLScalarType[];
}

export const ProductModel = getModelForClass(Product);
