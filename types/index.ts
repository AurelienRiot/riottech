import {
  Category,
  Image,
  Order,
  Product,
  SubscriptionOrder,
  User,
} from "@prisma/client";

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export type Option = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export interface DataTableFilterOption<TData> {
  id?: string;
  label: string;
  value: keyof TData | string;
  items: Option[];
  isMulti?: boolean;
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData;
  title: string;
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[];
}

export interface DataTableViewOptionsColumn<TData> {
  id: keyof TData;
  title: string;
}

export type ProductWithCategoryAndImages = Product & {
  images: Image[];
  category: Category;
};

export type UserWithOrders = User & {
  orders: Order[];
  subscriptionOrder: SubscriptionOrder[];
};
