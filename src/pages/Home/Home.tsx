import React, {  } from 'react'
import { HomeProps } from './types'
import { SelectDashboards } from '../../components/SelectDashboards';
import { ContentContainer } from '../../styles';

export const Home: React.FC<HomeProps> = ({ }) => {

  return (
        <ContentContainer flexDirection='row' justifyContent='space-between'>
            <SelectDashboards />
        </ContentContainer>
  )
};

