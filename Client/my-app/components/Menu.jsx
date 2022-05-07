import { Menu, Icon } from "semantic-ui-react";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [activeItem, setActiveItem] = useState();

  function handleItemClick(e, { name }) {
    setActiveItem(name);
  }

  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link href="/">
        <a className="item">CrowdCoin</a>
      </Link>

      <Menu.Menu position="right">
        <Link href="/">
          <a className="item">Campaigns</a>
        </Link>
        {/* <Menu.Item
          name="campaigns"
          active={activeItem === "campaigns"}
          onClick={handleItemClick}
        >
          Campaigns
        </Menu.Item> */}

        <Link href="/campaigns/new">
          <a className="item">
            <Icon name="add" />
          </a>
        </Link>

        {/* <Menu.Item
          name=" "
          active={activeItem === "help"}
          onClick={handleItemClick}
        >
          <Icon name="add" />
        </Menu.Item> */}
      </Menu.Menu>
    </Menu>
  );
}
