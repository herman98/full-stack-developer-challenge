import React from "react";
import { Link } from "react-router-dom";
import Container from "../../components/container/Container";
import Image from "../../components/image/Image";
import Title from "../../components/title/Title";
import MediumText from "../../components/description/Description";
import { Button } from "antd";

const Entity = (props) => {
  const { name, logo, description, detailUrl, editUrl, parentID } = props;

  return (
    <Container>
      {logo && <Image imageUrl={logo} />}
      {parentID && (
        <>
          <MediumText style={{ fontWeight: "bold" }}>ProductID: {parentID}</MediumText>
        </>
      )}
      <Title style={{ marginLeft: 10 }}>{name}</Title>
      {description && (
        <>
          <MediumText style={{ fontWeight: "bold" }}>Description:</MediumText>
          <MediumText style={{ marginBottom: "16px" }}>
            {description}
          </MediumText>
        </>
      )}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to={detailUrl ? detailUrl : "#"}>
          <Button type="primary" danger>
            Detail
          </Button>
        </Link>
        <Link to={editUrl ? editUrl : "#"}>
          <Button style={{ marginLeft: 16 }} type="primary">
            Edit
          </Button>
        </Link>
      </div>
    </Container>
  );
};

const EntityVariant = (props) => {
  const { name, size, color, detailUrl, editUrl, parentID } = props;

  return (
    <Container>
      {parentID && (
        <>
          <MediumText style={{ fontWeight: "bold" }}>ProductID: {parentID}</MediumText>
        </>
      )}
      <Title style={{ marginLeft: 10 }}>{name}</Title>
      {size && (
        <>
          <MediumText style={{ fontWeight: "bold" }}>Size: {size}</MediumText>
        </>
      )}
      {color && (
        <>
          <MediumText style={{ fontWeight: "bold" }}>Color: {color}</MediumText>
        </>
      )}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to={detailUrl ? detailUrl : "#"}>
          <Button type="primary" danger>
            Detail
          </Button>
        </Link>
        <Link to={editUrl ? editUrl : "#"}>
          <Button style={{ marginLeft: 16 }} type="primary">
            Edit
          </Button>
        </Link>
      </div>
    </Container>
  );
};

const EntityImageLogo = (props) => {
  const { url_name, editUrl } = props;

  return (
    <Container>
      <Title style={{ marginLeft: 10 }}>{url_name}</Title>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to={editUrl ? editUrl : "#"}>
          <Button style={{ marginLeft: 16 }} type="primary">
            Edit
          </Button>
        </Link>
      </div>
    </Container>
  );
};

// export default Entity;
export {
  Entity,
  EntityVariant,
  EntityImageLogo
}
