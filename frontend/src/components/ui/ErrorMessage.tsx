import { Alert } from "antd";

export const ErrorMessage = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: '100%',
      }}
    >
      <Alert type="error" message="Ошибка загрузки данных" />
    </div>
  );
};
