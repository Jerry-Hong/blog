import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Card from '../../components/Card';
import Layout from '../../components/Layout';

const SeriesPage = () => {
  const { file } = useStaticQuery(graphql`
    {
      file(relativePath: { eq: "rxjs-thirtydays.png" }) {
        childImageSharp {
          fluid(maxWidth: 400, maxHeight: 250) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <Card
        link="/series/rxjs"
        cover={file.childImageSharp.fluid}
        title="30 天精通 RxJS"
        desc="就如同羅輯思維羅胖老師所說的，在這資訊爆炸的時代，所有的內容生產者要思考一個新維度，那就是我們能幫讀者節省多少的時間？這系列文章的核心目標就是幫助讀者節省學習 RxJS 的時間，盡可能地以最低的成本精通 RxJS！"
        note="共 32 篇文章"
        style={{ margin: '0 auto' }}
      />
    </Layout>
  );
};

export default SeriesPage;
