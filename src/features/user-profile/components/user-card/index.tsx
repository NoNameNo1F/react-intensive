import { Outlet } from "react-router";

const UserCard = () => {
  return (
    <div>
      User Card
      <Outlet />
    </div>
  );
};

export default UserCard;
