import styled from "styled-components";
import Button from "react-bootstrap/Button";
import { BidStatus, ItemState } from "../../types";

export const FilterButtonHolder = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

export const EmptyContent = styled.h5`
  margin-top: 50px;
`;

export const StatusLabel = styled.span<{ $status: string }>`
  color: ${({ $status }) =>
    $status === BidStatus.ONGOING ? "orange" : "green"};
`;

export const StyledBidButton = styled(Button)`
  padding: 5px 30px;
`;
