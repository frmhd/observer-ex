import React, { useEffect, useCallback, useState } from 'react';
import axios from 'axios';

import ContentStyled from './styled/ContentStyled';
import CardStyled from './styled/CardStyled';
import Card from './Card';

const fetchItems = async (items, itemsFetcher) => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
  itemsFetcher([...items, data]);
}

const Content = () => {
  const [items = [], itemsFetcher] = useState();

  useEffect(() => fetchItems(items, itemsFetcher), []);

  const fetchMore = useCallback(() => fetchItems(items, itemsFetcher), [items]);

  return (
    <>
      <ContentStyled>
        {items.map((page, indexPage) => (
          <Card
            key={indexPage}
            index={`${indexPage}`}>
            {page.map((card, indexCard) =>
            <CardStyled key={`${card.id}-${indexCard}`}>
              <p>page - {indexPage}</p>
              <p>card № {indexCard}</p>
            </CardStyled>)}
          </Card>
        )
        )}
      </ContentStyled>

      <button
        style={{
          width: '100%',
          gridArea: 'c',
          height: '50px',
          marginTop: '50px'
        }}
        onClick={fetchMore}>
          GO!!!!!!!!!!!!!
        </button>
    </>
  )
};

export default Content;
