import styled from "styled-components";
import NavDropdown from "react-bootstrap/NavDropdown";

export const AuctionContainer = styled.div`
  padding: 60px 120px;
`;

export const Logo = styled.img`
  border-radius: 8px;
  width: 50px;
`;

export const LogoContainer = styled.div`
  width: 240px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledEmailUser = styled.span`
  text-decorator: none;
  font-weight: bold;
`;

export const StyledDropdownItem = styled(NavDropdown.Item)`
  text-align: right;
`;

export const StyledDropdownItemLogout = styled(NavDropdown.Item)`
  text-align: right;
  color: red;
`;
