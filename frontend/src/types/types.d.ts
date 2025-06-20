type Article = {
  id: number;
  articleName: string;
  stocks: {
    warehouseId: number;
    warehouse: number;
    count: number;
  }[];
};

type TComponents = {
  name: string;
  id: number;
  componentsInStock: TComponent[];
};

type TComponent = {
  id: number;
  count: number;
  componentId: number;
  warehouse: TWarehouse;
};

type TWarehouse = {
  id: number;
  nane: string;
  location?: string;
};

type TTask = {
  id: number;
  title: string;
  description: string;
  status: string;
  assignee: { id: number; name: string };
  dueDate: string;
};
