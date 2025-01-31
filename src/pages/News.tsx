import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { CryptocurrenciesProp} from '../entities/Coins'
import { useGetCryptoQuery } from '../app/services/cryptoApi';
import { useGetCryptoNewsQuery } from '../app/services/cryptoNewsApi';
import {Loader} from '../components/Loader';

const demoImage = 'src/assets/images/no-content.png';

const { Text, Title } = Typography;
const { Option } = Select;

export const News = ({ simplified }: CryptocurrenciesProp) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const { data } = useGetCryptoQuery(100);
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });

    if (!cryptoNews?.value) return <Loader />;

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Select a Crypto"
                        optionFilterProp="children"
                        onChange={(value) => setNewsCategory(value)}
                    >
                        <Option value="Cryptocurency">Cryptocurrency</Option>
                        {data?.data?.coins?.map((currency: any) => <Option value={currency.name} key={currency.name}>{currency.name}</Option>)}
                    </Select>
                </Col>
            )}
            {cryptoNews.value.map((news: any, i: any) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className="news-card">
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title className="news-title" level={4}>{news.name}</Title>
                                <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                            </div>
                            <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
                            <div className="provider-container">
                                <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                                    <Text className="provider-name">{news.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(news.datePublished).startOf('s').fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

