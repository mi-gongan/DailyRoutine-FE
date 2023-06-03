import styled from "@emotion/styled";

export const AnimatedText = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;

  & .dot-1 { animation: 2s fadeIn1 step-end infinite; }
  & .dot-2 { animation: 2s fadeIn2 step-end infinite; }
  & .dot-3 { animation: 2s fadeIn3 step-end infinite; }

  @keyframes fadeIn1 {
    0% { opacity: 1; }
    75% { opacity: 0; }
  }

  @keyframes fadeIn2 {
    0% { opacity: 0; }
    25% { opacity: 1; }
    75% { opacity: 0; }
  }
  @keyframes fadeIn3 {
    0% { opacity: 0; }
    50% { opacity: 1; }
    75% { opacity: 0; }
  }
`;

export const ImageContainer = styled.div`
  margin-bottom: 14px;
  background: #36393E;
  border-radius: 99px;
  width: 110px;
  height: 110px;
  position: relative;
  & .image-1, & .image-2, & .image-3 {
    position: absolute;
  }
  & .image-1 { animation: 2s imageShow1 step-end infinite; }
  & .image-2 { animation: 2s imageShow2 step-end infinite; }
  & .image-3 { animation: 2s imageShow3 step-end infinite; }
  @keyframes imageShow1 {
    0% { opacity: 1; }
    25% { opacity: 0; }
  }

  @keyframes imageShow2 {
    0% { opacity: 0; }
    25% { opacity: 1; }
    50% { opacity: 0; }
  }
  @keyframes imageShow3 {
    0% { opacity: 0; }
    50% { opacity: 1; }
    75% { opacity: 0; }
  }
`;
