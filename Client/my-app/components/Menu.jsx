import { Menu, Icon } from "semantic-ui-react";
import { useState } from "react";
export default function Header() {
  const [activeItem, setActiveItem] = useState();

  function handleItemClick(e, { name }) {
    setActiveItem(name);
  }

  return (
    <Menu style={{ marginTop: "10px" }}>
      <Menu.Item
        name="crown"
        active={activeItem === "crown"}
        onClick={handleItemClick}
      >
        CrowdCoin
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item
          name="campaigns"
          active={activeItem === "campaigns"}
          onClick={handleItemClick}
        >
          Campaigns
        </Menu.Item>

        <Menu.Item
          name=" "
          active={activeItem === "help"}
          onClick={handleItemClick}
        >
          <Icon name="add" />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
