const Role = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

type Role = (typeof Role)[keyof typeof Role];

type TArticle = {
  id: string;
  articleName: string;
  stocks: {
    warehouseId: number;
    warehouse: number;
    count: number;
  }[];
  components: {
    componentId: string;
    componentName: string;
    quantityPerArticle: number;
  }[];
};

type TComponents = {
  name: string;
  id: string;
  componentsInStock: TComponent[];
};

type TComponent = {
  id: string;
  count: number;
  componentId: number;
  warehouse: TWarehouse;
};

type TWarehouse = {
  id: string;
  name: string;
  location?: string;
};

type TaskItemDto = {
  quantity: number;
  article: {
    id: string;
    name: string;
  };
};

type TTask = {
  id: string;
  status: string;
  assignee: { id: number; name: string; role: Role };
  dueDate: string;
  items: TaskItemDto[];
};

type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
};
