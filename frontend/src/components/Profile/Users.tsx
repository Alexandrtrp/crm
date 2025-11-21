import { List } from 'antd';
import { useGetUsersQuery } from '../../store/userApi';
import { UserCard } from './UserCard';

export const Users = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();

  return (
    <div>
      <List
        dataSource={users}
        renderItem={(item) => (
          <List.Item>
            <UserCard user={item} />
          </List.Item>
        )}
      />
    </div>
  );
};
