import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { Link, useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select, Button, Skeleton } from "antd";
import {
    MoneyCollectOutlined,
    DollarCircleOutlined,
    FundOutlined,
    ExclamationCircleOutlined,
    StopOutlined,
    TrophyOutlined,
    CheckOutlined,
    NumberOutlined,
    ThunderboltOutlined,
    DotChartOutlined,
} from "@ant-design/icons";

import {
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
} from "../app/services/cryptoApi";
import { Loader } from "./Loader";
import { LineChart } from "./LineChart";
import { ReferenceCurrencyUuid, TimePeriod } from "../constant/Coins.const";
import { ErrorPage } from "./ErrorPage";

const { Title, Text } = Typography;
const { Option } = Select;

export const CryptoDetails = () => {
    const { uuid } = useParams();
    const [timeperiod, setTimeperiod] = useState(TimePeriod['7d']);
    if (!uuid) {
        return
    }
    const { data, isFetching, isError, error } = useGetCryptoDetailsQuery({ uuid, referenceCurrencyUuid: ReferenceCurrencyUuid.USDollar });
    const {
        data: coinHistory,
        isFetching: fecthingHistory,
        error: historyEror,
    } = useGetCryptoHistoryQuery({ uuid,referenceCurrencyUuid: ReferenceCurrencyUuid.USDollar, timePeriod: timeperiod });
    const cryptoDetails = data?.data?.coin;

    if (isFetching) return <Loader />;
    if (isError) {
        return (
            <ErrorPage
                error={error}
                extra={
                    <Button type="primary">
                        <Link to="/">Home</Link>
                    </Button>
                }
            />
        );
    }

    const stats = [
        {
            title: "Price to USD",
            value: `$ ${cryptoDetails.price && millify(parseFloat(cryptoDetails.price))
                }`,
            icon: <DollarCircleOutlined />,
        },
        { title: "Rank", value: cryptoDetails.rank, icon: <NumberOutlined /> },
        {
            title: "24h Volume",
            value: `$ ${cryptoDetails["24hVolume"] &&
                millify(parseFloat(cryptoDetails["24hVolume"]))
                }`,
            icon: <ThunderboltOutlined />,
        },
        {
            title: "Market Cap",
            value: `$ ${cryptoDetails.marketCap && millify(parseFloat(cryptoDetails.marketCap))
                }`,
            icon: <DollarCircleOutlined />,
        },
        {
            title: "All-time-high(daily avg.)",
            value: `$ ${millify(parseFloat(cryptoDetails.allTimeHigh.price))}`,
            icon: <TrophyOutlined />,
        },
    ];

    const genericStats = [
        {
            title: "Number Of Markets",
            value: cryptoDetails.numberOfMarkets,
            icon: <FundOutlined />,
        },
        {
            title: "Number Of Exchanges",
            value: cryptoDetails.numberOfExchanges,
            icon: <MoneyCollectOutlined />,
        },
        {
            title: "Confirmed Supply",
            value: cryptoDetails.supply.confirmed ? (
                <CheckOutlined />
            ) : (
                <StopOutlined />
            ),
            icon: <ExclamationCircleOutlined />,
        },
        {
            title: "Total Supply",
            value: `$ ${millify(parseFloat(cryptoDetails.supply.total))}`,
            icon: <ExclamationCircleOutlined />,
        },
        {
            title: "Circulating Supply",
            value: `$ ${millify(parseFloat(cryptoDetails.supply.circulating))}`,
            icon: <ExclamationCircleOutlined />,
        },
    ];

    return (
        <Col className="coin-detail-container">
            <Col className="coin-heading-container">
                <Title level={2} className="coin-name">
                    {cryptoDetails.name} ({cryptoDetails.symbol}) Price
                </Title>
                <p>
                    {cryptoDetails.name} live price in US Dollar (USD). View value
                    statistics, market cap and supply.
                </p>
            </Col>
            <Select
                defaultValue={TimePeriod['7d']}
                className="select-timeperiod"
                placeholder="Select Timeperiod"
                onChange={(value) => setTimeperiod(value)}
            >
                {Object.values(TimePeriod).map((date) => (
                    <Option key={date}>{date}</Option>
                ))}
            </Select>
            {coinHistory && (
                <LineChart
                    coinHistory={coinHistory}
                    currentPrice={millify(cryptoDetails.price)}
                    coinName={cryptoDetails.name}
                />
            )}
            <Col className="stats-container">
                <Col className="coin-value-statistics">
                    <Col className="coin-value-statistics-heading">
                        <Title level={3} className="coin-details-heading">
                            {cryptoDetails.name} Value Statistics
                        </Title>
                        <p>
                            An overview showing the statistics of {cryptoDetails.name}, such
                            as the base and quote currency, the rank, and trading volume.
                        </p>
                    </Col>
                    {stats.map(({ icon, title, value }) => (
                        <Col className="coin-stats" key={`stats-${title}`}>
                            <Col className="coin-stats-name">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className="stats">{value}</Text>
                        </Col>
                    ))}
                </Col>
                <Col className="other-stats-info">
                    <Col className="coin-value-statistics-heading">
                        <Title level={3} className="coin-details-heading">
                            Other Stats Info
                        </Title>
                        <p>
                            An overview showing the statistics of {cryptoDetails.name}, such
                            as the base and quote currency, the rank, and trading volume.
                        </p>
                    </Col>
                    {genericStats.map(({ icon, title, value }) => (
                        <Col className="coin-stats" key={`genericStats-${title}`}>
                            <Col className="coin-stats-name">
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className="stats">{value}</Text>
                        </Col>
                    ))}
                </Col>
            </Col>
            <Col className="coin-desc-link">
                <Row className="coin-desc">
                    <Title level={3} className="coin-details-heading">
                        What is {cryptoDetails.name}?
                    </Title>
                    {HTMLReactParser(cryptoDetails.description)}
                </Row>
                <Col className="coin-links">
                    <Title level={3} className="coin-details-heading">
                        {cryptoDetails.name} Links
                    </Title>
                    {cryptoDetails.links?.map((link: any) => (
                        <Row className="coin-link" key={link.url}>
                            <Title level={5} className="link-name">
                                {link.type}
                            </Title>
                            <a href={link.url} target="_blank" rel="noreferrer">
                                {link.name}
                            </a>
                        </Row>
                    ))}
                </Col>
            </Col>
        </Col>
    );
};
