import styled from "styled-components";

export const AbsoluteFill = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

export const VertiaclFlex = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CenterHorizontal = styled(VertiaclFlex)`
  align-items: center;
`;

export const CenterVertical = styled(VertiaclFlex)`
  justify-content: center;
`;

export const CenterAll = styled(VertiaclFlex)`
  align-items: center;
  justify-content: center;
`;

export const FlexHorizontal = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;