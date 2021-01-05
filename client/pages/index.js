import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'

import Layout from "../components/layout";
import PageTitle from "../components/page-title";

const HomePage = () => {
    const router = useRouter();




    return (
        <Layout>
            <Head>
                <title>
                    {router.query.tag ? router.query.tag : 'Questions'} - Clone of Stackoverflow
                </title>
            </Head>

            <PageTitle title={router.query.tag ? `Questions tagged [${router.query.tag}]` : 'All Questions'} button borderBottom={false} />

        </Layout>
    )
}

export default HomePage;