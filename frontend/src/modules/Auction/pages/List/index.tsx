import React, { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Countdown from "react-countdown";
import {
  FilterButtonHolder,
  StatusLabel,
  StyledBidButton,
} from "./styledComponents";
import { useAuctionListQuery } from "../../hooks";
import { BidStatus, IAuctionListVars, IItem } from "../../types";
import { formatCurrency } from "../../../../utils/formatter";
import BidModal from "./../../components/BidModal";

const CURRENT_PAGE = 1;
const DEFAULT_SIZE_PER_PAGE = 10;

const AuctionList: React.FC = () => {
  const [auctionFilter, setAuctionFilter] = useState<IAuctionListVars>({
    filter: {},
  });
  const [showBidModal, setShowBidModal] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<IItem>();
  const { data, refetch } = useAuctionListQuery({
    pollInterval: 10000,
    variables: {
      filter: auctionFilter.filter,
      limit: DEFAULT_SIZE_PER_PAGE,
      skip: (CURRENT_PAGE - 1) * DEFAULT_SIZE_PER_PAGE,
    },
  });

  const onFilterClick = useCallback(
    (bidStatus?: BidStatus) => {
      setAuctionFilter({
        filter: { bidStatus },
      });
      refetch({
        filter: {
          bidStatus,
        },
        limit: DEFAULT_SIZE_PER_PAGE,
        skip: 0,
      });
    },
    [refetch]
  );

  const onBidButtonClick = useCallback(
    (item: IItem) => {
      setCurrentItem(item);
      setShowBidModal(true);
    },
    [setCurrentItem, setShowBidModal]
  );

  const columns: ColumnDescription[] = [
    {
      dataField: "name",
      text: "Name",
      style: {
        width: "300px",
      },
    },
    {
      dataField: "currentPrice",
      text: "Current Price",
      formatter: (currentPrice: number) => <>{formatCurrency(currentPrice)}</>,
      style: {
        width: "300px",
      },
    },
    {
      dataField: "expiredDate",
      text: "Duration",
      formatter: (expiredDate: Date) => <Countdown date={expiredDate} />,
      style: {
        width: "300px",
      },
    },
    {
      dataField: "bidStatus",
      text: "Bid Status",
      formatter: (bidStatus: string) => (
        <StatusLabel $status={bidStatus}>{bidStatus}</StatusLabel>
      ),
      style: {
        width: "200px",
      },
    },
    {
      dataField: "createdBy.email",
      text: "Created By",
      style: {
        width: "300px",
      },
    },
    {
      dataField: "bidBy.email",
      text: "Last Bid By",
      style: {
        width: "300px",
      },
    },
    {
      dataField: "",
      text: "Bid",
      formatter: (_, row: IItem) => {
        return (
          <StyledBidButton
            variant="secondary"
            className="mx-2"
            onClick={() => onBidButtonClick(row)}
          >
            BID
          </StyledBidButton>
        );
      },
    },
  ];

  return (
    <>
      <FilterButtonHolder>
        <Button
          variant="warning"
          onClick={() => onFilterClick(BidStatus.ONGOING)}
        >
          ONGOING
        </Button>
        <Button
          variant="success"
          className="mx-2"
          onClick={() => onFilterClick(BidStatus.COMPLETED)}
        >
          COMPLETED
        </Button>
        <Button
          variant="secondary"
          className="mx-2"
          onClick={() => onFilterClick()}
        >
          ALL
        </Button>
      </FilterButtonHolder>
      {data?.items && (
        <BootstrapTable
          keyField="id"
          remote
          onTableChange={undefined}
          data={data.items.result ?? []}
          columns={columns}
          pagination={paginationFactory({
            sizePerPage: DEFAULT_SIZE_PER_PAGE,
            onPageChange: (page) => {
              refetch({
                filter: auctionFilter.filter,
                skip: (page - 1) * DEFAULT_SIZE_PER_PAGE,
              });
            },
            hideSizePerPage: true,
            totalSize: data.items.totalCount,
          })}
        />
      )}
      <BidModal
        show={showBidModal}
        closeBidModal={() => setShowBidModal(false)}
        item={currentItem}
        onSuccess={() => {
          refetch();
          setShowBidModal(false);
        }}
      />
    </>
  );
};

export default AuctionList;
