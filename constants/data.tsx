import { CategoryType, ExpenseCategoriesType } from "@/types";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

export const expenseCategories: ExpenseCategoriesType = {
  groceries: {
    label: "Продукты питания",
    value: "groceries",
    icon: (props: any) => <FontAwesome name="shopping-cart" {...props} />,
    bgColor: "#4B5563",
  },
  rent: {
    label: "Аренда",
    value: "rent",
    icon: (props: any) => <FontAwesome name="home" {...props} />,
    bgColor: "#075985",
  },
  utilities: {
    label: "ЖКХ",
    value: "utilities",
    icon: (props: any) => (
      <MaterialCommunityIcons name="lightbulb-on-outline" {...props} />
    ),
    bgColor: "#ca8a04",
  },
  transportation: {
    label: "Транспорт",
    value: "transportation",
    icon: (props: any) => <FontAwesome name="bus" {...props} />,
    bgColor: "#b45309",
  },
  entertainment: {
    label: "Развлечение",
    value: "entertainment",
    icon: (props: any) => <FontAwesome name="film" {...props} />,
    bgColor: "#0f766e",
  },
  dining: {
    label: "Питание",
    value: "dining",
    icon: (props: any) => <FontAwesome name="cutlery" {...props} />,
    bgColor: "#be185d",
  },
  health: {
    label: "Здоровье",
    value: "health",
    icon: (props: any) => <FontAwesome name="heartbeat" {...props} />,
    bgColor: "#e11d48",
  },
  insurance: {
    label: "Страхование",
    value: "insurance",
    icon: (props: any) => <FontAwesome name="shield" {...props} />,
    bgColor: "#404040",
  },
  savings: {
    label: "Сбережения",
    value: "savings",
    icon: (props: any) => <FontAwesome name="bank" {...props} />,
    bgColor: "#065F46",
  },
  clothing: {
    label: "Одежда",
    value: "clothing",
    icon: (props: any) => <FontAwesome name="shopping-bag" {...props} />,
    bgColor: "#7c3aed",
  },
  personal: {
    label: "Личный",
    value: "personal",
    icon: (props: any) => <FontAwesome name="user" {...props} />,
    bgColor: "#a21caf",
  },
  others: {
    label: "Другое",
    value: "others",
    icon: (props: any) => <FontAwesome name="ellipsis-h" {...props} />,
    bgColor: "#525252",
  },
};

export const incomeCategory: CategoryType = {
  label: "Доход",
  value: "income",
  icon: (props: any) => <FontAwesome name="dollar" {...props} />,
  bgColor: "#16a34a",
};

export const transactionTypes = [
  { label: "Расход", value: "expense" },
  { label: "Доход", value: "income" },
];
