import React, { useCallback } from "react";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Countdown from "react-countdown";
import { StateLabel, StatusLabel, StyledBidButton } from "./styledComponents";
import { useAuctionListByUserQuery, usePublishItem } from "../../hooks";
import { IItem, ItemState } from "../../types";
import { formatCurrency } from "../../../../utils/formatter";
import { showErrorToast, showSuccessToast } from "../../../../libs/toast";

const CURRENT_PAGE = 1;
const DEFAULT_SIZE_PER_PAGE = 10;

const AuctionListByUser: React.FC = () => {
  const [publishItem, { loading }] = usePublishItem();
  const { data, refetch } = useAuctionListByUserQuery({
    pollInterval: 10000,
    variables: {
      limit: DEFAULT_SIZE_PER_PAGE,
      skip: (CURRENT_PAGE - 1) * DEFAULT_SIZE_PER_PAGE,
    },
  });

  const onPublishButtonClick = useCallback(async (item: IItem) => {
    try {
      const result = await publishItem({
        variables: {
          input: {
            id: item.id,
          },
        },
      });

      const [error] = result.errors ?? [];
      if (error) {
        throw error;
      }

      const response = result.data?.publishItem;
      if (response) {
        await refetch();
        showSuccessToast(`Publish item successfully!`);
      }
    } catch (err: any) {
      console.log(err);
      showErrorToast(err.message);
    }
  }, []);

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
      dataField: "state",
      text: "State",
      formatter: (state: string) => (
        <StateLabel $state={state}>{state}</StateLabel>
      ),
      style: {
        width: "200px",
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
      dataField: "createdAt",
      text: "Created At",
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
      text: "Action",
      formatter: (_, row: IItem) => {
        return row.state === ItemState.DRAFT ? (
          <StyledBidButton
            variant="secondary"
            className="mx-2"
            disabled={loading}
            onClick={() => onPublishButtonClick(row)}
          >
            Publish
          </StyledBidButton>
        ) : (
          <>FINISHED</>
        );
      },
    },
  ];

  return (
    <>
      {data?.itemsByUser && (
        <BootstrapTable
          keyField="id"
          remote
          onTableChange={undefined}
          data={data.itemsByUser.result ?? []}
          columns={columns}
          pagination={paginationFactory({
            sizePerPage: DEFAULT_SIZE_PER_PAGE,
            onPageChange: (page) => {
              refetch({
                skip: (page - 1) * DEFAULT_SIZE_PER_PAGE,
              });
            },
            hideSizePerPage: true,
            totalSize: data.itemsByUser.totalCount,
          })}
        />
      )}
    </>
  );
};

export default AuctionListByUser;
