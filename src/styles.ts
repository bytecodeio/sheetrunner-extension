import { Box, Button, ButtonItem, CardContent, CheckboxGroup, Flex } from "@looker/components";
import styled from "styled-components";

export const ContentContainer = styled(Flex as any)`
  background-color: rgb(244, 247, 249);
  height: 100%;
`;

export const BoxWithDivider = styled(Box as any)`
    margin: none;
`;

export const CardContentNoPadding = styled(CardContent as any)`
    padding: 0;
`;

export const TransparentButton = styled(Button as any)`
    color: rgb(52, 130, 226);
    background-color: rgb(1, 1, 1, 0);
    border: 1px solid rgb(52, 130, 226);
    min-width: 130px;

    &:focus,
    &:hover {
        color: rgb(255, 255, 255);
        background-color: rgb(52, 130, 226);
        background: rgb(52, 130, 226);
        outline: 0;
        border: none;
        box-shadow: none;
    }
`;


export const Container = styled(Box as any)`
    height: 100%;
    width: 100%;
    background-color: rgba(1, 1, 1, 0);
`;

export const EmbedContainer = styled.div`
    height: 100%;
    width: 100%;
    border: 1px solid #C1C6CC;
    border-radius: .25rem;
    box-shadow: 0px 1px 8px rgba(0,0,0,0.08), 0px 1px 1px rgba(0,0,0,0.05);
    padding: .1rem 0;

    & > iframe {
        width: 100%;
        height: 100%;
    }
`;