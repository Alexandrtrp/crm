import React, { useState } from 'react';
import { Card, Col, Row, Spin, Typography, Empty, message, Drawer, Button } from 'antd';
import { TaskCard } from './TaskCard';
import { useGetTasksQuery, useUpdateTaskStatusMutation } from '../../store/taskApi';
import { TaskForm } from './TaskForm';

const { Title } = Typography;

export const TaskList: React.FC = () => {
  const { data: tasks, isLoading, error } = useGetTasksQuery();
  const [updateStatus] = useUpdateTaskStatusMutation();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateStatus({ id, status }).unwrap();
      message.success('Статус задачи обновлён');
    } catch {
      message.error('Ошибка при обновлении статуса');
    }
  };

  if (isLoading) return <Spin size="large" style={{ display: 'block', margin: '3rem auto' }} />;
  if (error) return <Empty description="Ошибка загрузки задач" />;

  const columns = [
    { title: 'К выполнению', status: 'TODO', color: '#faad14' },
    { title: 'В процессе', status: 'IN_PROGRESS', color: '#1890ff' },
    { title: 'Выполнено', status: 'DONE', color: '#52c41a' },
  ];

  return (
    <>
      <Row
        gutter={16}
        style={{ padding: '1rem', overflowX: 'hidden', marginRight: 0, marginLeft: 0 }}
      >
        {columns.map((col) => (
          <Col span={8} key={col.status}>
            <Card
              title={
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Title level={4} style={{ color: col.color, margin: 0 }}>
                    {col.title}
                  </Title>
                  {col.status === 'TODO' && (
                    <Button type="primary" onClick={() => setDrawerVisible(true)}>
                      Создать задачу
                    </Button>
                  )}
                </div>
              }
              variant="outlined"
              style={{
                background: '#fafafa',
                minHeight: '80vh',
                borderRadius: '10px',
                borderWidth: '4px',
              }}
            >
              {tasks?.filter((t) => t.status === col.status).length ? (
                tasks
                  .filter((t) => t.status === col.status)
                  .map((task) => (
                    <TaskCard key={task.id} task={task} onStatusChange={handleStatusChange} />
                  ))
              ) : (
                <Empty description="Нет задач" image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </Card>
          </Col>
        ))}
      </Row>
      <Drawer
        title="Создать задачу"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={600}
      >
        <TaskForm />
      </Drawer>
    </>
  );
};
