/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2019 Looker Data Sciences, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import React, { useEffect, useState, useContext, useRef } from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import * as semver from 'semver'
import { Box, ComponentsProvider, Flex, FlexItem, Form, Heading } from '@looker/components'
import {
  ExtensionContext,
  ExtensionContextData,
} from '@looker/extension-sdk-react'
import { Home } from './pages/Home'
import { UpdateDashboardUiProps } from './types'

export enum ROUTES {
  HOME_ROUTE = '/',
  CONFIGURE_ROUTE = '/configure',
  LOOKUP_CODES_ROUTE = '/lookup',
  RESULTS_ROUTE = '/results',
};

export const UpdateDashboardUi: React.FC<UpdateDashboardUiProps> = ({
  route,
  routeState,
}) => {
  const extensionContext = useContext<ExtensionContextData>(ExtensionContext);
  const newFeasibilityFormRef = useRef(null);
  const currentSetFormRef = useRef(null);
  const setFormRef = useRef(null);
  const codeLookupFormRef = useRef(null);
  const { extensionSDK } = extensionContext;
  const [canPersistContextData, setCanPersistContextData] = useState<boolean>(
    false
  );

  useEffect(() => {
    const initialize = async () => {
      // Context requires Looker version 7.14.0. If not supported provide
      // default configuration object and disable saving of context data.
      let context
      if (
        semver.intersects(
          '>=7.14.0',
          extensionSDK.lookerHostData?.lookerVersion || '7.0.0',
          true
        )
      ) {
        try {
          context = await extensionSDK.getContextData()
          setCanPersistContextData(true)
        } catch (error) {
          console.error(error)
        }
      }
    }
    initialize()
  }, []);

  return (
    <ComponentsProvider>
      <Flex flexDirection='column' justifyContent='space-between' alignItems='stretch' alignContent='stretch' height='100%'>
        <Box pt='medium' pb='medium' pl='small' borderBottom='solid 2px rgb(231, 231, 231)'>
          <Heading as='h1'>Push Updates to Customer Dashboard</Heading>
        </Box>
        <ContentContainer flex={1}>
          <Switch>
            <Route path={ROUTES.HOME_ROUTE}>
              <Home formRef={newFeasibilityFormRef} />
            </Route>
          </Switch>
        </ContentContainer>
      </Flex>
    </ComponentsProvider>
  )
}

export const ContentContainer = styled(FlexItem as any)`
  background-color: rgb(244, 247, 249);
  overflow-y: auto;
  height: 100%;
`;