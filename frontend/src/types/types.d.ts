type Article = {
  id: string;
  articleName: string;
  stocks: {
    warehouseId: number;
    warehouse: number;
    count: number;
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

type TTask = {
  id: string;
  title: string;
  description: string;
  status: string;
  assignee: { id: number; name: string };
  dueDate: string;
};
