import React from 'react';
import { Card, Button, Tag, Space, Typography } from 'antd';
import type { TTask } from '../../types/types';

const { Text, Paragraph } = Typography;

type Props = {
  task: TTask;
  onStatusChange: (id: string, newStatus: string) => void;
};

export const TaskCard: React.FC<Props> = ({ task, onStatusChange }) => {
  const nextStatus =
    task.status === 'TODO' ? 'IN_PROGRESS' :
    task.status === 'IN_PROGRESS' ? 'DONE' :
    null;

  const statusColor = {
    todo: 'gold',
    in_progress: 'blue',
    done: 'green',
  }[task.status] || 'default';


  return (
    <Card
      size="small"
      style={{
        marginBottom: '1rem',
        borderLeft: `4px solid var(--ant-color-${statusColor}, ${statusColor})`,
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Text strong>{task.title}</Text>
        <Paragraph type="secondary" ellipsis={{ rows: 2 }}>
          {task.description || 'Без описания'}
        </Paragraph>
        <Text type="secondary">Исполнитель: {task.assignee.name}</Text>
        <Tag color={statusColor}>{task.status}</Tag>

        {nextStatus && (
          <Button
            type="primary"
            size="small"
            onClick={() => onStatusChange(task.id, nextStatus)}
          >
            {nextStatus === 'IN_PROGRESS' ? 'Начать' : 'Завершить'}
          </Button>
        )}
      </Space>
    </Card>
  );
};
