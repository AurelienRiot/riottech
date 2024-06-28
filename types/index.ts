import type { Category, Image, Order, Product, SubscriptionOrder, User } from "@prisma/client";

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

export interface DataTableFilterableColumn<TData> extends DataTableSearchableColumn<TData> {
  options: Option[];
}

export interface DataTableViewOptionsColumn<TData> {
  id: keyof TData;
  title: string;
}

export interface ProductWithCategoryAndImages extends Product {
  images: Image[];
  category: Category;
}

export interface UserWithOrders extends User {
  orders: Order[];
  subscriptionOrder: SubscriptionOrder[];
}

export type ReturnTypeServerAction<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      message: string;
    };
