import styled from "styled-components";
export default function Header() {
    return (
        <HeaderDiv>
            <h2>Partify Car Form</h2>
        </HeaderDiv>
    );
}

const HeaderDiv = styled.div`
    background-color: #3c3c3c;
    text-align: center;
    margin: 0;
    width: 100%;
    padding: 17px;
    max-width: 100%;
    border-radius: 12px;
    border: 1px solid black;
    
`