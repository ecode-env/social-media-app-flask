// Loader.jsx
import React from 'react';
import styled from 'styled-components';

const Loader = () => {
    return (
        <Wrapper>
            <div className="loader" />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: fixed;
    inset: 0;
    background-color: var(--bg-color);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;

    .loader {
        width: 60px;
        height: 40px;
        position: relative;
        background-color: var(--primary-color);
    }

    .loader::before {
        content: '';
        position: absolute;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: #FFF;
        background-image:
                radial-gradient(circle 8px at 18px 18px, var(--base-color) 100%, transparent 0),
                radial-gradient(circle 4px at 18px 0px, var(--base-color) 100%, transparent 0),
                radial-gradient(circle 4px at 0px 18px, var(--base-color) 100%, transparent 0),
                radial-gradient(circle 4px at 36px 18px, var(--base-color) 100%, transparent 0),
                radial-gradient(circle 4px at 18px 36px, var(--base-color) 100%, transparent 0),
                radial-gradient(circle 4px at 30px 5px, var(--base-color) 100%, transparent 0),
                radial-gradient(circle 4px at 30px 30px, var(--base-color) 100%, transparent 0),
                radial-gradient(circle 4px at 5px 30px, var(--base-color) 100%, transparent 0),
                radial-gradient(circle 4px at 5px 5px, var(--base-color) 100%, transparent 0);
        background-repeat: no-repeat;
        box-sizing: border-box;
        animation: rotate 3s linear infinite;
    }

    .loader::after {
        content: '';
        position: absolute;
        left: 35px;
        top: 15px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: #FFF;
        background-image:
                radial-gradient(circle 5px at 12px 12px, var(--base-color) 100%, transparent 0),
                radial-gradient(circle 2.5px at 12px 0px, var(--base-color) 100%, transparent 0),
                radial-gradient(circle 2.5px at 0px 12px, var(--base-color) 100%, transparent 0),
                radial-gradient(circle 2.5px at 24px 12px, var(--base-color) 100%, transparent 0),
                radial-gradient(circle 2.5px at 12px 24px, var(--base-color) 100%, transparent 0),
                radial-gradient(circle 2.5px at 20px 3px, var(--base-color) 100%, transparent 0),
                radial-gradient(circle 2.5px at 20px 20px, var(--base-color) 100%, transparent 0),
                radial-gradient(circle 2.5px at 3px 20px, var(--base-color) 100%, transparent 0),
                radial-gradient(circle 2.5px at 3px 3px, var(--base-color) 100%, transparent 0);
        background-repeat: no-repeat;
        box-sizing: border-box;
        animation: rotateReverse 4s linear infinite;
    }

    @keyframes rotate {
        to {
            transform: rotate(-360deg);
        }
    }

    @keyframes rotateReverse {
        to {
            transform: rotate(360deg);
        }
    }
`;

export default Loader;
