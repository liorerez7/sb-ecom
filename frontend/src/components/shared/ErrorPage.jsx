import React from 'react';
import { AiOutlineWarning } from 'react-icons/ai';

function ErrorPage({ message }) {
    return (
        <div style={{
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
            padding: '40px 24px',
            maxWidth: 400,
            width: '100%',
            margin: '0 auto'
        }}>
            <div style={{ textAlign: 'center', width: '100%' }}>
                <AiOutlineWarning style={{ color: '#FF4D4F', fontSize: 64, marginBottom: 16 }} />
                <h2 style={{ margin: '16px 0 8px 0', color: '#222' }}>Oops! Something went wrong</h2>
                <p style={{ color: '#888', marginBottom: 24 }}>
                    {message || 'We’re sorry, but an unexpected error has occurred. Please try again later.'}
                </p>
            </div>
        </div>
    );
}

export default ErrorPage;
