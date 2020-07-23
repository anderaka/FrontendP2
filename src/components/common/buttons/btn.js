import styled from 'styled-components';
import  { Button } from 'react-bootstrap' ;


export const FormButton = styled(Button)`
color: #ffffff;
font-size: 1.25em;
margin: 2em 0;
width: 100%;
padding: 0.25em 1em;
border: 2px solid #ffffff;
border-radius: 2px;
background-color: #E95420;

:hover{
    background-color: #ffffff;
    border-color: #E95420
    color:#E95420;
}
`;