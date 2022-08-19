import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  position: relative;
`;

export const Label = styled.span`
  margin-bottom: 4px;
`;

export const ContainerInput = styled.div``;

export const Input = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #00b2bb;
  background-color: #ffffff;
  box-sizing: border-box;
  outline: none;
  height: 40px;
  width: 100%;
  position: relative;
  font-size: 16px;
`;

export const ContainerList = styled.div`
  display: flex;
  flex: 1;
  left: 0;
  position: absolute;
  right: 0;
  z-index: 1;
  max-height: 300px;
  background: white;
  top: 70px;
  border: 1px solid #959595;
  border-radius: 5px;
`;

export const ContainerItem = styled.div<{ isSelected?: boolean }>`
  padding: 8px 16px;
  cursor: pointer;

  ${({ isSelected }) =>
    isSelected &&
    css`
      background: #e2edff !important;
    `}

  &:hover {
    background: #d7cfcf;
  }
`;

export const ContentList = styled.div`
  overflow: auto;
  width: 100%;
`;

export const CloseIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 30px;
  width: 24px;
  height: 24px;
  opacity: 0.3;

  &:hover {
    opacity: 1;
  }

  &:before,
  &:after {
    position: absolute;
    left: 11px;
    top: 4px;
    content: ' ';
    height: 16px;
    width: 2px;
    background-color: #333;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;
