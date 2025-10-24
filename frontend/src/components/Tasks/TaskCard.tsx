import React from 'react';
import { Card, Button, Space, Typography, Row, Col } from 'antd';

const { Text } = Typography;

type Props = {
  task: TTask;
  onStatusChange: (id: string, newStatus: string) => void;
};

export const TaskCard: React.FC<Props> = ({ task, onStatusChange }) => {
  const nextStatus =
    task.status === 'TODO' ? 'IN_PROGRESS' : task.status === 'IN_PROGRESS' ? 'DONE' : null;

  const statusColor =
    {
      TODO: 'gold',
      IN_PROGRESS: 'blue',
      DONE: 'green',
    }[task.status] || 'default';

  return (
    <Card
      size="small"
      style={{
        marginBottom: '1rem',
        borderLeft: `4px solid ${statusColor}`,
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Row style={{ fontWeight: 'bold', marginBottom: 4 }}>
          <Col span={16}>Артикул</Col>
          <Col span={8} style={{ textAlign: 'center' }}>Количество</Col>
        </Row>


        {task.items.map((item) => (
          <Row key={item.article.id} style={{ marginBottom: 2 }}>
            <Col span={16}>{item.article.name}</Col>
            <Col span={8} style={{ textAlign: 'center' }}>{item.quantity}</Col>
          </Row>
        ))}

        <Text type="secondary">Исполнитель: {task.assignee.name}</Text>

        {nextStatus && (
          <Button type="primary" size="small" onClick={() => onStatusChange(task.id, nextStatus)}>
            {nextStatus === 'IN_PROGRESS' ? 'Начать' : 'Завершить'}
          </Button>
        )}
      </Space>
    </Card>
  );
};
