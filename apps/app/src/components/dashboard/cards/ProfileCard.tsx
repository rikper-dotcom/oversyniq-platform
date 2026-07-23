import { useNavigate } from "react-router-dom";

import DashboardCard from "../DashboardCard";

type ProfileCardProps = {
  title: string;
  description: string;
};

export default function ProfileCard({
  title,
  description,
}: ProfileCardProps) {
  const navigate = useNavigate();

  return (
    <DashboardCard
      icon="👤"
      title={title}
      description={description}
      onClick={() => navigate("/profile")}
    />
  );
}
