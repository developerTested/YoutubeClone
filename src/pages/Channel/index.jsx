import React from 'react'
import ChannelHeader from "./ChannelHeader";
import Carousel from '../../components/carousel';
import { useApp } from "../../contexts/contextApi";
export default function Channel() {


    const { loading, setLoading } = useApp();

    return (
        <>
            <ChannelHeader />

            <div className="block">
                <Carousel data={[]} loading={loading} />
            </div>
        </>
    )
}
