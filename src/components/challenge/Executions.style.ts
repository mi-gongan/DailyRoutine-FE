import styled from "@emotion/styled";
import { color } from "../styles/colors";

export const Progress = styled.progress`
  width: 100%;
  height: 10px;

  #progress {
    appearance: none;
  }
  &::-webkit-progress-bar {
    background: ${color.background.layer2};
    border-radius:10px;
  }
  &::-webkit-progress-value {
    border-radius:10px;
    background: ${color.primary};
  }
`;
