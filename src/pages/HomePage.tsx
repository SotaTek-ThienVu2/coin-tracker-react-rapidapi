import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic, Result, Button } from "antd";
import { Link } from "react-router-dom";

import { useGetCryptoQuery } from "../app/services/cryptoApi";
import { Cryptocurrencies } from "./Cryptocurrencies";
import { News } from "./News";
import { Loader } from "../components/Loader";
import { ErrorPage } from "../components/ErrorPage";

const { Title } = Typography;

export const HomePage = () => {
    const { data, isFetching, isError, error } = useGetCryptoQuery(10);
    const globalStats = data?.data?.stats;
    if (isFetching) {
        return <Loader />;
    }

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

    return (
        <>
            <Title level={2} className="heading">
                Global Crypto Stats
            </Title>
            {globalStats && (
                <Row>
                    <Col span={12}>
                        <Statistic
                            title="Total Cryptocurrencies"
                            value={globalStats?.total}
                        />
                    </Col>
                    <Col span={12}>
                        <Statistic
                            title="Total Exchanges"
                            value={millify(globalStats?.totalExchanges)}
                        />
                    </Col>
                    <Col span={12}>
                        <Statistic
                            title="Total Market Cap:"
                            value={`$${millify(globalStats?.totalMarketCap)}`}
                        />
                    </Col>
                    <Col span={12}>
                        <Statistic
                            title="Total 24h Volume"
                            value={`$${millify(globalStats?.total24hVolume)}`}
                        />
                    </Col>
                    <Col span={12}>
                        <Statistic
                            title="Total Cryptocurrencies"
                            value={globalStats?.total}
                        />
                    </Col>
                    <Col span={12}>
                        <Statistic
                            title="Total Markets"
                            value={millify(globalStats?.totalMarkets)}
                        />
                    </Col>
                </Row>
            )}
            <div className="home-heading-container">
                <Title level={2} className="home-title">
                    Top 10 Cryptos In The World
                </Title>
                <Title level={3} className="show-more">
                    <Link to="/cryptocurrencies">Show more</Link>
                </Title>
            </div>
            <Cryptocurrencies simplified />
            <div className="home-heading-container">
                <Title level={2} className="home-title">
                    Latest Crypto News
                </Title>
                <Title level={3}>
                    <Link to="/news">Show more</Link>
                </Title>
            </div>
            <News simplified />
        </>
    );
};
