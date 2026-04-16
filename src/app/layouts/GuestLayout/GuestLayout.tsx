import { Outlet } from "react-router";

export default function GuestLayout() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}
