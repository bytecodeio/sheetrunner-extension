import React, {  } from 'react'
import { HomeProps } from './types'
import { ContentContainer } from '../../styles';
import { EmbedDashboard } from '../../components/EmbedDashboard';

export const Home: React.FC<HomeProps> = ({ }) => {

  return (
        <ContentContainer flexDirection='row' justifyContent='space-between'>
            <EmbedDashboard id="63a7P06MWmCUfx5oaOct05"/>
        </ContentContainer>
  )
};

