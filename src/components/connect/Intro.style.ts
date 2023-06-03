import styled from "@emotion/styled";

export const Gradient1 = styled.div`
  zIndex: 0;
  position: absolute;
  top: 100px;
  left: 0px;
  width: 500px;
  height: ${500 * 849 / 1065}px;
  animation: 1s hover-gradient1 ease-in-out alternate infinite;

  @keyframes hover-gradient1 {
    0% { top: 80px; left: 0px; }
    100% { top: 120px; left: 30px; }
  };
`;

export const Gradient2 = styled.div`
  zIndex: 0;
  position: absolute;
  top: -400px;
  left: 50px;
  width: 800px;
  height: ${800 * 1778 / 2193}px;
  animation: 1s hover-gradient2 ease-in-out alternate infinite;

  @keyframes hover-gradient2 {
    0% { top: -380px; left: 20px; }
    100% { top: -340px; left: 50px; }
  };
`;
