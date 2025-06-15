type Article = {
  id: number;
  articleName: string;
  stocks: {
    warehouse: string;
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
