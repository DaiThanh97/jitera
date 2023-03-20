import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
  AuctionContainer,
  Logo,
  LogoContainer,
  StyledDropdownItem,
  StyledDropdownItemLogout,
  StyledEmailUser,
} from "./styledComponents";
import JiteraLogo from "./../../assets/images/logo.png";
import { RootState } from "../../store/reducers";
import { formatCurrency } from "../../utils/formatter";
import { ROUTES } from "../../routes";
import AuctionList from "../../modules/Auction/pages/List";
import CreateItemForm from "../../modules/Auction/pages/Create";
import DepositForm from "../../modules/Wallet/pages/Deposit";
import AuctionListByUser from "../../modules/Auction/pages/ListByUser";

const AuctionPage: React.FC = () => {
  const { email, balance } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const onLogOut = () => {
    localStorage.clear();
    navigate(ROUTES.LOGIN);
  };

  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="/">
            <LogoContainer>
              <Logo src={JiteraLogo} />
              <h3>Jitera Auction</h3>
            </LogoContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Balance: <Badge bg="secondary">{formatCurrency(balance)}</Badge>
            </Navbar.Text>
            <NavDropdown
              title={<StyledEmailUser>{email}</StyledEmailUser>}
              id="basic-nav-dropdown"
            >
              <StyledDropdownItem href={ROUTES.CREATE_ITEM}>
                Create Item
              </StyledDropdownItem>
              <NavDropdown.Divider />
              <StyledDropdownItem href={ROUTES.OWN_ITEMS}>
                Own Items
              </StyledDropdownItem>
              <NavDropdown.Divider />
              <StyledDropdownItem href={ROUTES.DEPOSIT}>
                Deposit
              </StyledDropdownItem>
              <NavDropdown.Divider />
              <StyledDropdownItemLogout>
                <div onClick={onLogOut}>Logout</div>
              </StyledDropdownItemLogout>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <AuctionContainer>
        <Routes>
          <Route path="/" element={<AuctionList />} />
          <Route path={ROUTES.CREATE_ITEM} element={<CreateItemForm />} />
          <Route path={ROUTES.DEPOSIT} element={<DepositForm />} />
          <Route path={ROUTES.OWN_ITEMS} element={<AuctionListByUser />} />
        </Routes>
      </AuctionContainer>
    </>
  );
};

export default AuctionPage;
