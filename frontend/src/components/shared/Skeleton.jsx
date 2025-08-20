import React from 'react';

export const Skeleton = () => {
    return (
        <div
            style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '16px',
                maxWidth: '400px',
                background: '#fafafa',
                margin: '16px 0',
            }}
        >
            <div
                style={{
                    width: '60%',
                    height: '18px',
                    background: 'linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%)',
                    borderRadius: '4px',
                    marginBottom: '12px',
                    animation: 'skeleton-loading 1.2s infinite linear',
                }}
            />
            <div
                style={{
                    width: '80%',
                    height: '14px',
                    background: 'linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%)',
                    borderRadius: '4px',
                    marginBottom: '8px',
                    animation: 'skeleton-loading 1.2s infinite linear',
                }}
            />
            <div
                style={{
                    width: '40%',
                    height: '14px',
                    background: 'linear-gradient(90deg, #ececec 25%, #f5f5f5 50%, #ececec 75%)',
                    borderRadius: '4px',
                    animation: 'skeleton-loading 1.2s infinite linear',
                }}
            />
            <style>
                {`
                    @keyframes skeleton-loading {
                        0% {
                            background-position: -200px 0;
                        }
                        100% {
                            background-position: calc(200px + 100%) 0;
                        }
                    }
                `}
            </style>
        </div>
    );
};
