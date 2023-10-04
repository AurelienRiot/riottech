import {
  Billboard,
  Category,
  Image,
  Order,
  Product,
  SubscriptionOrder,
  User,
} from "@prisma/client";

export type ProductWithCategoryAndImages = Product & {
  images: Image[];
  category: Category;
};

export type UserWithOrders = User & {
  orders: Order[];
  subscriptionOrder: SubscriptionOrder[];
};

export type CategoryWithBillboard = Category & {
  billboard: Billboard;
};
