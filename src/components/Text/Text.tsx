import styled, { css } from 'styled-components';

export const Text = styled.span<{ highlight?: boolean }>`
  margin-bottom: 4px;

  ${({ highlight }) =>
    highlight &&
    css`
      color: green;
      font-weight: 700;
    `}
`;
