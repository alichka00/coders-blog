import { MenuProps } from "antd";

interface I_ProfileMenu {
  onLogout: () => void;
}

export const profileMenu = ({ onLogout }: I_ProfileMenu): MenuProps => ({
  items: [
    {
      key: "0",
      label: "Вийти",
    },
  ],
  onClick: () => {
    onLogout();
  },
});
