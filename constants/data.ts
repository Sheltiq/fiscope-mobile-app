import { CategoryType, ExpenseCategoriesType } from "@/types";
import { colors } from "./theme";

import * as Icons from "phosphor-react-native";

export const expenseCategories: ExpenseCategoriesType = {
  groceries: {
    label: "Продукты питания",
    value: "groceries",
    icon: Icons.ShoppingCart,
    bgColor: "#4B5563",
  },
  rent: {
    label: "Аренда",
    value: "rent",
    icon: Icons.House,
    bgColor: "#075985",
  },
  utilities: {
    label: "ЖКХ",
    value: "utilities",
    icon: Icons.Lightbulb,
    bgColor: "#ca8a04",
  },
  transportation: {
    label: "Транспорт",
    value: "transportation",
    icon: Icons.Car,
    bgColor: "#b45309",
  },
  entertainment: {
    label: "Развлечение",
    value: "entertainment",
    icon: Icons.FilmStrip,
    bgColor: "#0f766e",
  },
  dining: {
    label: "Питание",
    value: "dining",
    icon: Icons.ForkKnife,
    bgColor: "#be185d",
  },
  health: {
    label: "Здоровье",
    value: "health",
    icon: Icons.Heart,
    bgColor: "#e11d48",
  },
  insurance: {
    label: "Страхование",
    value: "insurance",
    icon: Icons.ShieldCheck,
    bgColor: "#404040",
  },
  savings: {
    label: "Сбережения",
    value: "savings",
    icon: Icons.PiggyBank,
    bgColor: "#065F46",
  },
  clothing: {
    label: "Одежда",
    value: "clothing",
    icon: Icons.TShirt,
    bgColor: "#7c3aed",
  },
  personal: {
    label: "Личный",
    value: "personal",
    icon: Icons.User,
    bgColor: "#a21caf",
  },
  others: {
    label: "Другое",
    value: "others",
    icon: Icons.DotsThreeOutline,
    bgColor: "#525252",
  },
};

export const incomeCategory: CategoryType = {
  label: "Доход",
  value: "income",
  icon: Icons.CurrencyDollarSimple,
  bgColor: "#16a34a",
};

export const transactionTypes = [
  { label: "Расход", value: "expense" },
  { label: "Доход", value: "income" },
];
