import ScrollBar from "react-perfect-scrollbar";
//@ts-ignore
import styled from "styled-components";

export const Scroll = styled(ScrollBar).attrs({
  options: { suppressScrollX: true },
})`
  width: 100%;
`;
