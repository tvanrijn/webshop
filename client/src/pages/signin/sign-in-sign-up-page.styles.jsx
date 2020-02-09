import styled from "styled-components/macro";

export const SignInSignUpPageContainer = styled.div`
  width: 850px;
  display: flex;
  justify-content: space-between;
  margin: 30px auto;

  @media screen and (max-width: 800px) {
    flex-wrap: wrap;
    width: auto;
    align-items: center;
    
    > *:first-child {
      margin-bottom: 50px;
    }
  }
`;
