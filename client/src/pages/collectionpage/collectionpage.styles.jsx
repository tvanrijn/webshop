import styled from "styled-components/macro";

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CategoryTitle = styled.h2`
  font-size: 38px;
  margin: 0 auto 30px;
`;

export const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px 40px;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
  }
`;
