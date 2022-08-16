import React from "react";
import styled from "styled-components/native";

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
`;

const Avatar = () => {
    return (
        <Image source={require("../assets/avatar-default.jpg")} />
    )
}

export default Avatar;


