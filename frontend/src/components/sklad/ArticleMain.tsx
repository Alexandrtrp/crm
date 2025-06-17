import { useState } from "react";
import { mockStats } from "../../mock/data";
import {
  useAddStockMutation,
  useGetArticlesQuery,
} from "../../store/articlesApi";
import { ArticleCard } from "./ArticleCard";
import { ArticleList } from "./ArticleList";
import { WeeklyStats } from "./WeeklyStats";
import { Snackbar } from "../ui/Snackbar";

export const ArtilceMain = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const { data: articles = [], error, isLoading } = useGetArticlesQuery();
  const [addStock] = useAddStockMutation();
  const [snackbar, setSnackbar] = useState<string | null>(null);

  const handleSubmitAmount = async (
    articleId: number,
    amount: number,
    warehouseId: number
  ) => {
    try {
      await addStock({ articleId, amount, warehouseId }).unwrap();
      setSnackbar("Успешно добавлено!");
    } catch (e) {
      console.error(e);
      setSnackbar("Ошибка при добавлении");
    }
  };

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки данных</div>;
  
  return (
    <>
      {snackbar && (
        <Snackbar message={snackbar} onClose={() => setSnackbar(null)} />
      )}
      <ArticleList
        articles={articles}
        selectedId={selectedArticle?.id}
        onSelect={(article) => setSelectedArticle(article)}
      />
      {selectedArticle ? (
        <ArticleCard article={selectedArticle} onSubmit={handleSubmitAmount} />
      ) : (
        <WeeklyStats stats={mockStats} />
      )}
    </>
  );
};
