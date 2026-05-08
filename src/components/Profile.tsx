import { useAuth } from "../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();
  return <>{user?.username}</>;
}
